import {createGlobalStyle} from "styled-components";
import {theme} from "./themes/main.theme";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'MTSSans-Regular';
    src: url('/src/assets/fonts/MTSSans-Regular__W.woff2') format('woff2');
  }

  @font-face {
    font-family: 'MTSSans-Medium';
    src: url('/src/assets/fonts/MTSSans-Medium__W.woff2') format('woff2');
  }

  @font-face {
    font-family: 'MTSSans-Bold';
    src: url('/src/assets/fonts/MTSSans-Bold__W.woff2') format('woff2');
  }

  @font-face {
    font-family: 'MTSSans-Black';
    src: url('/src/assets/fonts/MTSSans-Black__W.woff2') format('woff2');
  }


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  html, body {
    font-family: 'MTSSans-Regular', sans-serif;
    font-size: ${theme.sizes.font};
    font-weight: ${theme.fonts.weight.normal};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    min-height: 100vh;
    min-width: 100vw;
    scroll-behavior: smooth;
  }

  button {
    border: none;
    cursor: pointer;
  }

  video::-webkit-media-controls-fullscreen-button {
    display: none;
  }

  b, h1, h2, h3, h4, h5, h6 {
    font-family: 'MTSSans-Bold', sans-serif;
  }

  }`;
        

