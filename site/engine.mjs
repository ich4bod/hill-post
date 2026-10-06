import {levels} from './levels.mjs?v=5';

const byId = new Map(levels.map(level => [level.id, level]));

function getLevel(levelId) {
  const level = byId.get(levelId);
  if (!level) throw new RangeError(`Unknown level: ${levelId}`);
  return level;
}

function stateFor(level, path) {
  const nodes = new Map(level.nodes.map(node => [node.id, node]));
  let distance = 0;
  let climb = 0;
  for (let i = 1; i < path.length; i++) {
    const fromId = path[i - 1];
    const toId = path[i];
    const edge = level.edges.find(([a, b]) => (a === fromId && b === toId) || (a === toId && b === fromId));
    distance += edge[2];
    climb += Math.max(0, nodes.get(toId).height - nodes.get(fromId).height);
  }
  const atGoal = path[path.length - 1] === level.goal;
  const status = distance > level.distanceBudget || climb > level.climbBudget
    ? 'over-budget'
    : atGoal ? 'delivered' : 'riding';
  return {levelId: level.id, path, distance, climb, status};
}

export function create(levelId) {
  const level = getLevel(levelId);
  return stateFor(level, [level.start]);
}

export function move(state, toId) {
  const level = getLevel(state.levelId);
  const fromId = state.path[state.path.length - 1];
  if (fromId === level.goal || !level.nodes.some(node => node.id === toId) || toId === fromId) return state;
  if (!level.edges.some(([a, b]) => (a === fromId && b === toId) || (a === toId && b === fromId))) return state;
  return stateFor(level, [...state.path, toId]);
}

export function undo(state) {
  const level = getLevel(state.levelId);
  if (state.path.length === 1) return state;
  return stateFor(level, state.path.slice(0, -1));
}

export function restart(state) {
  return create(state.levelId);
}
