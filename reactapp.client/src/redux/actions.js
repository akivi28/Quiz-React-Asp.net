import axios from "axios"
import {
    ADD_QUIZ_FAILURE,
    ADD_QUIZ_REQUEST,
    ADD_QUIZ_SUCCESS,
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

export const addUserRequest=()=>({
    type: ADD_USER_REQUEST
})

export const addUserSuccess = (user)=>({
    type: ADD_USER_SUCCESS,
    payload: user
})
export const addUserFailure = (error)=>({
    type: ADD_USER_FAILURE,
    payload: error
})

export const addUser = (user)=>{
    return(dispatch)=>{
        dispatch(addUserRequest());
        axios.post('/api/auth/register', user)
        .then((response)=>{
            const user = response.data;
            if (user.error){
                dispatch(addUserFailure(user.error))
            }
            else
            {
                localStorage.setItem('token', user.token);
                dispatch(addUserSuccess(user));
                dispatch(getUser());
            }
        })
        .catch((error)=>{
            dispatch(addUserFailure(error.message))
        })
    }
}

export const loginUserRequest = ()=>({
    type: LOGIN_USER_REQUEST
})
export const loginUserSuccess = (user)=>({
    type: LOGIN_USER_SUCCESS,
    payload: user
})
export const loginUserFailure = (error)=>({
    type: LOGIN_USER_FAILURE,
    payload: error
})

export const loginUser = (user)=>{
    return(dispatch)=>{
        dispatch(loginUserRequest());
        axios.post('/api/auth/login', user)
        .then((response)=>{
            const user = response.data;
            if (user.error){
                dispatch(loginUserFailure(user.error))
            }
            else
            {
                localStorage.setItem('token', user.token);
                dispatch(loginUserSuccess(user));
                dispatch(getUser());
            }
        })
        .catch((error)=>{
            dispatch(loginUserFailure(error.message))
        })
    }
}
export const getUserRequest = ()=>({
    type: GET_USER_REQUEST
})
export const getUserSuccess = (user)=>({
    type: GET_USER_SUCCESS,
    payload: user
})
export const getUserFailure = (error)=>({
    type: GET_USER_FAILURE,
    payload: error
})

export const getUser = ()=>{
    return(dispatch)=>{
        dispatch(getUserRequest());
        if (localStorage.getItem('token')) {
            axios.get('/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    const user = response.data;
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(getUserSuccess(user));
                })
                .catch((error) => {
                    console.log('dddd')
                    dispatch(getUserFailure(error.message))
                })
        }
    }
}


const fetchQuizCategoriesRequest =()=>({
    type: FETCH_QUIZ_CATEGORIES_REQUEST
})

const fetchQuizCategoriesSuccess=(categories)=>({
    type: FETCH_QUIZ_CATEGORIES_SUCCESS,
    payload: categories
})

const fetchQuizCategoriesFailure=(error)=>({
    type: FETCH_QUIZ_CATEGORIES_FAILURE,
    payload: error
})

export const fetchCategories=()=>{
    return(dispatch)=>{
        dispatch(fetchQuizCategoriesRequest());
        axios.get('/api/Category/categories', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const categories = response.data;
            dispatch(fetchQuizCategoriesSuccess(categories))
        })
        .catch((error)=>{
            dispatch(fetchQuizCategoriesFailure(error.message))
        })
    }
}


const fetchTypesRequest =()=>({
    type: FETCH_TYPES_REQUEST
})

const fetchTypesSuccess=(types)=>({
    type: FETCH_TYPES_SUCCESS,
    payload: types
})

const fetchTypesFailure=(error)=>({
    type: FETCH_TYPES_FAILURE,
    payload: error
})

export const fetchTypes=()=>{
    return(dispatch)=>{
        dispatch(fetchTypesRequest());
        axios.get('/api/Type/types', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const types = response.data;
            dispatch(fetchTypesSuccess(types))
        })
        .catch((error)=>{
            dispatch(fetchTypesFailure(error.message))
        })
    }

}

const fetchDifficultyRequest =()=>({
    type: FETCH_DIFFICULTY_REQUEST
})

const fetchDifficultySuccess=(difficulty)=>({
    type: FETCH_DIFFICULTY_SUCCESS,
    payload: difficulty
})

const fetchDifficultyFailure=(error)=>({
    type: FETCH_DIFFICULTY_FAILURE,
    payload: error
})

export const fetchDifficulty=()=>{
    return(dispatch)=>{
        dispatch(fetchDifficultyRequest());
        axios.get('/api/Difficulty/difficulties', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const difficulty = response.data;
            dispatch(fetchDifficultySuccess(difficulty))
        })
        .catch((error)=>{
            dispatch(fetchDifficultyFailure(error.message))
        })
    }
}

const fetchQuestionsRequest =()=>({
    type: FETCH_QUESTIONS_REQUEST
})

const fetchQuestionsSuccess=(questions)=>({
    type: FETCH_QUESTIONS_SUCCESS,
    payload: questions
})

const fetchQuestionsFailure=(error)=>({
    type: FETCH_QUESTIONS_FAILURE,
    payload: error
})


export const fetchQuestions = (countOfQuestions, category, difficulty, type)=>{
    return(dispatch)=>{
        dispatch(fetchQuestionsRequest());
        axios.get(`/api/Question/questions/${countOfQuestions}/${category}/${difficulty}/${type}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const questions = response.data;
            dispatch(fetchQuestionsSuccess(questions))
        })
        .catch((error)=>{
            dispatch(fetchQuestionsFailure(error.message))
        })
    }
}

export const setQuizQuestions = (questions)=>({
    type: SET_QUIZ_QUESTIONS,
    payload: questions
})

export const setQuizCategory = (category)=>({
    type: SET_QUIZ_CATEGORY,
    payload: category
})

export const setQuizType = (type)=>({
    type: SET_QUIZ_TYPE,
    payload: type
})

export const setQuizDifficulty = (difficulty)=>({
    type: SET_QUIZ_DIFFICULTY,
    payload: difficulty
})

export const setQuizSelectedAnswers = (answers)=>({
    type: SET_QUIZ_SELECTED_ANSWERS,
    payload: answers
})

export const clearQuiz = ()=>({
    type: CLEAR_QUIZ
})

export const addQuizRequest = ()=>({
    type: ADD_QUIZ_REQUEST
})

export const addQuizSuccess = (quiz)=>({
    type: ADD_QUIZ_SUCCESS,
    payload: quiz
})

export const addQuizFailure = (error)=>({
    type: ADD_QUIZ_FAILURE,
    payload: error
})

export const addQuiz = (questions, category, type, difficulty, selectedAnswers) => {
    const obj = {
        questions,
        category,
        difficulty,
        type,
        selectedOptions: selectedAnswers
    };

    return (dispatch) => {
        dispatch(addQuizRequest());
        axios.post('/api/Quiz/add', obj, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const quiz = response.data;
                dispatch(addQuizSuccess(quiz));
            })
            .catch((error) => {
                dispatch(addQuizFailure(error.message));
            });
    };
};

export const fetchHistoryRequest = ()=>({
    type: FETCH_HISTORY_REQUEST
})

export const fetchHistorySuccess = (history)=>({
    type: FETCH_HISTORY_SUCCESS,
    payload: history
})

export const fetchHistoryFailure = (error)=>({
    type: FETCH_HISTORY_FAILURE,
    payload: error
})

export const fetchHistory = ()=>{
    return(dispatch)=>{
        dispatch(fetchHistoryRequest());
        axios.get('/api/Quiz/history', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const history = response.data;
            console.log(history);
            dispatch(fetchHistorySuccess(history))
        })
        .catch((error)=>{
            dispatch(fetchHistoryFailure(error.message))
        })
    }
}








