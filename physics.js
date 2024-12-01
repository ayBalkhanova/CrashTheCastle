import { split } from "lodash";
import Matter from "matter-js"
import { useState } from "react";

let frontIsStatic = true;
let backIsStatic = true;
let count = 0;
const k = 0.05;
const origin = { x: 170, y: 255 };

export default Physics = (entities, { touches, time, dispatch }) => {
  
    let engine = entities.physics.engine;

    // let amountOfAmmo, amountOfMagicAmmo;

    // switch (entities.level) {
    //     case 1:
    //         amountOfAmmo = 10;
    //         break;
    //     case 2:
    //         amountOfAmmo = 20;
    //         break;
    //     case 3:
    //         amountOfMagicAmmo = 3;
    //         break;
    //     case 4:
    //         amountOfMagicAmmo = 8;
    //         break;
    //     case 5:
    //         amountOfAmmo = 25;
    //         break;
    //     case 5:
    //         amountOfMagicAmmo = 5;
    //         break;
    // }

    touches.filter((t) => t.type === "move")
        .forEach((t) => {
            if (t.event.pageY < 150 && t.event.pageY > 100 && t.event.pageX < 150 && t.event.pageX > 100) {
                Matter.Body.setPosition(entities.Ammo.body, { x: t.event.pageX, y: t.event.pageY });
            } else {
                Matter.Body.setPosition(entities.Ammo.body, origin);
            }
    });

    touches.filter((t) => t.type === "end")
        .forEach((t) => {
            const velocity = calculateVelocity({x: -t.event.pageX, y: t.event.pageY + 40}, origin);
            Matter.Body.setVelocity(entities.Ammo.body, velocity);
    });

    Matter.Engine.update(engine, time.delta);

    // Matter.Events.on(engine, "collisionStart", (event) => {

    //     event.pairs.forEach(({ bodyA, bodyB }) => {

    //         // if (
    //         //     (bodyA === entities.Heart.body && bodyB === entities.Ammo.body) ||
    //         //     (bodyB === entities.Heart.body && bodyA === entities.Ammo.body)
    //         // ) {
    //         //     dispatch({ type: 'level_finished' })
    //         // }
    //         // else if (
    //         //     ((bodyB === entities.Ammo.body && bodyA.blockType === 'castlePart') ||
    //         //     (bodyA === entities.Ammo.body && bodyB.blockType === 'castlePart')) 
    //         // ) {
    //         //     const force = getImpactForce(bodyA, bodyB);

    //         //     if ( bodyB.blockType && force > 5 ) {
    //         //         Matter.Sleeping.set(bodyB, false);
    //         //     } else if ( bodyA.blockType && force > 5 ) {
    //         //         Matter.Sleeping.set(bodyA, false);
    //         //     }
    //         // };
            
    //     }
    // );
    // });

    // Matter.Events.on(engine, "collisionStart", (event) => {
        

    //     event.pairs.forEach(({ bodyA, bodyB }) => {

    //         if (
    //             (bodyA === entities.Heart.body && bodyB === entities.Ammo.body) ||
    //             (bodyB === entities.Heart.body && bodyA === entities.Ammo.body)
    //         ) {
    //             dispatch({ type: 'level_finished' })
    //         }
    //         else if (
    //             ((bodyB === entities.Ammo.body && bodyA.blockType === 'castlePart') ||
    //             (bodyA === entities.Ammo.body && bodyB.blockType === 'castlePart')) 
    //         ) {
    //             const force = getImpactForce(bodyA, bodyB);

    //             if ( bodyB.blockType && force > 5 ) {
    //                 Matter.Sleeping.set(bodyB, false);
    //             } else if ( bodyA.blockType && force > 5 ) {
    //                 Matter.Sleeping.set(bodyA, false);
    //             }
    //         };
    //     });
    // });

    Matter.Events.on(engine, "collisionStart", (event) => {
        event.pairs.forEach(({ bodyA, bodyB }) => {
            if (
                (bodyA === entities.Heart.body && bodyB === entities.Ammo.body) ||
                (bodyB === entities.Heart.body && bodyA === entities.Ammo.body)
            ) {
                dispatch({ type: 'level_finished' })
            }
            else if (
                (bodyA.blockType === 'castlePart' || bodyB.blockType === 'castlePart')
            ) { 
                if (Matter.Vector.magnitude(bodyA.velocity) > 1 && bodyB.blockType === 'castlePart') {
                    Matter.Sleeping.set(bodyB, false);
                } else if (Matter.Vector.magnitude(bodyB.velocity) > 1 && bodyA.blockType === 'castlePart') {
                    Matter.Sleeping.set(bodyA, false);
                }
            }

            //     if ((bodyA.castleGroup === 'front' || bodyB.castleGroup === 'front') && frontIsStatic ) {

            //         Object.keys(entities).filter((entity) => {
            //             if (entities[entity].body && entities[entity].body.castleGroup) {
            //                 return entities[entity].body.castleGroup === 'front';
            //             }
            //         }).forEach((block) => {
            //             if (force > 10) {
            //                 Matter.Sleeping.set(entities[block].body, false);
            //                 frontIsStatic = false;
            //             }
            //         });

            //     } else if ((bodyA.castleGroup === 'back'|| bodyB.castleGroup === 'back') && backIsStatic ) {

            //         Object.keys(entities).filter((entity) => {
            //             if (entities[entity].body && entities[entity].body.castleGroup) {
            //                 return entities[entity].body.castleGroup === 'back';
            //             }
            //         }).forEach((block) => {
            //             console.log(block)
            //             if (force > 10) {
            //                 Matter.Sleeping.set(entities[block].body, false);
            //                 backIsStatic = false;
            //             }
            //         });

            //     } 
            // } 
            else if (entities.Crack) {
                if (
                    (bodyA === entities.Crack.body && bodyB === entities.Ammo.body) ||
                    (bodyB === entities.Crack.body && bodyA === entities.Ammo.body)
                ) {
                    Matter.World.remove(engine.world, entities.Shield.body);
                    entities.Shield.renderer = null;
                    entities.Crack.renderer = null;
                }
            }

            else if (entities.Shield){
                if (
                    (bodyA === entities.Shield.body && bodyB === entities.Ammo.body) ||
                    (bodyB === entities.Shield.body && bodyA === entities.Ammo.body)
                ) {
                    if (bodyA.label === 'MagicAmmo' || bodyB.label === 'MagicAmmo' ) {
                        Matter.World.remove(engine.world, entities.Shield.body);
                        entities.Shield.renderer = null;
                    };
                };
            };

            if (
                (((bodyA.blockType ==='castlePart' && bodyB === entities.Ammo.body) ||
                (bodyB.blockType ==='castlePart' && bodyA === entities.Ammo.body)) && entities.Ammo.body.label === 'MagicAmmo') 
            ) {
                if (bodyA.blockType === 'castlePart') {

                    Object.keys(entities).filter((entity) => {if (entities[entity].body) return entities[entity].body.id === bodyA.id})
                    .forEach(t => entities[t].renderer = null);
                    Matter.World.remove(engine.world, bodyA);

                } else {
                    
                    Object.keys(entities).filter((entity) => {if (entities[entity].body) return entities[entity].body.id === bodyA.id})
                    .forEach(t => entities[t].renderer = null);
                    Matter.World.remove(engine.world, bodyB);
                    
                }
            }
        });
    });

    return entities;
};

function getImpactForce(body1, body2) {
    const speed1 = Matter.Vector.magnitude(body1.velocity);
    const speed2 = Matter.Vector.magnitude(body2.velocity);
    return Math.abs(speed1 - speed2);
};

function calculateVelocity(target, origin) {
    const velocityX = -k * (target.x - origin.x);
    const velocityY = -k * (target.y - origin.y);
    return { x: velocityX, y: velocityY };
  }