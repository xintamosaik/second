import { getEntitiesWith } from '../ecs.js';

export const Movement = {
    update(dt) {
        const entities = getEntitiesWith('position', 'velocity');

        entities.forEach(entity => {
            const position = entity.components.position;
            const velocity = entity.components.velocity;

            position.x += velocity.x * dt;
            position.y += velocity.y * dt;
        });
    }
};
