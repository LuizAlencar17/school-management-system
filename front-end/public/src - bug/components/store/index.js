import { createStore } from 'redux';

const INITIAL_STATE = {
    activeLesson: {id: 1, title: "First Class"},
    activeModule: {id: 3, title: "First Class"},
    modules: [
        {
            id: 1, 
            title: "Start with React", 
            lessons: [
                {id: 1, title: "First Class"},
                {id: 2, title: "Secound Class"}
            ]
        },
        {
            id: 2, 
            title: "Start with Redux", 
            lessons: [
                {id: 3, title: "First Class"},
                {id: 4, title: "Secound Class"}
            ]
        }
    ]
}

function reducer(state = INITIAL_STATE, action) {
    if(action.type = 'TOGGLE_LESSON'){
        console.log(action.lesson)
        return {
            ...state,
            activeLesson: action.lesson,
            activeModule: action.module
        };
    }
    return state;
}

const store = createStore(reducer);

export default store;