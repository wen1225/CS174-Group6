import * as React from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider} from '@mui/material/styles'

const theme = createTheme()

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2,
                        boxShadow: 2
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Typography
                            textAlign="left"
                            fontWeight="bold"
                        >
                            Username
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Enter Username"
                            name="username"
                        />
                        <Typography
                            textAlign="left"
                            fontWeight="bold"
                        >
                            Password
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Enter Password"
                            name="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 , boxShadow: "none", textTransform: "none"}}
                        >
                            Sign Up
                        </Button>
                        <Link href="/login" variant="body2">
                            Existing user? Sign In
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}