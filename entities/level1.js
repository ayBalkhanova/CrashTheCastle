import Matter from "matter-js";

import Ground from "../components/Ground";
import { Block } from "../components/CastleParts";

import { Dimensions } from 'react-native'
import Heart from "../components/Heart";
import Ammo from "../components/Ammo";

export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false });

    engine.positionIterations = 10; // Большее значение для точного разрешения пересечений
    engine.constraintIterations = 10; // Большее значение для стабильности соединений
    engine.velocityIterations = 10;   // Точность вычисления скоростей

    const world = engine.world;

    engine.gravity.y = 0.2;

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const frontObj = {
        collisionGroup: 0x0200,
        zIndex: 10,
        castleGroup: 'front',
    };
    const backObj = {
        collisionGroup: 0x0400,
        zIndex: 1,
        castleGroup: 'back',
    };

    const towerFront1 = {
        Top2_towerFront1: Block(world, 'green', { x: 510 , y: 141 }, { width: 30, height: 48},  'top3', frontObj, false),
        MiddleBlock3_towerFront1: Block(world, 'blue', { x: 510, y: 165 }, { width: 25, height: 16}, 'middleBlock3', frontObj, false),
        TallBlock1_towerFront1: Block(world, 'black', { x: 510, y: 207 }, { width: 18, height: 68 }, 'tallBlock1', frontObj, false),
    };

    const supportingStructureBack1 = {
        TallBlock1_supportBack1: Block(world, 'black', { x: 510, y: 205 }, { width: 18, height: 73 }, 'tallBlock2', backObj, false),
        TallBlock2_supportBack1: Block(world, 'black',{ x: 566, y: 205 }, { width: 18, height: 73 }, 'tallBlock2', backObj, false),
        LongBlock1_supportBack1: Block(world, 'blue', { x: 538, y: 165 }, { width: 70, height: 6 }, 'longBlock1', backObj, false),
    };

    const towerBack2 = {
        Top1_towerBack2: Block(world, 'green', { x: 533, y: 88 }, { width: 33, height: 73 },  'top1', backObj, false),
        TopBottom1_towerBack2: Block(world, 'blue', { x: 533, y: 117 }, { width: 33, height: 10 },  'topBottom1', backObj, false),
        Block1_towerBack2: Block(world, 'blue', { x: 533, y: 142 }, { width: 33, height: 40 }, 'block1', backObj, false),
    };

    const towerFront4 = {
        Top2_towerFront4: Block(world, 'green', { x: 566, y:  128 }, { width: 28, height: 45},  'top3', frontObj, false),
        MiddleBlock3_towerFront4: Block(world, 'blue', { x: 566, y:  154 }, { width: 28, height: 22 }, 'middleBlock3', frontObj, false),
        TallBlock1_towerFront4: Block(world, 'black', { x: 566, y:  203 }, { width: 23, height: 76 }, 'tallBlock1', frontObj, false),
    };

    const castle  = {
        ...towerFront1,
        ...towerFront4,
        ...supportingStructureBack1,
        ...towerBack2,
    };
        
    return {
        physics: { engine, world },

        Heart: Heart(world, { x: 538, y: 215 }),

        Ammo: Ammo(world, { x: 210, y: 250 }, { radius: 10 }, 'Ammo'),

        CastlePlatform: Ground(world, 'black', { x: windowWidth - 136, y:  windowHeight - 83 }, { width: 165, height: 70 }),
        PlayerPlatform: Ground(world, 'black', { x: 200, y:  windowHeight - 58 }, { width: 150, height: 40 }),
        
        ...castle,

        level: 1,
    };
};