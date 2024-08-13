import {Outlet} from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootPage() {

    return (<div className="window">
            <MainNavigation/>
            <main className="main-container">
                <Outlet />
            </main>
        </div>
    )
}