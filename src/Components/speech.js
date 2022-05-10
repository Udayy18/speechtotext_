import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { getTokenOrRefresh } from '../token_util';
import { Navigate } from 'react-router-dom';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';



const speechsdk = require('microsoft-cognitiveservices-speech-sdk')


export default class Speech extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayText: 'INITIALIZED: ready to test speech...'
        }
    }

    handleLogout(){
        localStorage.setItem("loggedin", 0);
        return <Navigate to="/" />
        // this.props.history.push('/')
        // window.location.href = "/";
    }
    
    async componentDidMount() {
        // check for valid speech key/region
        const tokenRes = await getTokenOrRefresh();
        if (tokenRes.authToken === null) {
            this.setState({
                displayText: 'FATAL_ERROR: ' + tokenRes.error
            });
        }
    }

    async sttFromMic() {
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-IN';

        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        this.setState({
            displayText: 'speak into your microphone...'
        });

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            this.setState({
                displayText: displayText
            });
        });
    }

    async fileChange(event) {
        const audioFile = event.target.files[0];
        console.log(audioFile);
        const fileInfo = audioFile.name + ` size=${audioFile.size} bytes `;

        this.setState({
            displayText: fileInfo
        });

        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';

        const audioConfig = speechsdk.AudioConfig.fromWavFileInput(audioFile);
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            this.setState({
                displayText: fileInfo + displayText
            });
        });
    }

    render() {
        
        if(localStorage.getItem("loggedin")==0)
        
        return(
            <div>
                please login before accessing the portal
                </div>
        )
        return(

        <Container className="app-container">
                <html lang="en" dir="ltr">
                <head>
                    <title>Speech to text transcription</title>
                    {/* <link rel="stylesheet" href="nextpage.css"></link> */}
                </head>
                <body>
                    <div class="wrapper">
                    <header>Speech to text</header>
                    <form action="#">
                        <div class="row">
                        <label>Transcripted Text</label>
                        
                            <div className="col-6 output-display rounded">
                                <code>{this.state.displayText}</code>
                            
                            </div>
                        </div>
                        <button id="startRecognizeOnceAsyncButton" onClick={() => this.sttFromMic() }>Start</button>
                        <button id="logoutbutton" onClick={() => this.handleLogout() }>logout</button>
                    </form>
                    </div>
                    <script src="nextpage.js"></script>
                </body>
                </html>
                
            </Container>
        );
    }
}


