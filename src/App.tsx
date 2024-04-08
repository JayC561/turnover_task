import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./css/app.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./common/ProtectedRoute";

const Signup = React.lazy(() => import("./Signup"));
const Login = React.lazy(() => import("./Login"));
const Verify = React.lazy(() => import("./Verify"));
const Categories = React.lazy(() => import("./Categories"));

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path={"/sign-up"}
                element={
                  <Suspense fallback="loading...">
                    <Signup />
                  </Suspense>
                }
              />

              <Route
                path={"/login"}
                element={
                  <Suspense fallback="loading...">
                    <Login />
                  </Suspense>
                }
              />

              <Route
                path={"/verify"}
                element={
                  <Suspense fallback="loading...">
                    <ProtectedRoute keyToCheck={"email"}>
                      <Verify />
                    </ProtectedRoute>
                  </Suspense>
                }
              />

              <Route
                path={"/categories"}
                element={
                  <Suspense fallback="loading...">
                    <ProtectedRoute keyToCheck={"isLogined"}>
                      <Categories />
                    </ProtectedRoute>
                  </Suspense>
                }
              />

              <Route path={"/"} element={<Navigate to="/sign-up" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);

export default App;
