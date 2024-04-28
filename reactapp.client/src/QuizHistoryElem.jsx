import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const QuizHistoryElem = () => {
    const { id } = useParams();
    const { data } = useSelector((state) => state.history);
    const quiz = data[id];

    const renderOption = (option, isCorrect, isSelected) => {
        let optionStyle = {
            color: isCorrect ? 'green' : 'red'
        };
        if (isSelected) {
            optionStyle.backgroundColor = isCorrect ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
        }
        return (
            <p key={option.id} style={optionStyle}>
                {option.text}
            </p>
        );
    };

    return (
        <div className="mainStyle mainSize">
            <div className="w-100 d-flex justify-content-between flex-wrap">
                <p className="me-3">Category: <strong>{quiz.category === null ? "Any" : quiz.category}</strong></p>
                <p className="me-3">Difficulty: <strong>{quiz.difficulty === null ? "Any" : quiz.difficulty}</strong></p>
                <p className="me-3">Type: <strong>{quiz.type === null ? "Any" : quiz.type}</strong></p>
                <p className="me-3">Date: <strong>{new Date(quiz.createdAt).toLocaleString()}</strong></p>
                <p className="me-3">Score: <strong>{quiz.score}</strong></p>
            </div>
            <div>
            {quiz.questions.map((question, index) => (
                    <div key={index} className="border border-primary rounded-4 p-3 m-3">
                        <h5>{question.text}</h5>
                        {question.options.map((option) => {
                            const isSelected = quiz.selectedOptions.some((selectedOption) => selectedOption.id === option.id);
                            const isCorrect = option.isCorrect;
                            return renderOption(option, isCorrect, isSelected);
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizHistoryElem;
