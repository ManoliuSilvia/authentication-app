import {TextField} from "@mui/material";
import {Form, useNavigate} from "react-router-dom";
import classes from './AuthForm.module.css'
import {useContext, useState} from "react";
import {AuthContext} from "../store/auth-context";
import {getToken} from "../util/auth-util";

export default function EditComponent({user, closeAction, onSubmit}){
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const navigate = useNavigate();

    const ctx = useContext(AuthContext);

    function handleChange(event){
        if(event.target.name === 'username') {
            setUsername(event.target.value);
        }
        else if (event.target.name === 'email') {
            setEmail(event.target.value);
        }
    }

    async function handleConfirm(event){
        event.preventDefault();
        ctx.setToken(getToken());
        const res = await fetch(`http://localhost:3000/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + ctx.token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email, username})
        });
        if(!res.ok)
            throw new Error('could not edit profile')
        onSubmit();
        navigate('/profile', { replace: true });
    }

    return (
        <>
            <Form className={classes.form}>
                <div className={classes.fields}>
                    <label htmlFor="email" className={classes.label}>Email</label>
                    <TextField
                        className={classes.label}
                        id="standard-required"
                        variant="standard"
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.fields}>
                    <label htmlFor="username" className={classes.label}>Username</label>
                    <TextField
                        id="standard-required"
                        variant="standard"
                        type='text'
                        name='username'
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button className={classes.closeButton} type='button' onClick={closeAction}>Cancel</button>
                    <button className={classes.submitButton} type='submit' onClick={handleConfirm}>Submit</button>
                </div>
            </Form>
        </>
    )
}