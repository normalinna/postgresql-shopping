import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import Products from "./Components/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "*", element: <div>404 NOT FOUND</div> },
    ],
  },
]);  
