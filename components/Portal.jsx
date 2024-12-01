import Matter from 'matter-js';
import React from 'react';
import { Image } from 'react-native';
import { Svg, Line } from 'react-native-svg';

import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const Portal = props => {

    const vertices = props.body.vertices.map(({ x, y }) => ({ x, y }));

    let width = Math.sqrt(Math.pow((vertices[1].x - vertices[0].x), 2) + Math.pow((vertices[1].y - vertices[0].y), 2));
    const height = Math.sqrt(Math.pow((vertices[3].x - vertices[0].x), 2) + Math.pow((vertices[3].y - vertices[0].y), 2));

    const centerX = vertices.reduce((sum, vertix) => sum + vertix.x, 0) / 4;
    const centerY = vertices.reduce((sum, vertix) => sum + vertix.y, 0) / 4;

    const left = Math.round(centerX) - width / 2;
    const top = Math.round(centerY) - height / 2;
    

    return (
        <Svg height={windowHeight} width={windowWidth+100} style={{ position: 'absolute', left: 0, top: 0, zIndex: props.body.zIndex }}>
            <Line x1={vertices[0].x} y1={vertices[0].y} x2={vertices[1].x} y2={vertices[1].y} stroke='lightblue' strokeWidth="0.5" />
            <Line x1={vertices[0].x} y1={vertices[0].y} x2={vertices[3].x} y2={vertices[3].y} stroke='lightblue' strokeWidth="0.5" />
            <Line x1={vertices[2].x} y1={vertices[2].y} x2={vertices[3].x} y2={vertices[3].y} stroke='lightblue' strokeWidth="0.5" />
            <Line x1={vertices[1].x} y1={vertices[1].y} x2={vertices[2].x} y2={vertices[2].y} stroke='lightblue' strokeWidth="0.5" />
            <Image
                source={require('../assets/sprites/portal.png')}
                resizeMode='stretch'
                style={{
                    left,
                    top,
                    width:80,
                    height:10,
                    transform: [{rotate: `${props.body.angle}rad`}],
                    opacity: 0.8,
                }}
            />
        </Svg>
    );
};

export default (world, position, angle) => {

   const portal = Matter.Bodies.rectangle(
        position.x,
        position.y,
        50, 
        6,
       {
        label: 'Portal',
        isStatic: true,
        angle: angle,
    }
   )

   Matter.World.add(world, portal);

   return {
       body: portal,
       position,
       renderer: <Portal/>
   }
}
