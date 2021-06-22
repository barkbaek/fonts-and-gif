import { useHistory } from 'react-router-dom'
import './index.scss'
import {useEffect, useRef, useState} from "react";
import * as PIXI from 'pixi.js'

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

        // app.stage.addChild(textInput)

    }, [])


    return (
        <div className="gif-root-container">
            <h3>Gif</h3>
            <div className="pixi-container" ref={pixiContainer}></div>
        </div>
    )
}

export default Gif