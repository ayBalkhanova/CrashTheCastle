import Matter from 'matter-js';
import React from 'react';
import { Image, View } from 'react-native';
import { Line, Svg } from 'react-native-svg';

import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CastleParts = (props) => {

    const imagesDict = {
        block1:  require('../assets/sprites/blocks/block1.png'),
        longBlock1: require('../assets/sprites/blocks/longBlock1.png'),
        middleBlock1: require('../assets/sprites/blocks/middleBlock1.png'),
        middleBlock2: require('../assets/sprites/blocks/middleBlock2.png'),
        middleBlock3: require('../assets/sprites/blocks/middleBlock3.png'),
        middleBlock4: require('../assets/sprites/blocks/middleBlock4.png'),
        tallBlock1: require('../assets/sprites/blocks/tallBlock1.png'),
        tallBlock2: require('../assets/sprites/blocks/tallBlock2.png'),
        tallBlock3: require('../assets/sprites/blocks/tallBlock3.png'),
        tallBlock4: require('../assets/sprites/blocks/tallBlock4.png'),
        tallBlock5: require('../assets/sprites/blocks/tallBlock5.png'),
        top1: require('../assets/sprites/blocks/top1.png'),
        top2: require('../assets/sprites/blocks/top2.png'),
        top3: require('../assets/sprites/blocks/top3.png'),
        topBottom1: require('../assets/sprites/blocks/topBottom1.png'),
    };

    const color = props.color;
    const img = imagesDict[props.body.castlePartName];

    if (props.body.label === 'circle') {
        return (
            <View
                style={{
                    position: 'absolute',
                    left: props.position.x - props.body.circleRadius,
                    top: props.position.y - props.body.circleRadius,
                    width: props.body.circleRadius * 2,
                    height: props.body.circleRadius * 2,
                    borderRadius: props.body.circleRadius,
                    borderColor: color,
                    borderWidth: 3,
                    backgroundColor: 'red',
                }}
            />
        )
    } else if (props.body.label === 'triangle') {

        const vertices = props.body.vertices.map(({ x, y }) => ({ x, y }));
        
        let width = props.body.triangleWidth;
        const height = props.body.triangleHeight;

        const centerX = vertices.reduce((sum, vertix) => sum + vertix.x, 0) / 3;
        const centerY = vertices.reduce((sum, vertix) => sum + vertix.y, 0) / 3;


        if (props.body.castlePartName === 'top3') {
            width *= 1.2;
        }

        const left = Math.round(centerX) - width / 2;
        const top = Math.round(centerY) - height / 2;

        return (
            <Svg height={windowHeight} width={windowWidth + 100} style={{ position: 'absolute', top: -0.15 * height, left: 0, zIndex: props.body.zIndex + 10 }}>
                {/* <Line x1={firstCord.x} y1={firstCord.y} x2={secondCord.x} y2={secondCord.y} stroke='lightblue' strokeWidth="0.5" />
                <Line x1={thirdCord.x} y1={thirdCord.y} x2={firstCord.x} y2={firstCord.y} stroke='lightblue' strokeWidth="0.5" />
                <Line x1={secondCord.x} y1={secondCord.y} x2={thirdCord.x} y2={thirdCord.y} stroke='lightblue' strokeWidth="0.5" /> */}
                <Image
                    source={img}
                    resizeMode='stretch'
                    style={{
                        width: width,
                        height: height,
                        left,
                        top,
                        transform: [{rotate: `${props.body.angle}rad`}],
                    }}
                />
            </Svg>
        );
    }
    else if (props.body.label === 'rectangle') {

        const vertices = props.body.vertices.map(({ x, y }) => ({ x, y }));

        let width = Math.sqrt(Math.pow((vertices[1].x - vertices[0].x), 2) + Math.pow((vertices[1].y - vertices[0].y), 2));
        const height = Math.sqrt(Math.pow((vertices[3].x - vertices[0].x), 2) + Math.pow((vertices[3].y - vertices[0].y), 2));

        if (props.body.castlePartName === 'block1') {
            width += 4;
        }

        const centerX = vertices.reduce((sum, vertix) => sum + vertix.x, 0) / 4;
        const centerY = vertices.reduce((sum, vertix) => sum + vertix.y, 0) / 4;

        const left = Math.round(centerX) - width / 2;
        const top = Math.round(centerY) - height / 2;
        

        return (
            <Svg height={windowHeight} width={windowWidth+100} style={{ position: 'absolute', left: 0, top: 0, zIndex: props.body.zIndex }}>
                {/* <Line x1={vertices[0].x} y1={vertices[0].y} x2={vertices[1].x} y2={vertices[1].y} stroke='lightblue' strokeWidth="0.5" />
                <Line x1={vertices[0].x} y1={vertices[0].y} x2={vertices[3].x} y2={vertices[3].y} stroke='lightblue' strokeWidth="0.5" />
                <Line x1={vertices[2].x} y1={vertices[2].y} x2={vertices[3].x} y2={vertices[3].y} stroke='lightblue' strokeWidth="0.5" />
                <Line x1={vertices[1].x} y1={vertices[1].y} x2={vertices[2].x} y2={vertices[2].y} stroke='lightblue' strokeWidth="0.5" /> */}
                <Image
                    source={img}
                    resizeMode='stretch'
                    style={{
                        left,
                        top,
                        width,
                        height,
                        transform: [{rotate: `${props.body.angle}rad`}],
                    }}
                />
            </Svg>
        );
    }
}

export const Block = (world, color, position, size, name, location, isStatic) => {
    const options = {
        isStatic,
        friction: 1,
        restitution: 0,
        frictionStatic: 10,
        slop: 0,
        density: 60,
        frictionAir: 0,
    }
    let label, block;


    if (name === 'top1' || name === 'top2' || name === 'top3') {
        label = 'triangle';
        
        options.label = label;
        options.collisionFilter = { 
            category: location.collisionGroup,
            mask: location.collisionGroup | 0x0100 | 0x0001,
        };

        const vertices = [
            { x: position.x, y: position.y - size.height }, // Верхняя вершина
            { x: position.x - size.width / 2, y: position.y }, // Левая нижняя вершина
            { x: position.x + size.width / 2, y: position.y }, // Правая нижняя вершина
        ];
    
        block = Matter.Bodies.fromVertices(position.x, position.y, vertices, options);
        block.triangleWidth = size.width;
        block.triangleHeight = size.height;
    } else {
        label = 'rectangle';
        options.label = label;
        options.collisionFilter = { 
            category: location.collisionGroup,
            mask: location.collisionGroup | 0x0100 | 0x0001,
        };
        
        block = Matter.Bodies.rectangle(position.x, position.y, size.width, size.height, options);
    }

    block.castlePartName = name;
    block.blockType = 'castlePart';
    block.castleGroup = location.castleGroup;
    Matter.Sleeping.set(block, true);
    block.zIndex = location.zIndex;

    Matter.Body.setStatic(block, isStatic);

    Matter.World.add(world, block);

    return {
        body: block,
        color,
        position,
        renderer: <CastleParts />,
    }
}