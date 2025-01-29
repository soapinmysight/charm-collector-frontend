import {Link, Outlet} from 'react-router';

function Layout() {
    return (
        <div className="bg-gray-900 min-h-screen text-gray-100">
            <header className="bg-gray-800 p-4 shadow-md">
                <nav className="flex space-x-6 justify-center">
                    {/*<Link to={`/`}>Home</Link>*/}
                    <Link to={`/`} className="text-pink-400 hover:text-pink-300">Items List</Link>
                    {/*<Link to={`/ItemCreate`} className="text-pink-400 hover:text-pink-300">Create an Item</Link>*/}
                    <Link to={`/Game`} className="text-pink-400 hover:text-pink-300">Game</Link>
                </nav>
            </header>
            <main className="p-6">
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;