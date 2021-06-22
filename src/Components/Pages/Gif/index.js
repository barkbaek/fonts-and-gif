import { useHistory } from 'react-router-dom'
import './index.scss'
import {useEffect, useRef, useState} from "react";
import * as PIXI from 'pixi.js'
import img1 from './test1.png'
import img2 from './test2.png'

function Gif(props) {
    const pixiContainer = useRef()

    useEffect(() => {
        const app = new PIXI.Application({
            width: 512,         // default: 800
            height: 512,        // default: 600
            transparent: false, // default: false
            antialias: true,   // default: false
            resolution: 1,       // default: 1
            backgroundColor: 0x787878
        })

        pixiContainer.current.appendChild(app.view)

        let images = [img1, img2];
        let textureArray = [];

        for (let i=0; i < images.length; i++)
        {
            let texture = PIXI.Texture.fromImage(images[i]);
            textureArray.push(texture);
        }

        console.dir(textureArray)
        let animatedSprite = new PIXI.extras.AnimatedSprite(textureArray);

        animatedSprite.onLoop = function() {
            console.log("LOOPING");
            //animatedSprite.stop();
        };

        animatedSprite.loop = true;
        animatedSprite.animationSpeed = .1;


        animatedSprite.play();

        app.stage.addChild(animatedSprite)

    }, [])


    return (
        <div className="gif-root-container">
            <h3>Gif</h3>
            <div className="pixi-container" ref={pixiContainer}></div>
        </div>
    )
}

export default Gif