import * as React from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider} from '@mui/material/styles'
import { useState } from 'react'

const theme = createTheme()

export function CreateMemberForm() {
    const[gender, setGender] = useState("")

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          birthday: formData.get("birthday"),
          gender: gender,
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" sx={{maxWidth: "1000px"}}>
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                }}
                >
                    <Typography component="h1" variant="h5">
                        Create Member
                    </Typography>
                    <Paper sx={{padding: 3}}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                textAlign="left"
                                fontWeight="bold"
                            >
                                First Name
                            </Typography>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                textAlign="left"
                                fontWeight="bold"
                            >
                                Last Name
                            </Typography>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                textAlign="left"
                                fontWeight="bold"
                            >
                                Birthday
                            </Typography>
                            <TextField
                            required
                            fullWidth
                            id="birthday"
                            name="birthday"
                            type="datetime-local"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                            <FormLabel id="gender-label" sx={{
                                textAlign: "left", 
                                fontWeight: "bold"}}
                            >
                                Gender
                            </FormLabel>
                            <RadioGroup
                                row
                                name="gender-radio-group"
                                value={gender}
                                onChange={handleGenderChange}
                            >
                                <FormControlLabel value="Male" control={<Radio required={true}/>} label="Male" />
                                <FormControlLabel value="Female" control={<Radio required={true}/>} label="Female" />
                                <FormControlLabel value="Other" control={<Radio required={true}/>} label="Other" />
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        </Grid>
                        <Box
                            component="div"
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 , textTransform: 'none', float: 'right'}}
                            >
                                Create
                            </Button>
                        </Box>
                        
                    </Box>
                    </Paper>
                </Box>
                
      </Container>
    </ThemeProvider>
    )
}