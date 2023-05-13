import React from "react";
import { Box, MenuItem } from '@mui/material';
import { Paper } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import { useState } from "react";
import { Select } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import "../styles/page.scss"
import "./styles/cases.scss"


export function CreateCaseForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        caseTitle: '',
        startDate: '',
        endDate: '',
        isCaseClosed: false,
        associatedMemberId: '',
        caseDescription: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget)

        const CASE = form.get("isCaseClosed") === "true" ? true : false;

        const HTTP_REQ_DATA = {
            "title": form.get("caseTitle"),
            "startDate": form.get("startDate"),
            "isCaseClosed": CASE,
            "endDate": form.get("endDate"),
            "associatedMemberId": form.get("associatedMemberId"),
            "Description": form.get("caseDescription")

        }

        console.log(HTTP_REQ_DATA)

        axios.post(`${process.env["REACT_APP_SERVER_URL"]}/case`, HTTP_REQ_DATA)
        navigate("/case")

    }

    return (
        <div className="page" id="create-case">
            <div className='page-heading'>
                <h1 className="page-title">Create Case</h1>
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
                    name="caseTitle"
                    label="Case Title"
                    value={formData.caseTitle}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                />
                <TextField
                    name="caseDescription"
                    label="Case Description"
                    value={formData.caseDescription}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}

                />
                <TextField
                    name="associatedMemberId"
                    label="Associated Member ID"
                    value={formData.associatedMemberId}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                />
                <TextField
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: { max: formData.endDate },
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                />
                <TextField
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: { min: formData.startDate },
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                />
                <Select
                    name="isCaseClosed"
                    label="Is Case Closed"
                    value={formData.status}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ gridColumn: '1 / 3', m: '1vh' }}
                >
                    <MenuItem value={false}>Opened</MenuItem>
                    <MenuItem value={true}>Closed</MenuItem>
                </Select>
                <Button type="submit" variant="contained" sx={{ justifySelf: 'center' }}>Create</Button>
            </FormControl>
        </div>

    );
}
