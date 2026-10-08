import {levels} from './levels.mjs?v=19';
import {create, move, undo, restart, nextStop} from './engine.mjs?v=18';

const select = document.querySelector('#delivery');
select.style.minWidth = '0';
const map = document.querySelector('#map');
const levelById = new Map(levels.map(level => [level.id, level]));
let state = create('contour');
let keptRide = null;

const deliveryGroups = [
  ['First rides', ['contour', 'ridge', 'two-hills']],
  ['Cafe hill', ['cafe-upward', 'cafe-homeward']],
  ['Bakery', ['bakery-gentle', 'bakery-express']],
  ['Station', ['station-cut', 'station-canal']],
  ['Quay', ['quay-outward', 'quay-homeward']],
  ['Library', ['library-link', 'library-rims']],
  ['School', ['school-middle', 'school-flat']],
  ['Glasshouse', ['glasshouse-link', 'glasshouse-home', 'glasshouse-express']],
  ['Complete deliveries', ['cafe-circuit-short', 'cafe-circuit-gentle']],
  ['Observatories', ['observatory-link', 'observatory-home', 'tower-parcel']],
  ['Market', ['market-quick', 'market-gentle', 'market-reply']],
  ['River crossings', ['river-bell', 'river-home', 'river-ford']],
  ['Reedbank', ['reedbank-gentle', 'reedbank-fast', 'reedbank-home']],
];

for (const [label, levelIds] of deliveryGroups) {
  const group = document.createElement('optgroup');
  group.label = label;
  for (const id of levelIds) {
    const level = levelById.get(id);
    if (!level) throw new RangeError(`Unknown delivery: ${id}`);
    const option = document.createElement('option');
    option.value = level.id;
    option.textContent = level.title;
    group.append(option);
  }
  select.append(group);
}
select.value = state.levelId;

function junctionIndex(level, path) {
  const neighbors = new Map(level.nodes.map(node => [node.id, new Set()]));
  for (const [a, b] of level.edges) {
    neighbors.get(a).add(b);
    neighbors.get(b).add(a);
  }
  for (let i = path.length - 2; i >= 0; i--) {
    if (neighbors.get(path[i]).size >= 3) return i;
  }
  return 0;
}

function profilePoints(level, path) {
  const low = Math.min(...level.nodes.map(node => node.height));
  const high = Math.max(...level.nodes.map(node => node.height));
  const distances = [0];
  for (let i = 1; i < path.length; i++) {
    const fromId = path[i - 1], toId = path[i];
    const edge = level.edges.find(([a, b]) => (a === fromId && b === toId) || (a === toId && b === fromId));
    distances.push(distances[i - 1] + edge[2]);
  }
  const total = distances.at(-1);
  const nodeById = new Map(level.nodes.map(node => [node.id, node]));
  return path.map((id, i) => {
    const node = nodeById.get(id);
    const x = 16 + 288 * distances[i] / Math.max(1, total);
    const y = 104 - 88 * (node.height - low) / Math.max(1, high - low);
    return `${x.toFixed(3)},${y.toFixed(3)}`;
  }).join(' ');
}

function budgetPoints(level, path, allowance, climbed) {
  const nodeById = new Map(level.nodes.map(node => [node.id, node]));
  const spent = [0];
  for (let i = 1; i < path.length; i++) {
    const from = nodeById.get(path[i - 1]);
    const to = nodeById.get(path[i]);
    const edge = level.edges.find(([a, b]) => (a === from.id && b === to.id) || (a === to.id && b === from.id));
    spent.push(spent[i - 1] + (climbed ? Math.max(0, to.height - from.height) : edge[2]));
  }
  const total = spent.at(-1);
  const scale = Math.max(allowance, total, 1);
  const count = path.length - 1;
  return {
    points: spent.map((value, i) => `${count ? 12 + 376 * i / count : 12},${144 - 128 * value / scale}`).join(' '),
    allowanceY: 144 - 128 * allowance / scale,
  };
}

function render() {
  const level = levelById.get(state.levelId);
  const nodeById = new Map(level.nodes.map(node => [node.id, node]));
  const currentId = state.path.at(-1);
  const nextId = nextStop(state);
  const completed = nextId === null;
  const currentNode = nodeById.get(currentId);
  const adjacent = new Set(level.edges.flatMap(([a, b]) => a === currentId ? [b] : b === currentId ? [a] : []));
  const routeEdges = new Set(state.path.slice(1).map((id, i) => {
    const pair = [state.path[i], id].sort();
    return pair.join(':');
  }));
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');
  for (const [a, b] of level.edges) {
    const from = nodeById.get(a), to = nodeById.get(b);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', from.x); line.setAttribute('y1', from.y);
    line.setAttribute('x2', to.x); line.setAttribute('y2', to.y);
    line.setAttribute('class', `road${routeEdges.has([a, b].sort().join(':')) ? ' route-road' : ''}`);
    svg.append(line);
  }
  map.replaceChildren(svg);
  for (const [a, b, distance] of level.edges) {
    const from = nodeById.get(a), to = nodeById.get(b);
    const label = document.createElement('span');
    label.className = 'road-cost';
    label.textContent = String(distance);
    label.style.left = `${(from.x + to.x) / 2}%`;
    label.style.top = `${(from.y + to.y) / 2}%`;
    map.append(label);
  }
  for (const node of level.nodes) {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `node-${node.id}`;
    button.style.left = `${node.x}%`;
    button.style.top = `${node.y}%`;
    button.disabled = node.id === currentId || completed || !adjacent.has(node.id);
    if (node.id === currentId) {
      button.setAttribute('aria-current', 'location');
      button.setAttribute('aria-label', `At ${node.name}, height ${node.height}.`);
    } else if (completed) {
      button.setAttribute('aria-label', `${node.name}, height ${node.height}; ride finished.`);
    } else if (adjacent.has(node.id)) {
      const edge = level.edges.find(([a, b]) => (a === currentId && b === node.id) || (b === currentId && a === node.id));
      button.setAttribute('aria-label', `Ride to ${node.name}, height ${node.height}; distance ${edge[2]}; climbing ${Math.max(0, node.height - currentNode.height)}.`);
    } else {
      button.setAttribute('aria-label', `${node.name}, height ${node.height}; no road from here.`);
    }
    const name = document.createElement('span');
    name.className = 'stop-name'; name.textContent = node.name;
    const height = document.createElement('span');
    height.className = 'stop-height'; height.textContent = `Height ${node.height}`;
    button.append(name, height);
    map.append(button);
  }
  document.querySelector('#delivery-title').textContent = level.title;
  document.querySelector('#delivery-brief').textContent = level.brief;
  const destination = nodeById.get(nextId ?? level.goal);
  document.querySelector('#destination').textContent = `Deliver to ${destination.name} · Height ${destination.height}.`;
  document.querySelector('#hill-stops').textContent = `Stops: ${[...(level.via ?? []), level.goal].map(id => nodeById.get(id).name).join(' → ')}.`;
  document.querySelector('#hill-next-stop').textContent = completed
    ? 'All delivery stops reached.'
    : `Next delivery stop: ${destination.name}.`;
  const distance = document.querySelector('#distance');
  distance.textContent = `Distance: ${state.distance} / ${level.distanceBudget}`;
  distance.classList.toggle('over-budget', state.distance > level.distanceBudget);
  const climb = document.querySelector('#climb');
  climb.textContent = `Climbing: ${state.climb} / ${level.climbBudget}`;
  climb.classList.toggle('over-budget', state.climb > level.climbBudget);
  const allowance = (name, remaining) => `${name} ${remaining >= 0 ? 'left' : 'over'}: ${Math.abs(remaining)}.`;
  document.querySelector('#ride-allowance').textContent = `${allowance('Distance', level.distanceBudget - state.distance)} ${allowance('Climbing', level.climbBudget - state.climb)}`;
  const status = document.querySelector('#ride-status');
  status.textContent = state.status === 'riding'
    ? 'Choose a road from the gold stop.'
    : state.status === 'delivered'
      ? 'Delivered. Both budgets held.'
      : completed
        ? 'The parcel arrived, but the ride ran over budget. Undo and find another way.'
        : 'Over budget. You can still ride, undo or restart.';
  const arrivalNote = document.querySelector('#arrival-note');
  arrivalNote.hidden = !completed;
  arrivalNote.textContent = arrivalNote.hidden ? '' : `Height change: ${destination.height - nodeById.get(level.start).height}. Uphill ridden: ${state.climb}.`;
  const roadRows = [];
  if (!completed) {
    for (const node of level.nodes) {
      if (node.id === currentId) continue;
      const edge = level.edges.find(([a, b]) => (a === currentId && b === node.id) || (b === currentId && a === node.id));
      if (!edge) continue;
      const row = document.createElement('tr');
      row.dataset.to = node.id;
      for (const value of [node.name, edge[2], Math.max(0, node.height - currentNode.height)]) {
        const cell = document.createElement('td');
        cell.textContent = String(value);
        row.append(cell);
      }
      roadRows.push(row);
    }
  }
  document.querySelector('#road-choice-rows').replaceChildren(...roadRows);
  document.querySelector('#road-choices-empty').hidden = !completed;
  document.querySelector('#route').textContent = `Route: ${state.path.map(id => nodeById.get(id).name).join(' → ')}`;
  const legList = document.querySelector('#ride-leg-list');
  const legItems = state.path.slice(1).map((toId, i) => {
    const from = nodeById.get(state.path[i]);
    const to = nodeById.get(toId);
    const edge = level.edges.find(([a, b]) => (a === from.id && b === to.id) || (a === to.id && b === from.id));
    const item = document.createElement('li');
    item.textContent = `${from.name} → ${to.name}: distance ${edge[2]} · climbing ${Math.max(0, to.height - from.height)}.`;
    return item;
  });
  legList.replaceChildren(...legItems);
  const retracePath = [...state.path].reverse();
  const retraceRows = [];
  let retraceDistance = 0;
  let retraceClimb = 0;
  for (let i = 1; i < retracePath.length; i++) {
    const from = nodeById.get(retracePath[i - 1]);
    const to = nodeById.get(retracePath[i]);
    const edge = level.edges.find(([a, b]) => (a === from.id && b === to.id) || (a === to.id && b === from.id));
    const climb = Math.max(0, to.height - from.height);
    retraceDistance += edge[2];
    retraceClimb += climb;
    const row = document.createElement('tr');
    for (const value of [`${from.name} → ${to.name}`, edge[2], climb]) {
      const cell = document.createElement('td');
      cell.textContent = String(value);
      row.append(cell);
    }
    retraceRows.push(row);
  }
  document.querySelector('#retrace-values').textContent = `Retracing this ride: ${retraceDistance} distance · ${retraceClimb} climbing.`;
  document.querySelector('#retrace-rows').replaceChildren(...retraceRows);
  for (const [name, allowance, climbed] of [
    ['distance', level.distanceBudget, false],
    ['climb', level.climbBudget, true],
  ]) {
    const plot = budgetPoints(level, state.path, allowance, climbed);
    document.querySelector(`#ride-budget-${name}`).setAttribute('points', plot.points);
    const limit = document.querySelector(`#ride-budget-${name}-allowance`);
    limit.setAttribute('y1', plot.allowanceY);
    limit.setAttribute('y2', plot.allowanceY);
  }
  document.querySelector('#ride-profile-live').setAttribute('points', profilePoints(level, state.path));
  const keptProfile = document.querySelector('#ride-profile-kept');
  const sameLevelKept = keptRide?.levelId === state.levelId;
  keptProfile.toggleAttribute('hidden', !sameLevelKept);
  if (sameLevelKept) keptProfile.setAttribute('points', profilePoints(level, keptRide.path));
  document.querySelector('#ride-legs-empty').hidden = state.path.length > 1;
  document.querySelector('#undo').disabled = state.path.length === 1;
  document.querySelector('#undo-junction').disabled = state.path.length === 1;
  document.querySelector('#restart').disabled = false;
  document.querySelector('#remember-ride').disabled = state.path.length < 2;
  const comparisonTable = document.querySelector('#ride-comparison table');
  const comparisonEmpty = document.querySelector('#ride-comparison-empty');
  const returnKeptRide = document.querySelector('#return-kept-ride');
  const differentKeptRoute = sameLevelKept && (keptRide.path.length !== state.path.length || keptRide.path.some((id, i) => id !== state.path[i]));
  returnKeptRide.disabled = !differentKeptRoute;
  comparisonEmpty.hidden = sameLevelKept;
  comparisonEmpty.textContent = keptRide && !sameLevelKept
    ? 'The kept ride is on another delivery.'
    : 'Ride at least one road, then keep it to compare another attempt.';
  comparisonTable.hidden = !sameLevelKept;
  const comparisonRows = [];
  if (sameLevelKept) {
    for (const [label, ridePath, rideDistance, rideClimb] of [
      ['Current', state.path, state.distance, state.climb],
      ['Kept', keptRide.path, keptRide.distance, keptRide.climb],
    ]) {
      const row = document.createElement('tr');
      const route = ridePath.map(id => nodeById.get(id).name).join(' → ');
      for (const value of [label, rideDistance, rideClimb, route]) {
        const cell = document.createElement('td');
        cell.textContent = String(value);
        row.append(cell);
      }
      comparisonRows.push(row);
    }
  }
  comparisonTable.querySelector('tbody').replaceChildren(...comparisonRows);
}

const cafeRows = document.querySelector('#ride-pair-cafe-rows');
for (const id of ['cafe-upward', 'cafe-homeward']) {
  const level = levelById.get(id);
  if (!level) throw new RangeError(`Unknown comparison delivery: ${id}`);
  const row = document.createElement('tr');
  row.dataset.level = id;
  for (const value of [level.title, level.distanceBudget, level.climbBudget]) {
    const cell = document.createElement('td');
    cell.textContent = String(value);
    row.append(cell);
  }
  const action = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Start ${level.title}`);
  button.textContent = 'Start';
  button.addEventListener('click', () => {
    select.value = id;
    state = create(id);
    render();
  });
  action.append(button);
  row.append(action);
  cafeRows.append(row);
}

const bakeryRows = document.querySelector('#ride-pair-bakery-rows');
for (const id of ['bakery-gentle', 'bakery-express']) {
  const level = levelById.get(id);
  if (!level) throw new RangeError(`Unknown comparison delivery: ${id}`);
  const row = document.createElement('tr');
  row.dataset.level = id;
  for (const value of [level.title, level.distanceBudget, level.climbBudget]) {
    const cell = document.createElement('td');
    cell.textContent = String(value);
    row.append(cell);
  }
  const action = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Start ${level.title}`);
  button.textContent = 'Start';
  button.addEventListener('click', () => {
    select.value = id;
    state = create(id);
    render();
  });
  action.append(button);
  row.append(action);
  bakeryRows.append(row);
}

const stationRows = document.querySelector('#ride-pair-station-rows');
for (const id of ['station-cut', 'station-canal']) {
  const level = levelById.get(id);
  if (!level) throw new RangeError(`Unknown comparison delivery: ${id}`);
  const row = document.createElement('tr');
  row.dataset.level = id;
  for (const value of [level.title, level.distanceBudget, level.climbBudget]) {
    const cell = document.createElement('td');
    cell.textContent = String(value);
    row.append(cell);
  }
  const action = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Start ${level.title}`);
  button.textContent = 'Start';
  button.addEventListener('click', () => {
    select.value = id;
    state = create(id);
    render();
  });
  action.append(button);
  row.append(action);
  stationRows.append(row);
}

const quayRows = document.querySelector('#ride-pair-quay-rows');
for (const id of ['quay-outward', 'quay-homeward']) {
  const level = levelById.get(id);
  if (!level) throw new RangeError(`Unknown comparison delivery: ${id}`);
  const row = document.createElement('tr');
  row.dataset.level = id;
  for (const value of [level.title, level.distanceBudget, level.climbBudget]) {
    const cell = document.createElement('td');
    cell.textContent = String(value);
    row.append(cell);
  }
  const action = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Start ${level.title}`);
  button.textContent = 'Start';
  button.addEventListener('click', () => {
    select.value = id;
    state = create(id);
    render();
  });
  action.append(button);
  row.append(action);
  quayRows.append(row);
}

const libraryRows = document.querySelector('#ride-pair-library-rows');
for (const id of ['library-link', 'library-rims']) {
  const level = levelById.get(id);
  if (!level) throw new RangeError(`Unknown comparison delivery: ${id}`);
  const row = document.createElement('tr');
  row.dataset.level = id;
  for (const value of [level.title, level.distanceBudget, level.climbBudget]) {
    const cell = document.createElement('td');
    cell.textContent = String(value);
    row.append(cell);
  }
  const action = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Start ${level.title}`);
  button.textContent = 'Start';
  button.addEventListener('click', () => {
    select.value = id;
    state = create(id);
    render();
  });
  action.append(button);
  row.append(action);
  libraryRows.append(row);
}

const schoolRows = document.querySelector('#ride-pair-school-rows');
for (const id of ['school-middle', 'school-flat']) {
  const level = levelById.get(id);
  if (!level) throw new RangeError(`Unknown comparison delivery: ${id}`);
  const row = document.createElement('tr');
  row.dataset.level = id;
  for (const value of [level.title, level.distanceBudget, level.climbBudget]) {
    const cell = document.createElement('td');
    cell.textContent = String(value);
    row.append(cell);
  }
  const action = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Start ${level.title}`);
  button.textContent = 'Start';
  button.addEventListener('click', () => {
    select.value = id;
    state = create(id);
    render();
  });
  action.append(button);
  row.append(action);
  schoolRows.append(row);
}

map.addEventListener('click', event => {
  const button = event.target.closest('button[id^="node-"]');
  if (button && map.contains(button) && !button.disabled) state = move(state, button.id.slice(5));
  render();
});
select.addEventListener('change', () => { state = create(select.value); render(); });
document.querySelector('#undo').addEventListener('click', () => { state = undo(state); render(); });
document.querySelector('#undo-junction').addEventListener('click', () => {
  if (state.path.length === 1) return;
  const targetLength = junctionIndex(levelById.get(state.levelId), state.path) + 1;
  while (state.path.length > targetLength) state = undo(state);
  render();
});
document.querySelector('#restart').addEventListener('click', () => { state = restart(state); render(); });
document.querySelector('#remember-ride').addEventListener('click', () => {
  if (state.path.length < 2) return;
  keptRide = {levelId: state.levelId, path: [...state.path], distance: state.distance, climb: state.climb};
  render();
});
document.querySelector('#return-kept-ride').addEventListener('click', () => {
  if (!keptRide || keptRide.levelId !== state.levelId || (keptRide.path.length === state.path.length && keptRide.path.every((id, i) => id === state.path[i]))) return;
  let restored = create(keptRide.levelId);
  for (const id of keptRide.path.slice(1)) restored = move(restored, id);
  state = restored;
  render();
});
window.__hillPost = {state: () => structuredClone(state)};
render();
