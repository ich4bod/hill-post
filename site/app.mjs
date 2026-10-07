import {levels} from './levels.mjs?v=13';
import {create, move, undo, restart} from './engine.mjs?v=13';

const select = document.querySelector('#delivery');
const map = document.querySelector('#map');
const levelById = new Map(levels.map(level => [level.id, level]));
let state = create('contour');

const deliveryGroups = [
  ['First rides', ['contour', 'ridge', 'two-hills']],
  ['Cafe hill', ['cafe-upward', 'cafe-homeward']],
  ['Bakery', ['bakery-gentle', 'bakery-express']],
  ['Station', ['station-cut', 'station-canal']],
  ['Quay', ['quay-outward', 'quay-homeward']],
  ['Library', ['library-link', 'library-rims']],
  ['School', ['school-middle', 'school-flat']],
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

function render() {
  const level = levelById.get(state.levelId);
  const nodeById = new Map(level.nodes.map(node => [node.id, node]));
  const currentId = state.path.at(-1);
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
    button.disabled = node.id === currentId || currentId === level.goal || !adjacent.has(node.id);
    if (node.id === currentId) {
      button.setAttribute('aria-current', 'location');
      button.setAttribute('aria-label', `At ${node.name}, height ${node.height}.`);
    } else if (currentId === level.goal) {
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
  const destination = nodeById.get(level.goal);
  document.querySelector('#destination').textContent = `Deliver to ${destination.name} · Height ${destination.height}.`;
  const distance = document.querySelector('#distance');
  distance.textContent = `Distance: ${state.distance} / ${level.distanceBudget}`;
  distance.classList.toggle('over-budget', state.distance > level.distanceBudget);
  const climb = document.querySelector('#climb');
  climb.textContent = `Climbing: ${state.climb} / ${level.climbBudget}`;
  climb.classList.toggle('over-budget', state.climb > level.climbBudget);
  const status = document.querySelector('#ride-status');
  status.textContent = state.status === 'riding'
    ? 'Choose a road from the gold stop.'
    : state.status === 'delivered'
      ? 'Delivered. Both budgets held.'
      : currentId === level.goal
        ? 'The parcel arrived, but the ride ran over budget. Undo and find another way.'
        : 'Over budget. You can still ride, undo or restart.';
  const arrivalNote = document.querySelector('#arrival-note');
  arrivalNote.hidden = currentId !== level.goal;
  arrivalNote.textContent = arrivalNote.hidden ? '' : `Height change: ${destination.height - nodeById.get(level.start).height}. Uphill ridden: ${state.climb}.`;
  const roadRows = [];
  if (currentId !== level.goal) {
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
  document.querySelector('#road-choices-empty').hidden = currentId !== level.goal;
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
  document.querySelector('#ride-legs-empty').hidden = state.path.length > 1;
  document.querySelector('#undo').disabled = state.path.length === 1;
  document.querySelector('#restart').disabled = false;
}

map.addEventListener('click', event => {
  const button = event.target.closest('button[id^="node-"]');
  if (button && map.contains(button) && !button.disabled) state = move(state, button.id.slice(5));
  render();
});
select.addEventListener('change', () => { state = create(select.value); render(); });
document.querySelector('#undo').addEventListener('click', () => { state = undo(state); render(); });
document.querySelector('#restart').addEventListener('click', () => { state = restart(state); render(); });
window.__hillPost = {state: () => structuredClone(state)};
render();
