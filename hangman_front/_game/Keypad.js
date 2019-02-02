import React from 'react';
import { create } from 'domain';

const Keypad = ({select_letter}) => {
    const letters = [...Array(26).keys()].map( el => el+97 ) //26 letters, 'a' is 97 in ascii
    const numbers = [...Array(10).keys()].map( el => el+48 ) //10 digits, '0' is  48 in ascii
    let keys = letters.concat(numbers);
    // keys.map( el => String.fromCharCode(el) )
    return(<div>
        {keys.map( (el,i) => <GameButton key={i} code={el} handle_choice={select_letter}/> )}
    </div>)
}
const GameButton = ({code, handle_choice}) => {
    let char = String.fromCharCode(code);
    return( 
        // create function that accepts the default click event but sends code to handle_choice function that was passed in 
        <button onClick={ (ev)=>{handle_choice(char)} }>
            {char}
        </button>
    )
}

export default Keypad;