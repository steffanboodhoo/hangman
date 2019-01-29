// import Axios from "axios";
// const axios = require('axios');
window.onload = function(){
    let WORD = '', SOLUTION = [], HEALTH=-1, HEALTH_DISPLAY = {}, WIN=false;

    axios.get('http://localhost:5000/game/start').then( resp => {
        console.log(resp.data)
        WORD = resp.data.word;
        SOLUTION = resp.data.solution;
        HEALTH = resp.data.health;
        
        update_solution_view('#solution_display', SOLUTION);
        update_health_view(HEALTH);
        // $('#stats_display').append( $('<h4>').append(`Health Remaining:${health}`) )
    })

    //INIT BUTTONS
    const create_buttons = () => {
        const options = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        let buttons = options.map( el => {
            let btn = $('<button>',{class:'waves-effect waves-light btn btn-letter'}).append(el)
            btn.click( (ev) => {
                handle_select_letter(el)
            })
            return btn;
        })
        return buttons;
    }
    $('#buttons_display').append(create_buttons());
    $('#reset_game').click( ev =>{
        axios.get('/game/reset')
        window.location.reload();
    })

    //INIT HEALTH/HANGMAN DISPLAY
    const init_health_display = () => {
        HEALTH_DISPLAY = {
            5: $('<img>', {src:'/static/images/hangman_0.jpg'}),
            4: $('<img>', {src:'/static/images/hangman_1.jpg'}),
            3: $('<img>', {src:'/static/images/hangman_2.jpg'}),
            2: $('<img>', {src:'/static/images/hangman_3.jpg'}),
            1: $('<img>', {src:'/static/images/hangman_4.jpg'}),
            0: $('<img>', {src:'/static/images/hangman_5.jpg'})
        }
    }
    init_health_display()


    //SOLUTION VIEW
    const update_solution_view = (container_id, solution) => {
        console.log(solution)
        let elem = $('<h1>',{id:'solution'}).append(solution.join(' '))
        $(container_id).empty()
        $(container_id).append(elem)
    }

    const handle_select_letter  = (letter) => {
        if(HEALTH==0||WIN)
            return;
        let found_flag = false;
        WORD.split('').forEach( (el,i) => {
            if (letter == el){
                found_flag=true;
                SOLUTION[i] = el;
            }
        });
        if(found_flag){
            update_solution_view('#solution_display', SOLUTION)
            update_win(WORD,SOLUTION)
        }else{
            HEALTH--;
            update_lose(HEALTH);
        }
        const update_data = {
            solution: SOLUTION,
            word: WORD,
            health: HEALTH
        }
        axios.post('http://localhost:5000/game/update', update_data).then( resp => console.log(resp))
    }

    //HEALTH VIEW
    const update_health_view = (health) => {
        $('#hangman_display').empty()
        $('#hangman_display').append(HEALTH_DISPLAY[health]);
        $('#stats_display').empty()
        $('#stats_display').append( $('<h4>').append(`Health Remaining:${health}`) )
    }

    //WINNER
    const update_win = (WORD, SOLUTION) => {
        if (SOLUTION.join('')!=WORD)
            return;
        WIN=true
        $('#stats_display').append( $('<h4>').append('You Win') )
    }
    //LOSER
    const update_lose = (health) => {
        update_health_view(health);
        if(HEALTH!=0)
            return;
        //TODO
        $('#stats_display').append( $('<h4>').append('You Loose') )
    }
    
    //SCORES VIEW
    axios.get('http://localhost:5000/score').then( resp => {
        create_scores_view(resp.data)
    })
    const create_scores_view = (scores) => {
        console.log(scores)
        let elems = scores.map( el => {
            let row = $('<div>',{class:'row'})
            $('<div>',{class:'col s6'}).append(el.credentials).appendTo(row)
            $('<div>',{class:'col s6'}).append(el.score).appendTo(row)
            return row;
        })
        console.log('pew pepw')
        $('#scores').append(elems)
    }
}