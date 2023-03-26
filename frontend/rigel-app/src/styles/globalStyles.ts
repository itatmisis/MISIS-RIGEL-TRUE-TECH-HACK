import {createGlobalStyle} from "styled-components";
import {theme} from "./themes/main.theme";
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
  
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
    
    html, body {
        font-family: ${theme.fonts.family};
        font-size: ${theme.sizes.font};
        font-weight: ${theme.fonts.weight.normal};
        color: ${theme.colors.text};
        background-color: ${theme.colors.background};
        min-height: 100vh;
        min-width: 100vw;
    }
    
    }`;
        

