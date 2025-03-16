
import { getEntitiesWith } from '../ecs.js';

export function createCollisionComponent(width = 20, height = 20) {
    return {
        width,
        height,
        isColliding: false, // Flag to track if currently colliding
        collidingWith: []   // Array of entity IDs this is colliding with
    };
}

export const Collision = {
    update(dt) {
        // Get all entities with position and collision components
        const collidableEntities = getEntitiesWith('position', 'collision');

        // Reset collision state for all entities
        collidableEntities.forEach(entity => {
            entity.components.collision.isColliding = false;
            entity.components.collision.collidingWith = [];
        });

        // Check each pair of entities for collisions
        for (let i = 0; i < collidableEntities.length; i++) {
            const entityA = collidableEntities[i];
            const posA = entityA.components.position;
            const collA = entityA.components.collision;

            for (let j = i + 1; j < collidableEntities.length; j++) {
                const entityB = collidableEntities[j];
                const posB = entityB.components.position;
                const collB = entityB.components.collision;

                // Simple AABB (Axis-Aligned Bounding Box) collision check
                if (this.checkCollision(
                    posA.x, posA.y, collA.width, collA.height,
                    posB.x, posB.y, collB.width, collB.height
                )) {
                    // Mark both entities as colliding
                    collA.isColliding = true;
                    collB.isColliding = true;

                    // Store which entity they're colliding with
                    collA.collidingWith.push(entityB.id);
                    collB.collidingWith.push(entityA.id);

                    // Handle collision response
                    this.resolveCollision(entityA, entityB);
                }
            }
        }
    },

    // Check if two rectangles overlap
    checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Calculate rectangle centers and half-dimensions
        const centerX1 = x1;
        const centerY1 = y1;
        const centerX2 = x2;
        const centerY2 = y2;

        const halfWidth1 = w1 / 2;
        const halfHeight1 = h1 / 2;
        const halfWidth2 = w2 / 2;
        const halfHeight2 = h2 / 2;

        // Calculate the distance between centers
        const dx = Math.abs(centerX2 - centerX1);
        const dy = Math.abs(centerY2 - centerY1);

        // Check if the rectangles overlap
        return dx < (halfWidth1 + halfWidth2) && dy < (halfHeight1 + halfHeight2);
    },

    // Resolve collision by stopping movement
    resolveCollision(entityA, entityB) {
        // Only handle collision response if both entities have velocity components
        if (!entityA.components.velocity || !entityB.components.velocity) {
            return;
        }

        const posA = entityA.components.position;
        const posB = entityB.components.position;
        const velA = entityA.components.velocity;
        const velB = entityB.components.velocity;

        // Calculate overlap distance
        const dx = posB.x - posA.x;
        const dy = posB.y - posA.y;

        // Get moving direction for both entities
        const movingRightA = velA.x > 0;
        const movingLeftA = velA.x < 0;
        const movingDownA = velA.y > 0;
        const movingUpA = velA.y < 0;

        const movingRightB = velB.x > 0;
        const movingLeftB = velB.x < 0;
        const movingDownB = velB.y > 0;
        const movingUpB = velB.y < 0;

        // If entities are moving toward each other, stop them
        if ((movingRightA && dx > 0) || (movingLeftA && dx < 0)) {
            velA.x = 0;
        }

        if ((movingDownA && dy > 0) || (movingUpA && dy < 0)) {
            velA.y = 0;
        }

        if ((movingRightB && dx < 0) || (movingLeftB && dx > 0)) {
            velB.x = 0;
        }

        if ((movingDownB && dy < 0) || (movingUpB && dy > 0)) {
            velB.y = 0;
        }
    }
};