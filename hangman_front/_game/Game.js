import React, {Component} from 'react';
import Keypad from './Keypad';

class Game extends Component{
    constructor(props){
        super(props);
        this.state ={
            word: '',
            solution: [],
            health: -1
        }
    }
    render(){
        return(<div>
            <h1>Game Component</h1>
            <Keypad select_letter={this.handle_letter_choice.bind(this)} />
        </div>)
    }

    componentDidMount(){
        this.setState({word:'test', solution:['_','_','_','_'], health:5});
    }

    handle_letter_choice(letter){
        console.log(letter)
        let letter_found = false;
        this.state.word.split('').forEach( (el,i) => {
            if(letter==el){
                letter_found = true;
                this.state.solution[i] = letter;
            }
        })
        
        // console.log(this.state.solution)

    }
}

export default Game;