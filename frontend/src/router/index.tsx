import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../components/layout/layout"
import { HomePage } from "../pages/HomePage"
import { NotFoundPage } from "../pages/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
])
