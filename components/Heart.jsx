import Matter from 'matter-js'
import React from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'

const Heart = props => {
    const radiusBody = props.body.circleRadius;

    const xBody = props.body.position.x - radiusBody;
    const yBody = props.body.position.y - radiusBody;

    return(
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: radiusBody * 2,
            height: radiusBody * 2,
            borderRadius: radiusBody * 2,
        }}/>
    )
}

export default (world, position) => {
    const heart = Matter.Bodies.circle(position.x, position.y, 10, {
            label: 'Heart',
            isSensor: true,
            isStatic: true,
            collisionFilter: {
                category: 0x0500,
                mask: 0x0001,
            }
            },
        )

   Matter.World.add(world, heart);

   return {
       body: heart,
       position,
       renderer: <Heart/>
   }
}
