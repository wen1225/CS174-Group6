import React from "react";
import { Box, MenuItem } from '@mui/material';
import { Paper } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography'
import { Select } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import "./styles/cases.scss"

export function UpdateCaseForm() {

    const { id } = useParams();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [associatedMemberId, setAssociatedMemberId] = useState();
    const [isCaseClosed, setIsCaseClosed] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget)

        const CASE = form.get("isCaseClosed") === "true" ? true : false;

        const HTTP_REQ_DATA = {
            "title": title,
            "startDate": startDate,
            "isCaseClosed": CASE,
            "endDate": endDate,
            "associatedMemberId": associatedMemberId,
            "Description": description

        }

        console.log(HTTP_REQ_DATA)

        axios.put(`${process.env["REACT_APP_SERVER_URL"]}/case/${id}`, HTTP_REQ_DATA)
        navigate("/case")


    }

    const fetchCaseInfo = async () => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/case/${id}`)).data;

        setTitle(HTTP_RES["title"]);
        setStartDate(HTTP_RES["startDate"]);
        setEndDate(HTTP_RES["endDate"]);
        setIsCaseClosed(HTTP_RES["isCaseClosed"])
        setAssociatedMemberId(HTTP_RES["associatedMemberId"])
        setDescription(HTTP_RES["Description"])

    }

    useEffect(() => {
        fetchCaseInfo();
    }, [])

    return (
        <div className="page" id="update-case">
            <div className='page-heading'>
                <h1 className="page-title">Update Case</h1>
            </div>
            <FormControl
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gridTemplateRows: 'repeat(4, auto)',
                    gridGap: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    '& > *': { m: 1 }
                }}
                onSubmit={handleSubmit}
                component="form"

            >
                <TextField
                    name="title"
                    label="Case Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                />
                <TextField
                    name="description"
                    label="Case Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}

                />
                <TextField
                    name="associatedMemberId"
                    label="Associated Member ID"
                    value={associatedMemberId}
                    onChange={(e) => {
                        setAssociatedMemberId(e.target.value)
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                />
                <TextField
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value)
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                />
                <TextField
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                        setEndDate(e.target.value)
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                />
                <Typography
                    textAlign="center"
                >
                    Is Case Closed?
                </Typography>
                <Select
                    name="isCaseClosed"
                    label="Is Case Closed"
                    value={isCaseClosed}
                    onChange={(e) => {
                        setIsCaseClosed(e.target.value)
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                >
                    <MenuItem value={false}>Opened</MenuItem>
                    <MenuItem value={true}>Closed</MenuItem>
                </Select>

                <Button type="submit" variant="contained" sx={{ justifySelf: 'center' }}>Submit</Button>
            </FormControl>
        </div>
    );
}
