import {useLoaderData} from "react-router-dom";
import classes from './UserProfile.module.css'
import {Avatar} from "@mui/material";
import {useState} from "react";
import EditComponent from "../components/EditComponent";
import {getToken} from "../util/auth-util";

const role = ['User', 'Admin'];

export default function UserProfilePage() {
    const user = useLoaderData();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <section className={classes.section}>
            <section className={classes.left}>
                <Avatar
                    sx={{width: 56, height: 56, fontSize: 30, bgcolor: '#979fb0'}}
                    className={classes.avatar}
                >
                    {user.username.at(0)}
                </Avatar>
                <p className={classes.text}>Role: {role[user.role]}</p>
            </section>
            {!isEditing &&
                <section className={classes.right}>
                    <h1 className={classes.title}>{user.username}'s page</h1>
                    <p className={classes.info}>Email: {user.email}</p>
                    <p className={classes.info}>Other things...</p>
                    <button className={classes.button} onClick={() => setIsEditing(true)}>Edit Profile</button>
                </section>}
            {isEditing &&
                <section className={classes.right}>
                    <EditComponent user={user} closeAction={() => setIsEditing(false)} onSubmit={() => setIsEditing(false)}/>
                </section>
            }
        </section>
    )
}

export async function profileLoader({token}) {
    token = getToken();
    console.log(token)
    if(!token)
        return;
    const res = await fetch('http://localhost:3000/auth/profile', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            },
        }
    )
    if(res.ok)
        return res;
    else
        throw new Error('could not load the profile');
}