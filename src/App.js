import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootPage from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import UsersPage from "./pages/Users";
import AuthForm from "./components/AuthForm";
import UserProfilePage, {profileLoader} from "./pages/UserProfile";
import React, {useContext} from "react";
import AuthContextProvider, {AuthContext} from "./store/auth-context";


function App() {
    const ctx = useContext(AuthContext);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootPage/>,
            id: 'root',
            errorElement: <ErrorPage/>,
            children: [
                {
                    index: true,
                    element: <UsersPage/>,
                },
                {
                    path: '/signup',
                    element: <AuthForm mode='signup'/>
                },
                {
                    path: '/signin',
                    element: <AuthForm mode='signin'/>
                },
                {
                    path: '/profile',
                    element: <UserProfilePage/>,
                    id: 'profile',
                    loader: () => profileLoader(ctx)
                }
            ]
        },
    ])

    return (
        <AuthContextProvider>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    )
}

export default App;
