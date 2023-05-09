import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";

import { MenuBar } from "../components/menubar";
import { MemberList } from "../pages/member/memberList";
import { CreateMemberForm } from "../pages/member/create";
import { UpdateMemberForm } from "../pages/member/update";
import { Login } from "../pages/auth/Login";
import { CreateAccount } from "../pages/auth/CreateAccount";
import { Homepage } from "../pages/homepage";
import Cases from '../pages/Cases'

const AppLayout = () => {
    return (
        <>
            <MenuBar />
            <div style={{paddingTop: "80px"}}>
                <Outlet />
            </div>
        </>
    )
}

export const router = createBrowserRouter([
    {
        path: "",
        element: <AppLayout />,
        children: [,
            {
                path: "",
                element: <Homepage />
            },
            {
                path: "member",
                children: [
                    {
                        path: "",
                        element: <MemberList />
                    },
                    {
                        path: "create",
                        element: <CreateMemberForm />
                    },
                    {
                        path: "update/:id",
                        element: <UpdateMemberForm />
                    }
                ]
            },
            {
                path: "auth",
                children: [
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "register",
                        element: <CreateAccount />
                    }
                ]
            },
            {
                path: "case",
                children: [
                    {
                        path: "",
                        element: <Cases />
                    }
                ]
            }
        ]
    }
])