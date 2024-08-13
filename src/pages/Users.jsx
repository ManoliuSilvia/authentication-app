import {useContext, useEffect, useState} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Typography from "@mui/material/Typography";
import classes from "./Users.module.css"
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "../store/auth-context";
import {getToken, isAdmin} from "../util/auth-util";
import ConfirmationModal from "../components/ConfirmationModal";
import {Button} from "@mui/material";


export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [adminBool, setAdminBool] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(true);
    const [open, setOpen] = useState(false);

    const ctx = useContext(AuthContext);

    useEffect(() => {
        function getUsers(){
            fetch('http://localhost:3000/user',
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(res => {
                if(!res.ok)
                    throw new Error('could not load users');
                res.json().then(data => {
                    setUsers(data);
                })
            });
        }
        getUsers();
    }, [deleteTrigger])

    useEffect(() => {
        if (ctx.token) {
            setAdminBool(isAdmin(ctx.token));
        } else {
            setAdminBool(false);
        }
    }, [ctx.token]);

    async function handleDelete(id) {
        ctx.setToken(getToken());
        if(!ctx.token)
            throw new Error('token expired, please log in again');
        const decodedToken = jwtDecode(ctx.token);
        if(id === decodedToken.id)
            throw new Error('cannot delete your own user')
        const res = await fetch(`http://localhost:3000/user/${id}`,
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ ctx.token,
                }
            }
        )
        if(res.ok)
            setDeleteTrigger(prevState => !prevState);
        else
            throw new Error("failed to delete");
    }

    return (
        <div className={classes.mainContainer}>
            <ul className={classes.list}>
                {!users && <p>users loading</p>}
                {users &&
                    users.map(user => (
                        <ListItem className={classes.element} key={user.id}>
                            <ListItemText
                                primary={user.username}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{display: 'inline'}}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {user.email}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            {adminBool &&
                                <button
                                    className={classes.button}
                                    onClick={()=> {
                                        setOpen(true)
                                    }}
                                >X</button>}
                            <ConfirmationModal open={open} setOpen={setOpen}>
                                <Button onClick={() => {
                                    handleDelete(user.id);
                                    setOpen(false);
                                }}>Delete</Button>
                            </ConfirmationModal>
                        </ListItem>
                    ))
                }
            </ul>
        </div>
    )
};