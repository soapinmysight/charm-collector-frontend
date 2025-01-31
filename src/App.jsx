import {createBrowserRouter, RouterProvider} from 'react-router';
import ScoreEntriesList from './pages/ScoreEntriesList.jsx';
import ScoreEntryCreate from './pages/ScoreEntryCreate.jsx';
import ScoreEntryDetail from "./pages/ScoreEntryDetail.jsx";
import Layout from './components/Layout';
import ScoreEntryEdit from "./pages/ScoreEntryEdit.jsx"
import Game from "./pages/Game"

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <ScoreEntriesList/>,
            },
            {
                path: '/ScoreEntryCreate',
                element: <ScoreEntryCreate/>,
            },
            {
                path: '/Game',
                element: <Game/>,
            },
            {
                path: '/ScoreEntryDetail/:id',
                element: <ScoreEntryDetail/>,
            },
            {
                path: '/ScoreEntryEdit/:id',
                element: <ScoreEntryEdit/>,
            },

        ]
    }
]);
function App() {
  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

export default App
