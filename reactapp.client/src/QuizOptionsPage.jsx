
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCategories, fetchDifficulty, fetchQuestions, fetchTypes} from "./redux/actions";
import {setQuizCategory, setQuizType, setQuizDifficulty} from "./redux/actions";
import { useNavigate } from "react-router-dom";

const QuizOptionsPage = () => {
    const dispatch = useDispatch();
    const {loading: categoriesLoading, data: categories, error} = useSelector((state) => state.categories);
    const {loading: typesLoading, data: types, error: typesError} = useSelector((state) => state.types);
    const {loading: difficultyLoading, data: difficulties, error: difficultyError} = useSelector((state) => state.difficulty);

    const navigate = useNavigate();
    const[countOfQuestions, setCountOfQuestions] = useState(10);
    const[category, setCategory] = useState("0");
    const[difficulty, setDifficulty] = useState("0");
    const[type, setType] = useState("0");

    const buttonClickHandler = (event) => {
        event.preventDefault();
        dispatch(fetchQuestions(countOfQuestions, category, difficulty, type));
        dispatch(setQuizCategory(category));
        dispatch(setQuizType(type));
        dispatch(setQuizDifficulty(difficulty));
        navigate("/quiz");
    };

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTypes());
        dispatch(fetchDifficulty());
    }, []);

    const numberInputChangeHandler=(event)=>{
        if(event.target.value < 1){
            event.target.value = 1;
        }
        if(event.target.value > 50){
            event.target.value = 50;
        }
        setCountOfQuestions(event.target.value);
    }

    const selectChangeHandler=(event, setState)=>{
        setState(event.target.value);
    }

    if (categoriesLoading || typesLoading || difficultyLoading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h5>Error: {error}</h5>;
    }
    if (typesError) {
        return <h5>Error: {typesError}</h5>;
    }
    if (difficultyError) {
        return <h5>Error: {difficultyError}</h5>;
    }

    return (
        <div className="mainSize mainStyle">
            <h2 className="mb-4">Quiz options</h2>
            <form className="w-100">
                <div className="mb-3 d-flex justify-content-between">
                    <label className="form-label m-1 w-100">
                        Questions:
                        <input type="number" className="form-control" defaultValue={10}
                               onChange={numberInputChangeHandler}/>
                    </label>
                    <label className="form-label m-1 w-100">
                        Difficulty:
                        <select className="form-select" onChange={(e) => selectChangeHandler(e, setDifficulty)}>
                            <option value="0">Any</option>
                            {difficulties.map((elem) => (
                                <option key={elem.id} value={elem.id}>
                                {elem.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="form-label m-1 w-100">
                        Type:
                        <select className="form-select" onChange={(e) => selectChangeHandler(e, setType)}>
                            <option value="0">Any</option>
                            {types.map((elem) => (
                                <option key={elem.id} value={elem.id}>
                                {elem.title}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label w-100">
                        Category:
                        <select className="form-select" onChange={(e) => selectChangeHandler(e, setCategory)}>
                            <option value="0">Any</option>
                            {categories.map((elem) => (
                                <option key={elem.id} value={elem.id}>
                                {elem.title}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <button className="btn btn-primary w-100" onClick={buttonClickHandler}>
                    Start
                </button>
            </form>
        </div>
    );
};

export default QuizOptionsPage;
