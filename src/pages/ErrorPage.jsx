import classes from './ErrorPage.module.css'
import {useRouteError} from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();
    const message = error.message;


    return (
        <div className={classes.window}>
            <section className={classes.main}>
                <h1 className={classes.title}>An error occured!</h1>
                <p className={classes.message}>{message ? message : 'Please try again later' }</p>
                <a href='/' className={classes.backElem}>Go back</a>
            </section>
        </div>
    )
}