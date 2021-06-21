import { useHistory } from 'react-router-dom'
import './index.scss'
import {useEffect, useRef} from "react";
import * as PIXI from 'pixi.js'
import TextInput from '../../../Modules/Helper/PixiTextInput'


function Editor(props) {
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

        let textInput = new TextInput({
            input: {
                fontFamily: 'Arial',
                fontSize: '50px',
                color: '#26272E',
                multiline: 'true',
                overflow: "hidden"
            },
            // box: {
            //     default: {fill: 0xE8E9F3, rounded: 16, stroke: {color: 0xCBCEE0, width: 4}},
            //     focused: {fill: 0xE1E3EE, rounded: 16, stroke: {color: 0xABAFC6, width: 4}},
            //     disabled: {fill: 0xDBDBDB, rounded: 16}
            // }
        })

        const text = "TEXT"
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: '32px',
            fontWeight: 400,
            stroke: '#25556f',
            strokeThickness: 10
        })
        const textInput2 = new PIXI.Text(text, style)
        textInput.setInputStyle("stroke", "#25556f")
        textInput.setInputStyle("strokeThickness", 10)
        app.stage.addChild(textInput)
    }, [])

    return (
        <div className="editor-root-container">
            <h3>Editor Test</h3>
            <div className="pixi-container" ref={pixiContainer}></div>
        </div>
    )
}

export default Editor