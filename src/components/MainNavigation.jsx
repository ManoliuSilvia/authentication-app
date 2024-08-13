import classes from './MainNavigation.module.css'
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../store/auth-context";

export default function MainNavigation() {
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);

    return (
        <header className={classes.header}>
            <a href='/' className={classes.text}>Users</a>
            {!ctx.token &&
                <section className={classes.list}>
                <button className={classes.element} onClick={() => navigate('/signup')}>Sign up</button>
                <button className={classes.element} onClick={() => navigate(('/signin'))}>Sign in</button>
            </section>}
            {ctx.token &&
                <section className={classes.list}>
                <button className={classes.element} onClick={() => navigate('/profile')}>View Profile</button>
                <button
                    className={classes.element}
                    onClick={() => {
                        ctx.handleRemoveToken()
                        return navigate('/', {replace: true})
                    }}>Sign out</button>
            </section>}
        </header>
);
}
