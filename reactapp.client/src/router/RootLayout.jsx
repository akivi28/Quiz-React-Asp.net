import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import {getUser} from "@/redux/actions.js";
import { useDispatch } from "react-redux";

const RootLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        dispatch(getUser());
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if(!user){
            navigate('/');
        }
    }, [dispatch]);

    if (!currentUser || !currentUser.id) {
        return (
            <div className="d-flex w-100 align-items-center justify-content-center">
                <h1></h1>
                <Outlet />
            </div>
        );
    }

    return (
        <>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <h1 className="text-white ms-3">{currentUser.userName}</h1>
                <Navigation/>
                <h2 className="text-white me-3">{currentUser.email}</h2>
            </div>
            <Outlet/>
        </>

    );
};

export default RootLayout;
