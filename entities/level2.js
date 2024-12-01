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
        Top2_towerFront1: Block(world, 'green', { x: 477 , y: 141 }, { width: 30, height: 48},  'top3', frontObj, false),
        MiddleBlock3_towerFront1: Block(world, 'blue', { x: 477, y: 165 }, { width: 25, height: 16}, 'middleBlock3', frontObj, false),
        TallBlock1_towerFront1: Block(world, 'black', { x: 477, y: 207 }, { width: 18, height: 68 }, 'tallBlock1', frontObj, false),
    };

    const towerBack1 = {
        Top2_towerBack1: Block(world, 'green', { x: 495, y: 132 }, { width: 14, height: 37 },  'top2', backObj, false),
        TallBlock1_towerBack1: Block(world, 'black', { x: 495, y: 193 }, { width: 12, height: 98 }, 'tallBlock3', backObj, false),
    };

    const towerFront2 = {
        Top2_towerFront2: Block(world, 'green', { x: 509, y: 161 }, { width: 23, height: 35},  'top3', frontObj, false),
        MiddleBlock3_towerFront2: Block(world, 'blue', { x: 509, y: 181 }, { width: 22, height: 17}, 'middleBlock4', frontObj, false),
        TallBlock1_towerFront2: Block(world, 'black', { x: 509, y: 215 }, { width: 16, height: 52}, 'tallBlock2', frontObj, false),
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

    const towerBack3 = {
        Top2_towerBack3: Block(world, 'green', { x: 566, y: 131 }, { width: 15, height: 40 },  'top2', backObj, false),
        TallBlock1_towerBack3: Block(world, 'black', { x: 566, y: 153 }, { width: 13, height: 17 }, 'tallBlock2', backObj, false),
    };

    const towerFront3 = {
        Top2_towerFront3: Block(world, 'green', { x: 564, y: 162 }, { width: 20, height: 27},  'top3', frontObj, false),
        MiddleBlock3_towerFront3: Block(world, 'blue', { x: 564, y: 180 }, { width: 22, height: 17}, 'middleBlock4', frontObj, false),
        TallBlock1_towerFront3: Block(world, 'black', { x: 564, y: 215 }, { width: 16, height: 52}, 'tallBlock2', frontObj, false),
    };

    const towerBack4 = {
        Top2_towerBack4: Block(world, 'green', { x: 582, y: 152 }, { width: 8, height: 16},  'top2', backObj, false),
        TallBlock1_towerBack4: Block(world, 'black', { x: 582, y: 199 }, { width: 8, height: 84}, 'tallBlock4', backObj, false),
    };

    const towerFront4 = {
        Top2_towerFront4: Block(world, 'green', { x: 600, y:  128 }, { width: 28, height: 45},  'top3', frontObj, false),
        MiddleBlock3_towerFront4: Block(world, 'blue', { x: 600, y:  154 }, { width: 28, height: 22 }, 'middleBlock3', frontObj, false),
        TallBlock1_towerFront4: Block(world, 'black', { x: 600, y:  203 }, { width: 23, height: 76 }, 'tallBlock1', frontObj, false),
    };

    const castle  = {
        ...towerFront1,
        ...towerFront2,
        ...towerFront3,
        ...towerFront4,
        ...towerBack1,
        ...supportingStructureBack1,
        ...towerBack2,
        ...towerBack3,
        ...towerBack4,
    };
        
    return {
        physics: { engine, world },

        Heart: Heart(world, { x: 538, y:  215 }),

        Ammo: Ammo(world, { x: 210, y: 250 }, { radius: 10 }, 'Ammo'),

        CastlePlatform: Ground(world, 'black', { x: windowWidth - 136, y:  windowHeight - 83 }, { width: 165, height: 70 }),
        PlayerPlatform: Ground(world, 'black', { x: 200, y:  windowHeight - 58 }, { width: 150, height: 40 }),
        
        ...castle,
    };
};