import { fromJS } from 'immutable';
import { types } from './Actions';
const initial_state = fromJS({
    word:'',
    solution:[],
    health:-1
})

export default (state = initial_state, action) => {
    switch(action.type){
    case types.RECIEVE_GAME:{
        return fromJS(action.payload.data)
    }
    default:
        return state;
    }
}