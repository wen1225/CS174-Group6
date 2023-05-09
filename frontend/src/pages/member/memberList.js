import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Container from '@mui/material/Container'
import CssBaseline  from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { createTheme, ThemeProvider} from '@mui/material/styles'
import Typography  from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const theme = createTheme()

export function MemberList() {

    const [memberInfoList, setMemberInfoList] = useState([]);

    const renderFormButton = (params) => {
        return (
            <IconButton
                variant="contained"
                sx={{ textTransform: "none" }}
                component={Link} to={{
                    pathname: `/member/update/${params.id}`,
                }}
            >
                <EditIcon />
            </IconButton>
        )
    }

    const fetchMember = async() => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/membership`)).data;

        const tempList = [...memberInfoList];
        
        Object.keys(HTTP_RES).forEach((memberId)=>{
            const MEMBER_INfO = HTTP_RES[memberId];

            tempList.push({
                id: memberId,
                firstName: MEMBER_INfO["firstName"],
                lastName: MEMBER_INfO["lastName"],
                gender:  MEMBER_INfO["gender"]
            })

            setMemberInfoList(tempList);
        })
    }

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "firstName", headerName: "First Name", flex: 1 },
        { field: "lastName", headerName: "Last Name", flex: 1 },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "click", headerName: "Edit", flex: 1 , renderCell: renderFormButton}
    ]

    useEffect(()=>{
        fetchMember()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 5,
                    }}
                >
                    <Typography component="h1" variant="h5" marginBottom="20px">
                        Members
                    </Typography>
                    <Paper sx={{padding: 2}}>
                        <DataGrid
                            rows={memberInfoList}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            autoHeight
                        />
                    </Paper>
                </Box>
                <Button
                    component={Link} to='/member/create'
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , textTransform: 'none', float: 'right'}}
                >
                    Create Member
                </Button>
            </Container>
        </ThemeProvider>
    )
}
