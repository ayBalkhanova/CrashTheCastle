import Matter from 'matter-js'
import React from 'react'
import { Image, View } from 'react-native'

const ammoImg = require('../assets/sprites/ammo.png');
const magicAmmoImg = require('../assets/sprites/magicAmmo.png');

const Ammo = props => {
    const radiusBody = props.body.circleRadius;

    const xBody = props.body.position.x - radiusBody;
    const yBody = props.body.position.y - radiusBody;

    const img = props.body.label === 'MagicAmmo' ? magicAmmoImg : ammoImg;

    return(
        <View>
            <Image source={img}
             style={{
                borderWidth: 1,
                borderColor: 'rgb(27, 32, 52)',
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: radiusBody * 2,
                height: radiusBody * 2,
                borderRadius: radiusBody * 2,
                zIndex: 2,
        }}/>
        <Image source={require('../assets/sprites/cannon.png')}
             style={{
                position: 'absolute',
                resizeMode: 'contain',
                left: 155,
                top: 225,
                width: radiusBody * 7,
                height: radiusBody * 7,
                zIndex: 10,
            }}/>
        </View>
    )
}

export default (world, position, size, label) => {
   const ammo = Matter.Bodies.circle(
       position.x,
       position.y,
       size.radius,
       {
        label,
        density: 10,
        collisionFilter: {
            category: 0x0001,
            mask: 0x0100 | 0x0200 | 0x0400 | 0x0500 | 0x0600,
        },
    });


    Matter.World.add(world, ammo);

    return {
       body: ammo,
       position,
       renderer: <Ammo/>
   }
}
