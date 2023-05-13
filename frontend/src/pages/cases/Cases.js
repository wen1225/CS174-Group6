import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../styles/page.scss"
import "./styles/cases.scss"
import addIcon from '../img/plus.png'
import VisibilityIcon from '@mui/icons-material/Visibility';


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

    const renderEditButton = (params) => {
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

    const renderViewButton = (params) => {
        return (
            <IconButton
                variant="contained"
                sx={{ textTransform: "none" }}
                component={Link} to={{
                    pathname: `/case/update/${params.id}`,
                }}
            >
                <VisibilityIcon />
            </IconButton>
        )
    }

    const fetchCases = async () => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/case`)).data;

        const tempList = [...caseList];

        Object.keys(HTTP_RES).forEach((caseId) => {
            const CASE_INFO = HTTP_RES[caseId];

            tempList.push({
                id: caseId,
                title: CASE_INFO["title"],
                description: CASE_INFO["Description"],
                status: CASE_INFO["isCaseClosed"] ? "Open" : "Closed",
            })

            setCaseList(tempList);
        })
    }

    useEffect(() => {
        fetchCases()
    }, [])

    const columns = [
        { field: 'id', headerName: 'Case ID', width: 150 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'description', headerName: 'Description', width: 500 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: "view", headerName: "View", renderCell: renderViewButton,  width: 70},
        { field: "edit", headerName: "Edit", renderCell: renderEditButton,  width: 70}
    ];


    return (
        <div className="page" id="cases">
            <div className='page-heading'>
                <h1 className="page-title">Cases</h1>
                <button className='create' onClick={handleClick}>
                    <img src={addIcon} id="add-icon"/>
                    <p>
                        Create Case
                    </p>
                </button>
            </div>
            <div id="case-list">
                <DataGrid rows={caseList} columns={columns} pageSizeOptions={[5]} checkboxSelection />
            </div>
        </div>
    )
}