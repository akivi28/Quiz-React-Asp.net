import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from "../redux/actions";


const LoginForm = () => {
    const dispatch = useDispatch();
    const {currentUser, error} = useSelector((state) => state.users);

    const buttonClickHandler = (event) => {
        event.preventDefault();
        const user = {
            login: document.getElementById('login').value,
            password: document.getElementById('password').value
        }
        dispatch(loginUser(user));
    }
    useEffect(() => {
        try {
            if (currentUser.success) {
                localStorage.setItem('user', JSON.stringify(currentUser));
                window.location.reload();
                window.location.href = '/quizOptions';
            }
        } catch (error) {
            console.log(error);
        }
    }
    , [currentUser,error]);

    return (
        <form className="formsSize bg-light container mt-4 p-5 w-25 rounded-4">
            <h1>Log in</h1>
            {error && <p className="text-danger">{error.message}</p>}
            <div className="mb-3">
            <label htmlFor="login" className="form-label">
                    Login:
                </label>
                <input type="text" className={`form-control`} id="login" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input type="password" className={`form-control`} id="password"/>
            </div>
            <button type="button" className="btn btn-primary" onClick={buttonClickHandler}>
                Login
            </button>
        </form>
    );
};

export default LoginForm;
