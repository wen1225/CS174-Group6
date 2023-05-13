import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { CreateAccount } from './CreateAccount';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export function Login() {
    // Declaring state variables using the 'useState' hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const navigate = useNavigate();

    // Event handlers to update state variables when the input fields change
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setUsernameError(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(false);
    };

    // Event handler to handle form submission
    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username) {
            setUsernameError(true);
        }
        if (!password) {
            setPasswordError(true);
        }
        if (username && password) {

            const HTTP_REQ_DATA = {
                "username": username,
                "password": password
            }

            try {
                const HTTP_RES = (await axios.post(`${process.env["REACT_APP_SERVER_URL"]}/auth/login`, HTTP_REQ_DATA));
                navigate("/")
            } catch (err) {
                if (err instanceof AxiosError) {
                    if (err.response.status === 401) {
                        alert("Wrong Login Credential")
                    } else {
                        throw Error("Unknown login problem")
                    }
                }
            }

        }
    };

    // Event handler to show the 'CreateAccount' component
    const handleCreateAccount = () => {
        setShowCreateAccount(true);
    };

    // Rendering the Login component
    return (
        <div className="page">
            <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
                {!showCreateAccount ? (
                    // Login form with input fields and buttons
                    <form onSubmit={handleLogin}>
                        <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '22px' }}>CRM</Typography>
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={handleUsernameChange}
                            error={usernameError}
                            helperText={usernameError ? 'Please enter a username' : ''}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                            helperText={passwordError ? 'Please enter a password' : ''}
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{ mt: 2, backgroundColor: "#42bfdd" }}
                        >
                            Login
                        </Button>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2, backgroundColor: "#084b83" }}
                            onClick={()=>navigate("/auth/register")}
                        >
                            Create Account
                        </Button>
                    </form>
                ) : (
                    // Showing the 'CreateAccount' component
                    <CreateAccount />
                )}
            </Container>
        </div>

    );
}
