import { useHistory } from 'react-router-dom'
import './index.scss'
import {useEffect, useRef, useState} from "react";
import * as PIXI from 'pixi.js'
import gifFrames from '../../../Modules/Helper/GifFrames'
import request from 'request'
import {Button} from "@material-ui/core";

const URL = 'https://www.animatedimages.org/data/media/298/animated-eat-and-drink-image-0400.gif'
let app

function onDragStart (e) {
    this.data = e.data
    this.alpha = 0.5
    this.dragging = true
}

function onDragEnd () {
    this.alpha = 1
    this.dragging = false
    this.data = null
}

function onDragMove () {
    if (this.dragging) {
        let newPosition = this.data.getLocalPosition(this.parent)
        this.position.x = newPosition.x
        this.position.y = newPosition.y
    }
}

const gifToPixi = URL => {
    gifFrames({ url: URL, frames: 'all', outputType: 'canvas' })
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
            animatedSprite.interactive = true
            animatedSprite.buttonMode = true
            animatedSprite
                .on('mousedown', onDragStart)
                .on('touchstart', onDragStart)
                .on('mouseup', onDragEnd)
                .on('mouseupoutside', onDragEnd)
                .on('touchend', onDragEnd)
                .on('touchendoutside', onDragEnd)
                .on('mousemove', onDragMove)
                .on('touchmove', onDragMove)

            app.stage.addChild(animatedSprite)

        }).catch(console.error.bind(console))
}

function Gif(props) {
    const pixiContainer = useRef()
    const testContainer = useRef()

    useEffect(async () => {
        app = new PIXI.Application({
            width: 512,         // default: 800
            height: 512,        // default: 600
            transparent: false, // default: false
            antialias: true,   // default: false
            resolution: 1,       // default: 1
            backgroundColor: 0x787878
        })

        pixiContainer.current.appendChild(app.view)

        // const toDataURL = url => fetch(url)
        //     .then(response => response.blob())
        //     .then(blob => new Promise((resolve, reject) => {
        //         const reader = new FileReader()
        //         reader.onloadend = () => resolve(reader.result)
        //         reader.onerror = reject
        //         reader.readAsDataURL(blob)
        //     }))
        //
        //
        // toDataURL(URL)
        //     .then(dataUrl => {
        //         console.log('RESULT:', dataUrl)
        //     })

        gifToPixi('/images/animation.gif')

    }, [])

    const onChange = async (e) => {
        const file = e.target.files[0]
        let fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = function (e) {
            gifToPixi(e.target.result)
        }
    }

    return (
        <div className="gif-root-container">
            <h3>Gif</h3>
            <Button
                variant="contained"
                component="label"
            >
                GIF 파일 업로드
                <input
                    type="file"
                    onChange={onChange}
                    hidden
                />
            </Button>
            <div className="pixi-container" ref={pixiContainer}></div>
            <div ref={testContainer}></div>
        </div>
    )
}

export default Gif