import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import "./styles/homepage.scss";
import memberIcon from './img/group-chat.png'
import openCaseIcon from './img/checked.png'
import closedCaseIcon from './img/pending-case.png'
import { DataGrid } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import "./styles/page.scss"
import caseIcon from './img/case-study.png'
import peopleIcon from './img/people.png'
import plusIcon from './img/plus.png'

function CaseDataList() {

    const [caseList, setCaseList] = React.useState([]);;

    const fetchCases = async () => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/case`)).data;

        const tempList = [...caseList];

        Object.keys(HTTP_RES).forEach((caseId) => {
            const CASE_INFO = HTTP_RES[caseId];

            tempList.push({
                id: caseId,
                title: CASE_INFO["title"],
                status: CASE_INFO["isCaseClosed"] ? "Open" : "Closed",
            })

            setCaseList(tempList);
        })
    }


    const columns = [
        {
            field: 'id', headerName: 'Case ID', width: 120, renderCell: (params) =>
                <Link to={`/case/update/${params.id}`} className="list-item">${params.id}</Link>
        },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'status', headerName: 'Status', width: 80 },
    ];

    useEffect(() => {
        fetchCases()
    }, [])

    return (
        <div className="home-case-list">
            <DataGrid rows={caseList}
                columns={columns}
                pageSizeOptions={[5]}
                disableMultipleRowSelection={true}
                hideFooter={true} />
        </div>
    )
}

function MemberDataList() {

    const [memberList, setMemberList] = React.useState([]);

    const fetchMember = async () => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/membership`)).data;

        const tempList = [...memberList];

        Object.keys(HTTP_RES).forEach((memberId) => {
            const MEMBER_INfO = HTTP_RES[memberId];

            tempList.push({
                id: memberId,
                firstName: MEMBER_INfO["firstName"],
                lastName: MEMBER_INfO["lastName"],
                gender: MEMBER_INfO["gender"]
            })

            setMemberList(tempList);
        })
    }

    const columns = [
        {
            field: "id", headerName: "ID", width: 120, renderCell: (params) =>
                <Link to={`/member/update/${params.id}`} className="list-item">${params.id}</Link>
        },
        { field: "firstName", headerName: "First Name", width: 120 },
        { field: "lastName", headerName: "Last Name", width: 120 },
        { field: "gender", headerName: "Gender", width: 90 },
    ]

    useEffect(() => {
        fetchMember()
    }, [])


    return (
        <div className="home-case-list">
            <DataGrid rows={memberList}
                columns={columns}
                pageSizeOptions={[5]}
                disableMultipleRowSelection={true}
                hideFooter={true} />
        </div>
    )
}


function DataSection() {
    const navigate = useNavigate();
    return (
        <section id="data">
            <div className="data-container">
                <div className="heading">
                    <img src={caseIcon} className='icon' />
                    <h1 className="title">
                        Cases
                    </h1>
                    <button className='add' onClick={(e)=>{navigate("case/create")}}>
                        <img src={plusIcon} className='add' />
                        <p>Create</p>
                    </button>

                </div>
                <CaseDataList />
            </div>
            <div className="data-container">
                <div className="heading">
                    <img src={peopleIcon} className='icon' />
                    <h1 className="title">
                        Members
                    </h1>
                    <button className='add' onClick={(e)=>{navigate("member/create")}}>
                        <img src={plusIcon} className='add' />
                        <p>Create</p>
                    </button>
                </div>
                <MemberDataList />
            </div>
        </section>
    )
}

export function Homepage() {

    const [closedCaseCount, setClosedCaseCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);
    const [openCaseCount, setOpenCaseCount] = useState(0);

    const fetchCases = async () => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/case`)).data;

        let closedCases = 0;
        let openCases = 0;

        for (const CASE_KEY in HTTP_RES) {
            const CASE = HTTP_RES[CASE_KEY];
            console.log(CASE)
            const IS_CASE_CLOSED = CASE["isCaseClosed"];

            if (IS_CASE_CLOSED) {
                closedCases += 1;
            } else {
                openCases += 1;
            }
        }

        setClosedCaseCount(closedCases);
        setOpenCaseCount(openCases);

    }

    const fetchMembers = async () => {
        const HTTP_RES = (await axios.get(`${process.env["REACT_APP_SERVER_URL"]}/membership`)).data;
        setMemberCount(Object.keys(HTTP_RES).length);
    }

    useEffect(() => {
        fetchCases()
        fetchMembers()
    }, [])

    return (
        <div className='page' id="homepage">
            <section id="info">
                <div className="info-box" id="closed-case">
                    <img src={openCaseIcon} className="icon" />
                    <div className="number-info">
                        <p className="title">
                            Number of closed cases
                        </p>
                        <p className="number">
                            {closedCaseCount}
                        </p>
                    </div>
                </div>
                <div className="info-box" id="open-case">
                    <img src={closedCaseIcon} className="icon" />
                    <div className="number-info">
                        <p className="title">
                            Number of open cases
                        </p>
                        <p className="number">
                            {openCaseCount}
                        </p>
                    </div>
                </div>
                <div className="info-box" id="member">
                    <img src={memberIcon} className="icon" />
                    <div className="number-info">
                        <p className="title">
                            Number of members
                        </p>
                        <p className="number">
                            {memberCount}
                        </p>
                    </div>
                </div>
            </section>
            <DataSection />
        </div>
    )
}