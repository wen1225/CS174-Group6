import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import {CreateAccount} from './CreateAccount';

export function Login() {
    // Declaring state variables using the 'useState' hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);

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
    const handleLogin = (event) => {
        event.preventDefault();
        if (!username) {
            setUsernameError(true);
        }
        if (!password) {
            setPasswordError(true);
        }
        if (username && password) {
            // Handle login logic here
        }
    };

    // Event handler to show the 'CreateAccount' component
    const handleCreateAccount = () => {
        setShowCreateAccount(true);
    };

    // Rendering the Login component
    return (
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
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleCreateAccount}
                    >
                        Create Account
                    </Button>
                </form>
            ) : (
                // Showing the 'CreateAccount' component
                <CreateAccount />
            )}
        </Container>
    );
}
