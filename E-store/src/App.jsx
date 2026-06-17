import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";

const ProductsComp = React.lazy(() => import("./components/Products/Products"));

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loader />}>
              <ProtectedRoute>
                <ProductsComp />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    // {
    //   path: "*",
    //   element: <NotFound />,
    // },
  ]);
  return (
    <>
      <div className="toaster">
        <Toaster position="top-center"></Toaster>
      </div>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
