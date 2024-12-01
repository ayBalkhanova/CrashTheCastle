import Matter from 'matter-js';
import React from 'react';
import { Svg, Line } from 'react-native-svg';
import { Dimensions, Image } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Crack = props => {
    const vertices = props.body.vertices.map(({ x, y }) => ({ x, y }));
        // return (
        //     <Svg height={windowHeight} width={windowWidth+100} style={{ position: 'absolute', left: 0, top: 0 }}>
        //         <Line x1={vertices[0].x} y1={vertices[0].y} x2={vertices[1].x} y2={vertices[1].y} stroke='black' strokeWidth="2" />
        //         <Line x1={vertices[0].x} y1={vertices[0].y} x2={vertices[3].x} y2={vertices[3].y} stroke='black' strokeWidth="2" />
        //         <Line x1={vertices[2].x} y1={vertices[2].y} x2={vertices[3].x} y2={vertices[3].y} stroke='black' strokeWidth="2" />
        //         <Line x1={vertices[1].x} y1={vertices[1].y} x2={vertices[2].x} y2={vertices[2].y} stroke='black' strokeWidth="2" />
        //     </Svg>
        // )
        return (
            <Image source={require('../assets/sprites/crack.png')}
                    style={{
                    position: 'absolute',
                    left: 412,
                    top: 20,
                    width: 260,
                    height: 260,
                    borderRadius: 260,
                }}/>
        )
}

export default (world, position) => {

    const shieldCrack = Matter.Bodies.rectangle(position.x, position.y, 50, 10, {
            label: 'ShieldCrack',
            isSensor: true,
            isStatic: true,
            angle: 2.15,
            collisionFilter: {
                category: 0x0500,
                mask: 0x0001,
            }
    })

   Matter.World.add(world, shieldCrack);

   return {
       body: shieldCrack,
       position,
       renderer: <Crack/>
   }
}
