import React from 'react';

const Graphic = ({health}) => {
    const health_image_map = {
        5: <img src='/images/hangman_0.jpg'/>,
        4: <img src='/images/hangman_1.jpg'/>,
        3: <img src='/images/hangman_2.jpg'/>,
        2: <img src='/images/hangman_3.jpg'/>,
        1: <img src='/images/hangman_4.jpg'/>,
        0: <img src='/images/hangman_5.jpg'/>
    }
    return(<div>
        { health_image_map[health] }
    </div>)
}
export default Graphic;