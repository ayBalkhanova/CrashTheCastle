import Matter from 'matter-js'
import React from 'react'
import { Image, View } from 'react-native'

let shown = true;

const Shield = props => {
    const radiusBody = props.body.circleRadius;

    const xBody = props.body.position.x - radiusBody;
    const yBody = props.body.position.y - radiusBody;

    if (shown) {
        return(
            <View style={{ zIndex: 1000 }}>
                <Image source={require('../assets/sprites/shield.png')}
                    style={{
                    position: 'absolute',
                    left: xBody,
                    top: yBody,
                    width: radiusBody * 2,
                    height: radiusBody * 2,
                    borderRadius: radiusBody * 2,
                    opacity: 0.7, 
                }}/>
            </View>
        );
    };
};

export default (world, position, size) => {
   const shield = Matter.Bodies.circle(
       position.x,
       position.y,
       size.radius,
       {
        label: 'Shield',
        isStatic: true,
        collisionFilter: {
            category: 0x0600,
            mask: 0x0001,
        },
    }
   );

   shield.shown = shown;

   Matter.World.add(world, shield);

   return {
       body: shield,
       position,
       renderer: <Shield/>
   }
}
