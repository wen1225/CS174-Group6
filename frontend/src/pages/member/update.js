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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import "./styles/member.scss"


const theme = createTheme()

export function UpdateMemberForm() {
    const [gender, setGender] = useState("")
    const { id } = useParams();
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [birthday, setBirthday] = useState()
    const [email, setEmail] = useState()
    const [remark, setRemark] = useState()
    const [phone, setPhone] = useState()
    const navigate = useNavigate();

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const HTTP_REQ_DATA = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            birthday: formData.get("birthday"),
            gender: gender,
            remarks: formData.get("remark"),
            email: formData.get("email"),
            phone: formData.get("phone").toString()

        }

        console.log(HTTP_REQ_DATA)

        axios.put(`${process.env["REACT_APP_SERVER_URL"]}/membership/${id}`, HTTP_REQ_DATA)

        navigate("/member")

    }

    const handleDelete = async (event) => {
        event.preventDefault();
        await axios.delete(`${process.env["REACT_APP_SERVER_URL"]}/membership/${id}`);
        navigate("/member")
    }

    const fetchMemberInfo = async () => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/membership/${id}`)).data;

        setGender(HTTP_RES["gender"])
        setFirstName(HTTP_RES["firstName"])
        setLastName(HTTP_RES["lastName"])
        setBirthday(HTTP_RES["birthday"])
        setEmail(HTTP_RES["email"])
        setPhone(HTTP_RES["phone"])
        setRemark(HTTP_RES["remark"])

    }

    useEffect(() => {
        fetchMemberInfo();
    }, [])

    return (
        <div className='page' id="update-member">
            <ThemeProvider theme={theme}>
                <Container component="main" sx={{ maxWidth: "1000px" }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 5,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div className='page-heading'>
                            <h1 className="page-title">Edit Member</h1>

                        </div>
                        <Paper sx={{ padding: 3 }}>
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
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
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
                                            name="lastName"
                                            autoComplete="family-name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
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
                                            type="date"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <FormLabel id="gender-label" sx={{
                                                textAlign: "left",
                                                fontWeight: "bold"
                                            }}
                                            >
                                                Gender
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                name="gender-radio-group"
                                                value={gender}
                                                onChange={handleGenderChange}
                                            >
                                                <FormControlLabel value="Male" control={<Radio required={true} />} label="Male" />
                                                <FormControlLabel value="Female" control={<Radio required={true} />} label="Female" />
                                                <FormControlLabel value="Other" control={<Radio required={true} />} label="Other" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            textAlign="left"
                                            fontWeight="bold"
                                        >
                                            Email
                                        </Typography>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography
                                            textAlign="left"
                                            fontWeight="bold"
                                        >
                                            Phone
                                        </Typography>
                                        <TextField
                                            required
                                            fullWidth
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            textAlign="left"
                                            fontWeight="bold"
                                        >
                                            Remark
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            id="remark"
                                            name="remark"
                                            type="text"
                                            value={remark}
                                            onChange={(e) => setRemark(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Box
                                    component="div"
                                    sx={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, textTransform: 'none', backgroundColor: 'red' }}
                                        onClick={handleDelete}
                                    >
                                        Delete Member
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, textTransform: 'none' }}
                                    >
                                        Update
                                    </Button>
                                </Box>

                            </Box>
                        </Paper>
                    </Box>

                </Container>
            </ThemeProvider>
        </div>

    )
}