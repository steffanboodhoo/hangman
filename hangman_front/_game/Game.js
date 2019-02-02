import React, {Component} from 'react';
import Keypad from './Keypad';
import SolutionDisplay from './SolutionDisplay';
import Graphic from './Graphic';

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
            <div>
                <Keypad select_letter={this.handle_letter_choice.bind(this)} />
            </div>
            <div>
                <SolutionDisplay solution={this.state.solution}/>
            </div>
            <div>
                <Graphic health={this.state.health}/>
            </div>
            
        </div>)
    }

    componentDidMount(){
        this.setState({word:'test', solution:['_','_','_','_'], health:5});
    }

    handle_letter_choice(letter){
        let letter_found = false, temp_solution = this.state.solution;
        this.state.word.split('').forEach( (el,i) => {
            if(letter==el){
                letter_found = true;
                temp_solution[i] = letter;
            }
        })

        if(letter_found){
            this.setState({solution:temp_solution})
        }else{
            this.setState({health:this.state.health-1})
        }
        // console.log(this.state.solution)

    }
}

export default Game;