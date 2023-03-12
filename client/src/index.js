import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import styled, {createGlobalStyle} from "styled-components";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth
  }

  body {
    background-color: var(--bg-main);
  }

  a {
    text-decoration: none;
    font-family: var(--gotham);

  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
`
const Container = styled.div`
  background: #D9E3EC;
  width: 100%
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Global/>
                <Container>
                    <App/>
                </Container>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

