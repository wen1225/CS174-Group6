import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export function Cases() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [caseList, setCaseList] = React.useState([]);;

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        navigate('/case/create');
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const renderDropDown = (params) => {
        return (
            <>
                <Button aria-controls='dropdown-menu' aria-haspopup='true' variant='contained' onClick={handleClick}>
                    <ArrowDropDownOutlinedIcon />
                </Button>
                <Menu id='dropdown-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem>View</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </>
        )
    }

    const renderFormButton = (params) => {
        return (
            <IconButton
                variant="contained"
                sx={{ textTransform: "none" }}
                component={Link} to={{
                    pathname: `/case/update/${params.id}`,
                }}
            >
                <EditIcon />
            </IconButton>
        )
    }

    const fetchCases = async() =>{
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/case`)).data;

        const tempList = [...caseList];
        
        Object.keys(HTTP_RES).forEach((caseId)=>{
            const CASE_INFO = HTTP_RES[caseId];

            tempList.push({
                id: caseId,
                title: CASE_INFO["title"],
                description: CASE_INFO["Description"],
                status:  CASE_INFO["isCaseClosed"]? "Open" : "Closed",
            })

            setCaseList(tempList);
        })
    }

    useEffect(()=>{
        fetchCases()
    }, [])

    const columns = [
        { field: 'id', headerName: 'Case ID', width: 150 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'description', headerName: 'Description', width: 400 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: "click", headerName: "Edit", renderCell: renderFormButton}
    ];


    return (
        <Paper elevation={3} sx={{ m: '2vh' }}>
            <Typography variant='h5' sx={{ p: '1vh' }}>Cases</Typography>
            <Box>
                <DataGrid rows={caseList} columns={columns} pageSize={5} checkboxSelection />
                <Button variant='contained' sx={{ mt: 3, mb: 2, textTransform: 'none', float: 'right' }} onClick={handleClick}>Create Case</Button>
            </Box>
        </Paper>
    )
}