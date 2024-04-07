import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./css/app.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const Signup = React.lazy(() => import("./Signup"));
const Login = React.lazy(() => import("./Login"));
const Verify = React.lazy(() => import("./Verify"));

const App = () => {
  return (
    <div>
      <Provider store={store}>
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
                  <Verify />
                </Suspense>
              }
            />
            <Route path={"/"} element={<Navigate to="/sign-up" replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);

export default App;
