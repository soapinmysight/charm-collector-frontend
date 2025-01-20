import {Link, Outlet} from 'react-router';
import ItemsList from "../pages/ItemsList.jsx";
import ItemCreate from "../pages/ItemCreate.jsx";
import ItemDetail from "../pages/ItemDetail.jsx";

function Layout() {
    return (
        <div>
            <header>
                <nav>
                    {/*<Link to={`/`}>Home</Link>*/}
                    <Link to={`/`}>Items List</Link>
                    <Link to={`/ItemCreate`}>Create an item</Link>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;