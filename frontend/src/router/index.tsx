import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../components/layout/Layout"
import { HomePage } from "../pages/HomePage"
import { NotFoundPage } from "../pages/NotFoundPage"
import { MetarPage } from "@/pages/MetarPage"

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
        path: "metar",
        element: <MetarPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
])
