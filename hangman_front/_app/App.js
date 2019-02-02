import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Game from '../_game/Game';
import Score from '../_score/Score';

class App extends Component{
    
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Route path='/game' render={ ()=>{return (<Game/>)} }/>
                    <Route path='/score' render={ ()=>{(<Score/>)} }/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;