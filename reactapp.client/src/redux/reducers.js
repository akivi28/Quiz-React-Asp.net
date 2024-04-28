import { combineReducers } from "redux";
import {
    ADD_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS, CLEAR_QUIZ,
    FETCH_DIFFICULTY_FAILURE,
    FETCH_DIFFICULTY_REQUEST,
    FETCH_DIFFICULTY_SUCCESS, FETCH_HISTORY_FAILURE, FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS,
    FETCH_QUESTIONS_FAILURE,
    FETCH_QUESTIONS_REQUEST,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUIZ_CATEGORIES_FAILURE,
    FETCH_QUIZ_CATEGORIES_REQUEST,
    FETCH_QUIZ_CATEGORIES_SUCCESS,
    FETCH_TYPES_FAILURE,
    FETCH_TYPES_REQUEST,
    FETCH_TYPES_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    SET_QUIZ_CATEGORY,
    SET_QUIZ_DIFFICULTY,
    SET_QUIZ_QUESTIONS,
    SET_QUIZ_SELECTED_ANSWERS,
    SET_QUIZ_TYPE
} from "./types"

const userPrototype = {
    userName: "userName",
    dateOfBirth: "dateOfBirth",
    email: "login",
    password: "password",
    confirmPassword: "confirmPassword"
};

const initialCurrentUserState = {
    currentUser: userPrototype,
    loading: false,
    error: ''
}
const usersReducer = (state = initialCurrentUserState, action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {...state, loading: true};
        case ADD_USER_SUCCESS:
            return {...state, loading: false, currentUser: action.payload, error: ''};
        case ADD_USER_FAILURE:
            return {...state, loading: false, currentUser:undefined, error: action.payload};
        case LOGIN_USER_REQUEST:
            return {...state, loading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, loading: false, currentUser: action.payload, error: ''};
        case LOGIN_USER_FAILURE:
            return {...state, loading: false, currentUser:undefined, error: action.payload};
        default:
            return state;
    }
}
const currentUserReducer = (state = initialCurrentUserState, action)=>{
    switch(action.type){
        case GET_USER_REQUEST:
            return { ...state, loading: true };
        case GET_USER_SUCCESS:
            return { ...state, loading: false, currentUser: action.payload, error: '' };
        case GET_USER_FAILURE:
            return { ...state, loading: false, currentUser: undefined, error: action.payload };
        default: return state
    }
}

const intialState = {
    loading: false,
    data: [],
    error: ''
}

const categoriesReducer = (state = intialState, action)=>{
    switch(action.type){
        case FETCH_QUIZ_CATEGORIES_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_QUIZ_CATEGORIES_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_QUIZ_CATEGORIES_FAILURE:
            return{
                loading: false,
                data:[],
                error: action.payload
            }
        default:
            return state;
    }
}

const typesReducer = (state = intialState, action)=>{
    switch(action.type){
        case FETCH_TYPES_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_TYPES_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_TYPES_FAILURE:
            return{
                loading: false,
                data:[],
                error: action.payload
            }
        default:
            return state;
    }
}

const difficultyReducer = (state = intialState, action)=>{
    switch(action.type){
        case FETCH_DIFFICULTY_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_DIFFICULTY_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_DIFFICULTY_FAILURE:
            return{
                loading: false,
                data:[],
                error: action.payload
            }
        default:
            return state;
    }

}

const questionsReducer = (state = intialState, action)=>{
    switch(action.type){
        case FETCH_QUESTIONS_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_QUESTIONS_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_QUESTIONS_FAILURE:
            return{
                loading: false,
                data:[],
                error: action.payload
            }
        default:
            return state;
    }
}

const initialQuizState = {
    questions: [],
    category: '',
    type: '',
    difficulty: '',
    selectedAnswers: []
}

const quizReducer = (state = initialQuizState, action)=>{
    switch(action.type){
        case SET_QUIZ_QUESTIONS:
            return{
                ...state,
                questions: action.payload
            }
        case SET_QUIZ_CATEGORY:
            return{
                ...state,
                category: action.payload
            }
        case SET_QUIZ_TYPE:
            return{
                ...state,
                type: action.payload
            }
        case SET_QUIZ_DIFFICULTY:
            return{
                ...state,
                difficulty: action.payload
            }
        case SET_QUIZ_SELECTED_ANSWERS:
            return{
                ...state,
                selectedAnswers: action.payload
            }
            case CLEAR_QUIZ:
                return{
                    ...initialQuizState
                }
        default:
            return state;
    }
}

const historyReducer = (state = intialState, action)=>{
    switch(action.type){
        case FETCH_HISTORY_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_HISTORY_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_HISTORY_FAILURE:
            return{
                loading: false,
                data:[],
                error: action.payload
            }
        default:
            return state;
    }

}
const rootReducer = combineReducers({
    users: usersReducer,
    currentUser: currentUserReducer,
    categories: categoriesReducer,
    types: typesReducer,
    difficulty: difficultyReducer,
    questions: questionsReducer,
    currentQuiz: quizReducer,
    history: historyReducer
})

export default rootReducer;
