import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {GlobalStyles} from "./styles/globalStyles";
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/themes/main.theme";
import {BrowserRouter} from "react-router-dom";
import { ConfigProvider } from 'antd';
import {ColorBlindProvider} from "./providers/colorBlindProvider";
import {FilterProvider} from "./providers/filterProvider";
import {OptionProvider} from "./providers/optionProvider";

// @ts-ignore

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <GlobalStyles/>
          <ConfigProvider
              theme={{
                  token: {
                      colorPrimary: '#32323A',
                  },
              }}
          >
              <OptionProvider>
              <ColorBlindProvider>
                  <FilterProvider>
                        <App/>
                  </FilterProvider>
              </ColorBlindProvider>
                </OptionProvider>
          </ConfigProvider>
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
