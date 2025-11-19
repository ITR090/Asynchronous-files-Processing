import {createBrowserRouter} from 'react-router-dom'
// pages
import Home from '../pages/Home.jsx';
import LandMarkDetection from '../pages/LandMarkDetection.jsx';
import DocumentTranslator from '../pages/DocumentTranslator.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
// Layout
import Layout from './Layout.jsx';

export const routers_definitions = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "landmark-detection", element: <LandMarkDetection /> },
            { path: "document-translator", element: <DocumentTranslator /> },       
    ]
    }
])