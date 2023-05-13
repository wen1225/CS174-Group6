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
import { Cases } from "../pages/cases/Cases";
import { CreateCaseForm } from "../pages/cases/createCase"
import { UpdateCaseForm } from "../pages/cases/update";
import { Footer } from "../components/footer";
import PrivacyPage from "../pages/privacy";
import TermsPage from '../pages/terms'

const AppLayout = () => {
    return (
        <>
            <MenuBar />
            <Outlet />
            <Footer />
        </>
    )
}

export const router = createBrowserRouter([
    {
        path: "",
        element: <AppLayout />,
        children: [
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
                path: "case",
                children: [
                    {
                        path: "",
                        element: <Cases />
                    },
                    {
                        path: "create",
                        element: <CreateCaseForm />
                    },
                    {
                        path: "update/:id",
                        element: <UpdateCaseForm />
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
            },
            {
                path: "privacy",
                element: <PrivacyPage />
            },
            {
                path: "terms",
                element: <TermsPage />
            }
        ]
    }
])