
import PropTypes from 'prop-types';

const Question = (props) => {
    const radioHandle = (event) => {
        props.onSelect(event.target.value);
    }
    console.log(props.question);
    return (
        <div className='quizStyle'>
            <h2 className="text-primary text-center">{props.index} / {props.length}</h2>
            <br/>
            <h3>{props.question.text}</h3>
            <hr/>
            <div className='mt-5 mb-5'>
                {props.question.options.map((option, index) => (
                    <div key={index} className='mt-2 mb-2'>
                        <input type="radio" id={index} name="option" value={option.id} onChange={radioHandle}/>
                        <label className="ms-2" htmlFor={index}>{option.text}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}
Question.propTypes = {
    index: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    question: PropTypes.shape({
        text: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            isCorrect: PropTypes.bool.isRequired
        })).isRequired
    }).isRequired,
    onSelect: PropTypes.func.isRequired
};
export default Question;