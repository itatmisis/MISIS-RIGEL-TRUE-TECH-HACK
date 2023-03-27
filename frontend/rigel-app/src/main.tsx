import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {GlobalStyles} from "./styles/globalStyles";
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/themes/main.theme";
import {BrowserRouter} from "react-router-dom";
import { ConfigProvider } from 'antd';

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
          <App />
          </ConfigProvider>
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
