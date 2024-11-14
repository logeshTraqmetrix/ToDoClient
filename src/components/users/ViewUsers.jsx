import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import AddUser from './AddUser';

const url = import.meta.env.VITE_API_URL;

const ACTIONS = {
    SETUSERS: 'setUser',
    DELETEUSERS: 'deleteUser',
    ADDUSER: 'addUser',
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SETUSERS:
            return { ...state, userData: action.payload };

        case ACTIONS.DELETEUSERS:
            return { ...state, userData: state.userData.filter((user) => user.id !== action.payload.id) };

        case ACTIONS.ADDUSER:
            return { ...state, userData: [...state.userData, ...action.payload.newData] };

        default:
            return state;
    }
};

const ViewUsers = () => {
    const [state, dispatchEvent] = useReducer(reducer, { userData: [] });

    useEffect(() => {
        axios
            .get(`${url}/users`)
            .then((res) => {
                console.log('res from user', res.data);
                dispatchEvent({ type: ACTIONS.SETUSERS, payload: res.data });
            })
            .catch((err) => {
                console.log('error in getting users', err);
            });
    }, []);

    const deleteUser = (id) => {
        console.log('user id', id);
        axios
            .delete(`${url}/users/${id}`)
            .then((res) => {
                console.log('res from deleting user', res);
                dispatchEvent({ type: ACTIONS.DELETEUSERS, payload: { id } });
            })
            .catch((err) => {
                console.log('error in deleting user', err);
            });
    };

    return (
        <Box sx={{ padding: 2 }}>
            <AddUser dispatchEvent={dispatchEvent} ACTIONS={ACTIONS} />
            <Grid container spacing={2}>
                {state.userData.map((user) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={user.id}>
                            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {user.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.id} <br />
                                        {user.email}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        EDIT
                                    </Button>
                                    <Button size="small" color="error" onClick={() => deleteUser(user.id)}>
                                        DELETE
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ViewUsers;
