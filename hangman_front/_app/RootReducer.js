import { combineReducers } from 'redux';
import Game from '../ducks/Game/Reducer';

const RootReducer = combineReducers({
    Game
})

export default RootReducer;