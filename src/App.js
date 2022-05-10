import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { getTokenOrRefresh } from './token_util';
import './custom.css'
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import Login from './Components/login';
import Register from './Components/register';
import Speech from './Components/speech'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



export default class App extends Component {
    

    render() {
        return (
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Speech" element={<Speech />} />
                </Routes>
            </BrowserRouter>
            
        );
    }
}