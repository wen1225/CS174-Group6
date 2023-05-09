import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { makeStyles } from '@material-ui/styles';
import Image from '../background.jpeg';
import { useState, useEffect } from 'react';
import axios from 'axios'


export function Homepage() {

    const [caseCount, setCaseCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);

    const fetchCases = async() =>{
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/case`)).data;
        console.log(Object.keys(HTTP_RES).length)
        setCaseCount(Object.keys(HTTP_RES).length);

    }

    const fetchMembers = async() => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/membership`)).data;
        console.log(Object.keys(HTTP_RES).length)
        setMemberCount(Object.keys(HTTP_RES).length);
    }

    useEffect(()=>{
        fetchCases()
        fetchMembers()
    }, [])

    return (
        <Box>
            <Box
                sx={{
                    position: 'relative',
                    backgroundImage: `url(${Image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 'calc(100vh - 64px)',
                    marginBottom: '-64px',
                }}
            >
                <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50%',
                    }}
                >
                    <div style={{height:" 50%"}}>
                    <Typography variant="h2" component="h2" align="left" gutterBottom sx={{color: 'white'}}>
                        Customer Relationship Management
                    </Typography>
                    </div>

                    </Container>
                    <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50%',
                    }}
                >
                    <Grid>
                    <Box> 
                    <Typography variant="h3" component="h3" textAlign="center" gutterBottom sx={{color: 'white'}}>
                    Number of Cases: {caseCount}
                    </Typography>
                    </Box>
                    <Box>
                    <Typography variant="h3" component="h3" textAlign="center" gutterBottom sx={{color: 'white'}}>
                    Number of Members: {memberCount}
                    </Typography>
                    </Box>
                    </Grid>

                    </Container>
            </Box>
            <Container sx={{ marginTop: '64px' }}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Help Solve Customer Concerns
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            We provide a platform for customers to publish the problems they're facing and our agents will pick up the case and resolve it.
                        </Typography>
                        <Button variant="contained" color="secondary">
                            Get Started Here
                        </Button>

                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Reliable 1-day* Turnover
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            Our agents are technical specialists. Once they pick up a case, you can expect the issue to be resolved in a matter of days - as early as one day.
                        </Typography>
                        <Button variant="contained" color="secondary">
                            Learn More
                        </Button>

                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>

                        <Typography variant="h5" component="h2" gutterBottom>
                            Automate Your Marketing
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            Create and automate marketing campaigns that engage your customers and drive sales. Send targeted
                            emails, schedule social media posts, and more.
                        </Typography>
                        <Button variant="contained" color="secondary">
                            Learn More
                        </Button>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}