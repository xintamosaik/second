import { entities } from '../ecs.js';
import { createPositionComponent } from '../position.js';
import { createVelocityComponent } from '../velocity.js';
import { createAIComponent } from '../ai.js';
import { createRenderComponent } from '../render.js'

export default function addMob(x, y) {
  const id = entities.length;
  const entity = {
    id,
    components: {
      position: createPositionComponent(x, y),
      velocity: createVelocityComponent(),
      ai: createAIComponent(),
      render: createRenderComponent("red"),
      type: { name: 'mob' }
    }
  };
  entities.push(entity);
  return entity;
}
