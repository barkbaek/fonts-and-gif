import { useHistory } from 'react-router-dom'
import './index.scss'
import {useEffect, useRef, useState} from "react";
import * as PIXI from 'pixi.js'
import TextInput from '../../../Modules/Helper/PixiTextInput'
// import Button from '@material-ui/core/Button'
// import Menu from '@material-ui/core/Menu'
// import MenuItem from '@material-ui/core/MenuItem'
import { Button, Menu, MenuItem } from '@material-ui/core'

const FontNotoBlack = "NotoSansCJKkr-Black"
const FontNotoBold = "NotoSansCJKkr-Bold"
const FontNotoDemiLight = "NotoSansCJKkr-DemiLight"
const FontNotoLight = "NotoSansCJKkr-Light"
const FontNotoMedium = "NotoSansCJKkr-Medium"
const FontNotoRegular = "NotoSansCJKkr-Regular"
const FontNotoThin = "NotoSansCJKkr-Thin"

const styleTag = document.createElement('style')

function Editor(props) {
    const pixiContainer = useRef()
    styleTag.innerHTML = `
        @font-face {
            font-family: ${FontNotoBlack};
            src: url(/fonts/NotoSansCJKkr-Black.ttf);
        }
        @font-face {
            font-family: ${FontNotoBold};
            src: url(/fonts/NotoSansCJKkr-Bold.ttf);
        }
        @font-face {
            font-family: ${FontNotoDemiLight};
            src: url(/fonts/NotoSansCJKkr-DemiLight.ttf);
        }
        @font-face {
            font-family: ${FontNotoLight};
            src: url(/fonts/NotoSansCJKkr-Light.ttf);
        }
        @font-face {
            font-family: ${FontNotoMedium};
            src: url(/fonts/NotoSansCJKkr-Medium.ttf);
        }
        @font-face {
            font-family: ${FontNotoRegular};
            src: url(/fonts/NotoSansCJKkr-Regular.ttf);
        }
        @font-face {
            font-family: ${FontNotoThin};
            src: url(/fonts/NotoSansCJKkr-Thin.ttf);
        }
    `
    document.head.appendChild(styleTag)
    const textInput = useRef()

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

        textInput.current = new TextInput({
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
        textInput.current.setInputStyle("stroke", "#25556f")
        textInput.current.setInputStyle("strokeThickness", 10)
        app.stage.addChild(textInput.current)

    }, [])

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onClickMenuItem = (font) => {
        textInput.current.setInputStyle("fontFamily", font)
        handleClose()
    }

    return (
        <div className="fonts-root-container">
            <h3 className="noto-black">Editor Test</h3>
            <Button aria-controls="dropdown-menu" aria-haspopup="true" onClick={handleClick}>
                기본 폰트
            </Button>
            <Menu
                style={{ marginTop: '40px' }}
                id="dropdown-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className={FontNotoBlack} onClick={() => onClickMenuItem(FontNotoBlack)}>NotoSansCJKkr-Black</MenuItem>
                <MenuItem className={FontNotoBold} onClick={() => onClickMenuItem(FontNotoBold)}>NotoSansCJKkr-Bold</MenuItem>
                <MenuItem className={FontNotoDemiLight} onClick={() => onClickMenuItem(FontNotoDemiLight)}>NotoSansCJKkr-DemiLight</MenuItem>
                <MenuItem className={FontNotoLight} onClick={() => onClickMenuItem(FontNotoLight)}>NotoSansCJKkr-Light</MenuItem>
                <MenuItem className={FontNotoMedium} onClick={() => onClickMenuItem(FontNotoMedium)}>NotoSansCJKkr-Medium</MenuItem>
                <MenuItem className={FontNotoRegular} onClick={() => onClickMenuItem(FontNotoRegular)}>NotoSansCJKkr-Regular</MenuItem>
                <MenuItem className={FontNotoThin} onClick={() => onClickMenuItem(FontNotoThin)}>NotoSansCJKkr-Thin</MenuItem>
            </Menu>
            <div className="pixi-container" ref={pixiContainer}></div>
        </div>
    )
}

export default Editor