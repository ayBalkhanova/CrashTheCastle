import Matter from 'matter-js'
import React from 'react'
import { View } from 'react-native'

const Ground = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2

    const color = props.color;

    return(
        <View style={{
            borderColor: color,
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
        }}/>
    )
}

export default (world, color, pos, size) => {
    
   const initialGround = Matter.Bodies.rectangle(
       pos.x,
       pos.y,
       size.width,
       size.height,
       {
           label: 'Ground',
           isStatic: true,
           collisionFilter: {
            category: 0x0100,
            mask: 0x0200 | 0x0400 | 0x0001,
           }
        }
   )
   Matter.World.add(world, initialGround);

   return {
       body: initialGround,
       color,
       pos,
       renderer: <Ground/>
   }
}
