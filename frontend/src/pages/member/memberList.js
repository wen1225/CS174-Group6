import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import addIcon from '../img/plus.png'
import "./styles/member.scss"


export function MemberList() {

    const [memberInfoList, setMemberInfoList] = useState([]);
    const navigate = useNavigate();

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

    const fetchMember = async () => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/membership`)).data;

        const tempList = [...memberInfoList];

        Object.keys(HTTP_RES).forEach((memberId) => {
            const MEMBER_INfO = HTTP_RES[memberId];

            tempList.push({
                id: memberId,
                firstName: MEMBER_INfO["firstName"],
                lastName: MEMBER_INfO["lastName"],
                gender: MEMBER_INfO["gender"]
            })

            setMemberInfoList(tempList);
        })
    }

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "firstName", headerName: "First Name", flex: 1 },
        { field: "lastName", headerName: "Last Name", flex: 1 },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "click", headerName: "Edit", flex: 1, renderCell: renderFormButton }
    ]

    useEffect(() => {
        fetchMember()
    }, [])

    return (
        <div className="page" id="member">
            <div className='page-heading'>
                <h1 className="page-title">Members</h1>
                <button className='create' id="member" onClick={(e)=> {navigate("/member/create")}}>
                    <img src={addIcon} id="add-icon"/>
                    <p>
                        Create Member
                    </p>
                </button>
            </div>
            <DataGrid
                rows={memberInfoList}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
            />
        </div>
    )
}
