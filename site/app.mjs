import {levels} from './levels.mjs?v=10';
import {create, move, undo, restart} from './engine.mjs?v=10';

const select = document.querySelector('#delivery');
const map = document.querySelector('#map');
const levelById = new Map(levels.map(level => [level.id, level]));
let state = create('contour');

for (const level of levels) {
  const option = document.createElement('option');
  option.value = level.id;
  option.textContent = level.title;
  select.append(option);
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
    if (node.id === currentId) button.setAttribute('aria-current', 'location');
    const name = document.createElement('span');
    name.className = 'stop-name'; name.textContent = node.name;
    const height = document.createElement('span');
    height.className = 'stop-height'; height.textContent = `Height ${node.height}`;
    button.append(name, height);
    map.append(button);
  }
  document.querySelector('#delivery-title').textContent = level.title;
  document.querySelector('#delivery-brief').textContent = level.brief;
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
  document.querySelector('#route').textContent = `Route: ${state.path.map(id => nodeById.get(id).name).join(' → ')}`;
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
