import { entities } from '../ecs.js';
import { createPositionComponent } from '../position.js';
import { createVelocityComponent } from '../velocity.js';
import { createInputComponent } from '../input.js';

export default function addPlayer(x, y) {
  const id = entities.length;
  const entity = {
    id,
    components: {
      position: createPositionComponent(x, y),
      velocity: createVelocityComponent(),
      input: createInputComponent(),
      type: { name: 'player' }
    }
  };
  entities.push(entity);
  return entity;
}

