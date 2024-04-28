import { createBrowserRouter } from "react-router-dom";
import FirstForm from "../authorization/FirstForm"
import RegisterForm from "../authorization/RegisterForm"
import LoginForm from "../authorization/LoginForm"
import RootLayout from "./RootLayout"

import HistoryPage from "../HistoryPage";
import SettingsPage from "../SettingsPage";
import QuizOptionsPage from "../QuizOptionsPage";
import Quiz from "../Quiz";
import QuizHistoryElem from "@/QuizHistoryElem.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '/', element: <FirstForm /> },
            { path: '/registration', element: <RegisterForm /> },
            { path: '/login', element: <LoginForm /> },

            { path: '/quizOptions', element: <QuizOptionsPage/>},
            {path: '/history', element: <HistoryPage/>},
            {path: '/history/:id', element: <QuizHistoryElem/>},
            {path: '/settings', element: <SettingsPage/>},

            {path: '/quiz', element: <Quiz/>}
        ]
    }
])

export default router;