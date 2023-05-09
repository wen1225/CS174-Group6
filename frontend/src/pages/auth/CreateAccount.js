import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

export function CreateAccount() {
    // Set up state variables for first name, last name, email, password, and confirmation
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Set up state variables for error messages related to each input field
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    // Define functions to handle changes to the input fields
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        setFirstNameError(false);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
        setLastNameError(false);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(false);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordError(false);
    };

    // Define function to handle form submission
    const handleCreateAccount = (event) => {
        event.preventDefault();
        // Check if any of the input fields are empty and set error messages if so
        if (!firstName) {
            setFirstNameError(true);
        }
        if (!lastName) {
            setLastNameError(true);
        }
        if (!email) {
            setEmailError(true);
        }
        if (!password) {
            setPasswordError(true);
        }
        if (!confirmPassword) {
            setConfirmPasswordError(true);
        }
        // Check if password and confirmation match and set error messages if not
        if (password !== confirmPassword) {
            setPasswordError(true);
            setConfirmPasswordError(true);
        }
        // If all input fields are valid, handle create account logic
        if (
            firstName &&
            lastName &&
            email &&
            password &&
            confirmPassword &&
            password === confirmPassword
        ) {
            // handle create account logic here
            console.log('Account created successfully!');
        }
    };

    // Return the JSX to render the Create Account form
    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
            <form onSubmit={handleCreateAccount}>
                <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '22px' }}>Create Account</Typography>
                <TextField
                    label="First Name"
                    fullWidth
                    required
                    value={firstName}
                    onChange={handleFirstNameChange}
                    error={firstNameError}
                    helperText={firstNameError && 'Please enter your first name'}
                    margin="normal"
                />
                {/* Add similar code for the last name text field, email text field, password text field, and confirmation text field */}
                <TextField
                    label="Last Name"
                    fullWidth
                    required
                    value={lastName}
                    onChange={handleLastNameChange}
                    error={lastNameError}
                    helperText={lastNameError && 'Please enter your last name'}
                    margin="normal"
                />
                <TextField
                    label="Email"
                    fullWidth
                    type="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    helperText={emailError && 'Please enter a valid email address'}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    fullWidth
                    type="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError}
                    helperText={
                        passwordError
                            ? 'Please enter a password between 8 and 20 characters'
                            : 'Your password must be between 8 and 20 characters'
                    }
                    margin="normal"
                />
                <TextField
                    label="Confirm Password"
                    fullWidth
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={confirmPasswordError}
                    helperText={confirmPasswordError && 'Please confirm your password'}
                    margin="normal"
                />
                <Button variant="contained" type="submit" fullWidth sx={{ mt: 2, mb: 1, marginTop: '30px' }}>Create Account</Button>
            </form>
        </Container>
    );
}
