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
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import { useNavigate } from 'react-router-dom'



export function Cases() {

    const [anchorEl, setAnchorEl] = React.useState(null);

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

    const columns = [
        { field: 'id', headerName: 'Case ID', width: 150 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'description', headerName: 'Description', width: 400 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'action', headerName: 'Action', width: 100, renderCell: renderDropDown }
    ];

    const rows = [
        { id: 1, title: 'Case Title 1', description: 'Case Description 1', status: 'Open' },
        { id: 2, title: 'Case Title 2', description: 'Case Description 2', status: 'Closed' },
        { id: 3, title: 'Case Title 3', description: 'Case Description 3', status: 'Open' },
    ];

    return (
        <Paper elevation={3} sx={{ m: '2vh' }}>
            <Typography variant='h5' sx={{ p: '1vh' }}>Cases</Typography>
            <Box>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                <Button variant='contained' sx={{ mt: 3, mb: 2, textTransform: 'none', float: 'right' }} onClick={handleClick}>Create Case</Button>
            </Box>
        </Paper>
    )
}