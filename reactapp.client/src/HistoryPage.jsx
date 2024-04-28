import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchHistory } from "@/redux/actions.js";
import { useDispatch } from "react-redux";

const HistoryPage = () => {
    const dispatch = useDispatch();

    const { loading, data, error } = useSelector((state) => state.history);

    useEffect(() => {
        dispatch(fetchHistory());
    }, []);


    if (loading) {
        return <h3>Loading...</h3>;
    }
    if (error) {
        return <h5>Error: {error}</h5>;
    }
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <div className="mainSize mainStyle">
            {
                data.map((quiz, index) => {
                    return (
                        <div key={index} className="border border-primary rounded-4 p-3 m-3 d-flex w-100">
                            <div className="w-50">
                                <p>Category: <strong>{quiz.category === null ? "Any" : quiz.category}</strong></p>
                                <p>Difficulty: <strong>{quiz.difficulty === null ? "Any" : quiz.difficulty}</strong></p>
                                <p>Type: <strong>{quiz.type === null ? "Any" : quiz.type}</strong></p>
                                <Link to={`/history/${index}`} className="btn btn-primary">Show More</Link>
                            </div>
                            <div className="w-50">
                                <p>Date: <strong>{new Date(quiz.createdAt).toLocaleString()}</strong></p>
                                <p>Count of questions: <strong>{quiz.questions.length}</strong></p>
                                <p>Score: <strong>{quiz.score}</strong></p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default HistoryPage;
