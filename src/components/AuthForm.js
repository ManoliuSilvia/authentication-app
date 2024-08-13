import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import classes from './AuthForm.module.css'
import {useContext} from "react";
import {AuthContext} from "../store/auth-context";

const sizeFont = 15;

export default function AuthForm({mode}) {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    async function signupAction(event){
        let url = 'http://localhost:3000/auth/signup';
        event.preventDefault()
        const fd = new FormData(event.target.form);
        const data = Object.fromEntries(fd.entries());
        console.log(data)
        const response = await fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if(!response.ok)
            throw new Error('could not sign up');
        const resData = await response.json();
        ctx.handleSaveToken(resData.access_token);
        navigate('/')
    }

    async function signinAction(event){
        let url = 'http://localhost:3000/auth/signin';
        event.preventDefault();
        const fd = new FormData(event.target.form);
        const {email, password} = Object.fromEntries(fd.entries());
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password}),
        })
        if(!response.ok)
            throw new Error('could not sign in');
        const resData = await response.json()
        ctx.handleSaveToken(resData.access_token);
        navigate('/');
    }

    return (
        <form className={classes.form}>
            <div className={classes.fields}>
                <label htmlFor="email" className={classes.label}>Email</label>
                <TextField
                    required
                    inputProps={{style: {fontSize: sizeFont}}}
                    className={classes.label}
                    id="standard-required"
                    label="Required"
                    variant="standard"
                    type='email'
                    name='email'
                />
            </div>
            {mode === 'signup' && <div className={classes.fields}>
                <label htmlFor="username" className={classes.label}>Username</label>
                <TextField
                    required
                    inputProps={{style: {fontSize: sizeFont}}}
                    id="standard-required"
                    label="Required"
                    variant="standard"
                    type='text'
                    name='username'
                />
            </div>}
            <div className={classes.fields}>
                <label htmlFor="password" className={classes.label}>Password</label>
                <TextField
                    required
                    inputProps={{style: {fontSize: sizeFont}}}
                    id="standard-required"
                    label="Required"
                    variant="standard"
                    type='password'
                    name='password'
                />
            </div>

            <div className={classes.actions}>
                <Button type='button' onClick={() => navigate('/')}>Close</Button>
                {mode ==='signup' && <Button type='submit' onClick={(event) => signupAction(event)}>Signup</Button>}
                {mode === 'signin' && <Button type='submit' onClick={(event) => signinAction(event)}>Signin</Button>}
            </div>

        </form>
    )
}

