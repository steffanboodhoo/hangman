import Axios from "axios";
import Cookies from 'js-cookie';

const RECIEVE_GAME = 'GAME/RECIEVE_GAME';
export const types = {RECIEVE_GAME};

export const start_game = (dispatch) => {

    Axios.get('http://localhost:5000/game/start').then( resp => {
        console.log(resp)
        dispatch({
            type: RECIEVE_GAME,
            payload: resp.data
        })
    })
}