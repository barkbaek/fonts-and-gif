import { useHistory } from 'react-router-dom'
import './index.scss'
import {useEffect, useRef, useState} from "react";
import * as PIXI from 'pixi.js'
import gifFrames from '../../../Modules/Helper/GifFrames'

function Gif(props) {
    const pixiContainer = useRef()
    const testContainer = useRef()

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

        gifFrames({ url: '/images/animation.gif', frames: 'all', outputType: 'canvas' })
            .then(function (frameData) {
                let images = [];

                for (let i = 0; i < frameData.length; i++) {
                    let canvas = frameData[i].getImage()
                    let img = canvas.toDataURL("image/png")
                    images.push(img)
                    // let imgTag = document.createElement('img')
                    // imgTag.classList.add('gif-splitted')
                    // imgTag.setAttribute('src', img)
                    // testContainer.current.appendChild(imgTag)
                }

                let textureArray = [];

                for (let i=0; i < images.length; i++)
                {
                    let texture = PIXI.Texture.fromImage(images[i]);
                    textureArray.push(texture);
                }
                let animatedSprite = new PIXI.extras.AnimatedSprite(textureArray);

                animatedSprite.onLoop = function() {
                    console.log("LOOPING");
                    //animatedSprite.stop();
                };

                animatedSprite.loop = true;
                animatedSprite.animationSpeed = .1;

                animatedSprite.play();

                app.stage.addChild(animatedSprite)

            }).catch(console.error.bind(console));

    }, [])


    return (
        <div className="gif-root-container">
            <h3>Gif</h3>
            <div className="pixi-container" ref={pixiContainer}></div>
            <div ref={testContainer}></div>
        </div>
    )
}

export default Gif