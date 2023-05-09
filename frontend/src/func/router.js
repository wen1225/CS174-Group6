import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";

import { MenuBar } from "../components/menubar";
import { MemberList } from "../pages/member/memberList";
import { CreateMemberForm } from "../pages/member/create";
import { UpdateMemberForm } from "../pages/member/update";



const AppLayout = () => {
    return (
        <>
            <MenuBar />
            <div style={{paddingTop: "60px"}}>
                <Outlet />
            </div>
        </>
    )
}

export const router = createBrowserRouter([
    {
        path: "",
        element: <AppLayout />,
        children: [
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
            }
        ]
    }
])