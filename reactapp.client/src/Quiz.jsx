import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Question from './Question';
import {setQuizQuestions, setQuizSelectedAnswers, addQuiz, clearQuiz} from "./redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {questions, category, type , difficulty, selectedAnswers} = useSelector((state) => state.currentQuiz);
    const { loading, data, error } = useSelector((state) => state.questions);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState("0");


    useEffect(() => {
        if (!loading && !error) {
            dispatch(setQuizQuestions(data));
        }
    }, [data, loading, error, dispatch]);

    useEffect(() => {
        if(selectedAnswers.length > 0){
            dispatch(addQuiz(questions, category, type, difficulty, selectedAnswers));
            dispatch(clearQuiz());
            navigate("/quizOptions");
        }
    }, [selectedAnswers]);

    const handleSelectAnswer = (value) => {
        setCurrentAnswer(value);
    }

    const handleAnswerButtonClick = () => {
        setUserAnswers(prevAnswers => [...prevAnswers, currentAnswer]);

        setCurrentAnswer("0");

        if (currentQuestionIndex < data.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            dispatch(setQuizSelectedAnswers([...userAnswers, currentAnswer]));

        }
    };


    if (loading) {
        return <h3>Loading...</h3>;
    }
    if (error) {
        return <h5>Error: {error}</h5>;
    }

    const currentQuestion = data[currentQuestionIndex];
    return (
        <div className="mainSize mainStyle">
            <Question key={currentQuestionIndex}
                      index={currentQuestionIndex + 1}
                      length={data.length}
                      question={currentQuestion}
                      onSelect={handleSelectAnswer}/>

            <button className='btn btn-primary w-100' onClick={handleAnswerButtonClick}>Next</button>
        </div>
    );
}

export default Quiz;
