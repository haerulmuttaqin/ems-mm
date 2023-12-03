import {useColorModeValue} from "@chakra-ui/react"
import {Global} from "@emotion/react"
import * as React from "react"
import Head from 'next/head';
import {useRecoilState} from 'recoil'
import {titleState} from '@Data/state'

export const CSSReset = () => {
    const [title, setTitle] = useRecoilState(titleState) as any
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Global
                styles={useColorModeValue(
                    `
html {
    background-color: #F7FAFC;
}
mark.custom-marker-1 {
    // background-color: rgb(228, 203, 91);
    background-color: #edff88;
                    color: black;
                    border-radius: 2px;
                    padding:1px;
}
  
::-webkit-scrollbar {
    width: 0.57em;
    height: 0.57em;
}

::-webkit-scrollbar-track {
    background-color: rgb(182, 182, 182, 0.171)
}

::-webkit-scrollbar-thumb {
    background-color: rgb(206, 213, 233);
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgb(164, 172, 199);
}

::-webkit-scrollbar-thumb:active {
    background-color: rgb(151, 160, 189);
}

        .chakra-input, .select-option {
            border-color: #CBD5E0 !important;
        }

        .chakra-input:hover, .select-option {
            border-color: #CBD5E0;
        }

        .chakra-input:focus {
            border-color: #0193C8 !important;
        }
        .chakra-numberinput,
        .chakra-input__left-addon,
        .chakra-select {
            border-color: #CBD5E0 !important;
        }

        .chakra-numberinput>div>div {
            border-color: #CBD5E0;
        }

        .chakra-numberinput:hover,
        .chakra-select:hover {
            border-color: #90a2b4;
        }

        .chakra-numberinput:focus,
        .chakra-select:focus {
            border-color: #0193C8;
            cursor: crosshair;
        }

        .chakra-select:active {
            border-color: #0193C8;
            cursor: crosshair;
        }

        .chakra-input[aria-invalid=true], .chakra-input[data-invalid],
        .chakra-select[aria-invalid=true], .chakra-select[data-invalid],
        .chakra-numberinput[aria-invalid=true], .chakra-numberinput[data-invalid] {
            border-color: #E53E3E !important;
            box-shadow: 0 0 0 1px #e53e3e !important;
        }
        
        .splitter-layout {
            position: absolute;
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        
        .splitter-layout .layout-pane.layout-pane-primary {
            flex: 1 1 auto;
        }
        
        .layout-splitter {
            background: rgb(216, 216, 216);
            opacity: 0.7;
            z-index: 1;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -moz-background-clip: padding;
            -webkit-background-clip: padding;
            background-clip: padding-box;
        }
        
        .layout-splitter:hover {
            -webkit-transition: all 0.5s ease-in-out;
            transition: all 0.5s ease-in-out;
        }
        
        .splitter-layout>.layout-splitter {
            width: 11px;
            border-left: 5px solid rgba(255, 255, 255, 0);
            border-right: 5px solid rgba(255, 255, 255, 0);
            cursor: col-resize;
        }
        
        .splitter-layout .layout-splitter:hover {
            border-left: 5px solid rgba(0, 0, 0, 0.090);
            border-right: 5px solid rgba(0, 0, 0, 0.090);
        }
        
        .splitter-layout.layout-changing {
            cursor: col-resize;
        }
        
        .splitter-layout.layout-changing>.layout-splitter {
            background: rgb(52, 174, 255);
            border-left: 4.5px solid rgb(255, 255, 255);
            border-right: 4.5px solid rgb(255, 255, 255);
        }
        
        .splitter-layout.splitter-layout-vertical {
            flex-direction: column;
        }
        
        .splitter-layout.splitter-layout-vertical.layout-changing {
            cursor: row-resize;
        }
        
        .layout-splitter-vertical {
            background: rgb(216, 216, 216);
            opacity: 0.7;
            z-index: 1;
            height: 300px !important;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -moz-background-clip: padding;
            -webkit-background-clip: padding;
            background-clip: padding-box;
        }
        
        .splitter-layout.splitter-layout-vertical>.layout-splitter {
            margin-left: -5px;
            width: 100%;
            margin-top: 3px;
            cursor: unset;
        }
        
        .splitter-layout.splitter-layout-vertical .layout-splitter:hover {
            border-top: 5px solid rgba(0, 0, 0, 0.090);
            border-bottom: 5px solid rgba(0, 0, 0, 0.090);
        }
        
        .splitter-layout.splitter-layout-vertical.layout-changing>.layout-splitter {
            background: rgb(52, 174, 255);
            border-top: 4.5px solid rgb(255, 255, 255);
            border-bottom: 4.5px solid rgb(255, 255, 255);
        }

        .Select-menu-outer {
            z-index: 999 !important;
          }

        /* The container */
        .container-check {
            display: block;
            position: relative;
            // padding-left: 35px;
            // margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Hide the browser's default checkbox */
        .container-check input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        /* Create a custom checkbox */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 19px;
            width: 19px;
            background-color: #f1f1f17d;
            transition-property: box-shadow;
            transition-duration: var(--chakra-transition-duration-normal);
            border: 2px solid;
            border-radius: 4px;
            border-color: inherit;
        }

        /* On mouse-over, add a grey background color */
        .container-check:hover input ~ .checkmark {
            background-color: #d8d5e57d;
            transition: all 0.2s ease-in-out;
        }

        /* When the checkbox is checked, add a blue background */
        .container-check input:checked ~ .checkmark {
            background-color: var(--chakra-colors-main-500);
        }

        .container-check input:disabled ~ .checkmark {
            background-color: var(--chakra-colors-gray-300);
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
        }

        /* Show the checkmark when checked */
        .container-check input:checked ~ .checkmark:after {
            display: block;
        }

        /* Style the checkmark/indicator */
        .container-check .checkmark:after {
            left: 5px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }

        .Select-menu-outer {
            z-index: 999 !important;
        }

        .iframe-style {
            webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;margin:0 auto;overflow:hidden;height: 200px;width: 100%;
        }

        .select__menu {
            z-index: popover !important;
            position: fixed;
        }

        .mapboxgl-ctrl-bottom-right {
            display: none !important;
        }

        .video-container {
            position: relative !important;
            border-top-left-radius: 15px; 
            border-bottom-left-radius: 15px; 
            border-top-right-radius: 0px; 
            overflow: hidden; 
        }

        @media only screen and (max-width: 700px) {
            .video-container {
                position: relative !important;
                border-top-left-radius: 15px; 
                border-bottom-left-radius: 0px; 
                border-top-right-radius: 15px; 
                overflow: hidden; 
            }
        }
        
        .video-container .bg-video {
          width: 100%;
          height: 100%;
          position: absolute !important;
          object-fit: cover !important;
          z-index: 0;
          top: 50%;
          left: 50%;
        }

        .video-container:after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: linear-gradient(57deg, rgb(31 72 183 / 86%), rgb(31 90 183 / 62%), rgb(85 162 227));
        }

        .mapboxgl-popup-close-button {
            padding-left: 10px !important;
            padding-right: 10px !important;
            padding-top: 5px !important;
            padding-bottom: 5px !important;
        }

        .mapboxgl-popup-content {
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
            border-radius: 8px;
        }
        
.fullscreen-enabled {
  background: transparent !important;
}
:not(:root):fullscreen::backdrop {
background: transparent !important;
}
.fullscreen {
background-image: url("/images/grid-bg.svg");
}
        
`,


`
.gradient-border {
    border: 1px solid;
    border-image: linear-gradient(45deg, rgba(36, 44, 58, 0.45), rgba(36, 44, 58, 0.63), #2d3d54, rgba(36, 44, 58, 0.45)) 5;
}

.gradient-border-2 {
    border: 1px solid;
    border-image: linear-gradient(90deg, rgba(36, 44, 58, 0.45), rgba(36, 44, 58, 0.63), #2d3d54, rgba(36, 44, 58, 0.71)) 5;
}

.fullscreen {
background-image: url("/images/grid-bg2.svg");
}

.fullscreen-enabled {
  background: transparent !important;
}
:not(:root):fullscreen::backdrop {
background: transparent !important;
}
                mark.custom-marker-1 {
                    // background-color: rgb(228, 203, 91);
                    background-color: #edff88;
                    color: black;
                    border-radius: 2px;
                    padding:1px;
                }

                ::-webkit-scrollbar {
                    width: 0.45em;
                    height: 0.45em;
                }

                ::-webkit-scrollbar-track {
                    // background-color: rgb(182, 182, 182, 0.171)                    
                }

                ::-webkit-scrollbar-thumb {
                    // background-color: rgb(206, 213, 233);
                    // background-color: rgb(101, 106, 119);
                    background: rgb(65,81,84);
                    background: linear-gradient(0deg, #1A202C 0%, #4A5568 50%, #1A202C 100%);
                }

                ::-webkit-scrollbar-thumb:hover {
                    background-color: rgb(164, 172, 199);
                }

                ::-webkit-scrollbar-thumb:active {
                    background-color: rgb(151, 160, 189);
                }

        .chakra-input {
            border-color: #3e4854 !important;
        }

        .chakra-input:hover {
            border-color: #5b6877 !important;
        }

        .chakra-input:focus {
            border-color: #0193C8 !important;
        }
        .chakra-numberinput,
        .chakra-numberinput_field,
        .chakra-select {
            border-color: #3e4854 !important;
        }   
        
        .chakra-numberinput:hover,
        .chakra-numberinput_field:hover,
        .chakra-select:hover {
            border-color: #5b6877;
        } 
        
        .chakra-numberinput > input {
            border-color: #3e4854;
        }   

        .chakra-numberinput:focus,
        .chakra-numberinput > input:focus,
        .chakra-select:focus {
            border-color: #0193C8;
            cursor: crosshair;
        }

        .chakra-select:active {
            border-color: #0193C8;
            cursor: crosshair;
        }

        .chakra-input[aria-invalid=true], .chakra-input[data-invalid],
        .chakra-select[aria-invalid=true], .chakra-select[data-invalid],
        .chakra-numberinput[aria-invalid=true], .chakra-numberinput[data-invalid] {
            border-color: #E53E3E !important;
            box-shadow: 0 0 0 1px #e53e3e !important;
        }

        .layout-splitter {
            background: rgb(80, 82, 87);
            opacity: 0.7;
            z-index: 1;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -moz-background-clip: padding;
            -webkit-background-clip: padding;
            background-clip: padding-box;
        }
        
        .layout-splitter:hover {
            -webkit-transition: all 0.5s ease-in-out;
            transition: all 0.5s ease-in-out;
        }
        
        .splitter-layout>.layout-splitter {
            width: 11px;
            border-left: 5px solid rgba(255, 255, 255, 0);
            border-right: 5px solid rgba(255, 255, 255, 0);
            cursor: col-resize;
        }
        
        .splitter-layout .layout-splitter:hover {
            border-left: 5px solid rgba(0, 0, 0, 0.090);
            border-right: 5px solid rgba(0, 0, 0, 0.090);
        }
        
        .splitter-layout.layout-changing {
            cursor: col-resize;
        }
        
        .splitter-layout.layout-changing>.layout-splitter {
            background: rgb(34, 167, 255);
            border-left: 4.5px solid rgba(36, 41, 46, 0.781);
            border-right: 4.5px solid rgba(36, 41, 46, 0.781);
        }
        
        .splitter-layout.splitter-layout-vertical {
            flex-direction: column;
        }
        
        .splitter-layout.splitter-layout-vertical.layout-changing {
            cursor: row-resize;
        }
        
        .layout-splitter-vertical {
            background: rgb(80, 82, 87);
            opacity: 0.7;
            z-index: 1;
            height: 300px !important;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -moz-background-clip: padding;
            -webkit-background-clip: padding;
            background-clip: padding-box;
        }
        
        .splitter-layout.splitter-layout-vertical>.layout-splitter {
            margin-left: -5px;
            width: 100%;
            margin-top: 3px;
            cursor: unset;
        }
        
        .splitter-layout.splitter-layout-vertical .layout-splitter:hover {
            border-top: 5px solid rgba(0, 0, 0, 0.090);
            border-bottom: 5px solid rgba(0, 0, 0, 0.090);
        }
        
        .splitter-layout.splitter-layout-vertical.layout-changing>.layout-splitter {
            background: rgb(34, 167, 255);
            border-top: 4.5px solid rgba(36, 41, 46, 0.781);
            border-bottom: 4.5px solid rgba(36, 41, 46, 0.781);
        }

        .select-option > div > div.select__value-container--has-value {
            div {
                color: white !important;
            }
        }

        /* The container */
        .container-check {
            display: block;
            position: relative;
            // padding-left: 35px;
            // margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Hide the browser's default checkbox */
        .container-check input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        /* Create a custom checkbox */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 19px;
            width: 19px;
            background-color: #f1f1f114;
            transition-property: box-shadow;
            transition-duration: var(--chakra-transition-duration-normal);
            border: 2px solid;
            border-radius: 4px;
            border-color: inherit;
        }

        /* On mouse-over, add a grey background color */
        .container-check:hover input ~ .checkmark {
            background-color: #d8d5e57d;
            transition: all 0.3s ease-in-out;
        }

        /* When the checkbox is checked, add a blue background */
        .container-check input:checked ~ .checkmark {
            background-color: var(--chakra-colors-main-200);
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
        }

        /* Show the checkmark when checked */
        .container-check input:checked ~ .checkmark:after {
            display: block;
        }

        .container-check input:disabled ~ .checkmark {
            background-color: var(--chakra-colors-gray-500);
        }

        /* Style the checkmark/indicator */
        .container-check .checkmark:after {
            left: 5px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid var(--chakra-colors-gray-700);
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        .iframe-style {
            webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;margin:0 auto;overflow:hidden;height: 200px;width: 100%;
        }

        .mapboxgl-ctrl-bottom-right {
            display: none !important;
        }


        .video-container {
            position: relative !important;
            border-top-left-radius: 15px; 
            border-bottom-left-radius: 15px; 
            border-top-right-radius: 0px; 
            overflow: hidden; 
        }

        @media only screen and (max-width: 700px) {
            .video-container {
                position: relative !important;
                border-top-left-radius: 15px; 
                border-bottom-left-radius: 0px; 
                border-top-right-radius: 15px; 
                overflow: hidden; 
            }
        }
        
        .video-container .bg-video {
          width: 100%;
          height: 100%;
          position: absolute !important;
          object-fit: cover !important;
          z-index: 0;
          top: 50%;
          left: 50%;
        }

        .video-container:after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: linear-gradient(57deg, rgb(31 72 183 / 86%), rgb(31 90 183 / 62%), rgb(85 162 227));
        }

        .mapboxgl-popup-close-button {
            padding-left: 10px !important;
            padding-right: 10px !important;
            padding-top: 5px !important;
            padding-bottom: 5px !important;
        }

        .mapboxgl-popup-content {
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
            border-radius: 8px;
        }
`
                )}
            />
        </>
    )
}

export default CSSReset