// ECS core
export const entities = [];
export const systems = [];

export function register(system) {
  systems.push(system);
  return system;
}

/**
 * @param  {...string} componentTypes 
 * @returns {array} entities
 */
export function getEntitiesWith(...componentTypes) {
  return entities.filter(entity => 
    componentTypes.every(type => entity.components[type])
  );
}
