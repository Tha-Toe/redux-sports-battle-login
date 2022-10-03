import { Box, Button, Container } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Choose from "./component/SignUp/choose/Choose";
import EnterYourDetail from "./component/SignUp/enter-your-detail/EnterYourDetail";
import LoginFlow from "./component/Login/loginFlow/LoginFlow";
import EnterVerificationCodeSignup from "./component/SignUp/enter-verification-signup/EnterVerificationCodeSignup";
import ForgotPassword from "./component/Forgot/forgotPassword/ForgotPassword";
import NewPassword from "./component/Forgot/newPassword/NewPassword";
import CreatePassword from "./component/SignUp/createPassword/CreatePassword";
import CreateUserName from "./component/SignUp/createUserName/CreateUserName";
import EnterYourName from "./component/SignUp/enter-your-name/EnterYourName";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CheckMail from "./component/Forgot/checkMail/CheckMail";
import { Dashboard } from "./component/Dashboard/dashboard/Dashboard";
import { useContext, useState, useEffect, useRef } from "react";
import Protected from "./protected/Protected";
import Redirect from "./protected/Redirect";
import { gapi } from "gapi-script";

const clientId =
  "555618407648-lkittruvsnt5jr327s088990pgv3bi9t.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("auth2", initClient);
  });

  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#000000", //black
        light: "#242423", //rgba(36, 36, 35, 1)
        dark_gray: "#000000",
        dark: "#2C2C2C",
        gray: "#2E2D2D",
      },
      secondary: {
        main: "#ffffff", //white
        dark: "#FAFAFA",
        gray: "#ffffff",
        dark_gray: "#ffffff",
      },
    },
    breakpoints: {
      values: {
        xxxs: 0,
        xxs: 350,
        xs: 500,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1600,
      },
    },
  });
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
        light: "#696969",
        dark_gray: "#f3f4f8",
        dark: "#ffffff",
        gray: "#D9D9D9",
      },
      secondary: {
        main: "#000000",
        dark: "#696969",
        gray: "#D9D9D9",
        dark_gray: "#494949",
      },
    },
    breakpoints: {
      values: {
        xxxs: 0,
        xxs: 350,
        xs: 500,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1600,
      },
    },
  });
  const loggedRef = useRef();

  useEffect(() => {
    loggedRef.current.scrollTop = 0;
  }, []);
  return (
    <div
      ref={loggedRef}
      style={{
        width: "100vw",
        maxWidth: "100vw",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `${mode === "dark" ? "black" : "#f3f4f8"}`,
        overflowX: "hidden",
      }}
      className="app-container"
    >
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Redirect>
                  <LoginFlow mode={mode} setMode={setMode} />
                </Redirect>
              }
            />
            <Route
              path="/choose"
              element={<Choose mode={mode} setMode={setMode} />}
            />
            <Route
              path="/enteryourdetail"
              element={<EnterYourDetail mode={mode} setMode={setMode} />}
            />
            <Route
              path="/enteryourname"
              element={<EnterYourName mode={mode} setMode={setMode} />}
            />
            <Route
              path="/checkmail"
              element={<CheckMail mode={mode} setMode={setMode} />}
            />
            <Route
              path="/signupverification"
              element={
                <EnterVerificationCodeSignup mode={mode} setMode={setMode} />
              }
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword mode={mode} setMode={setMode} />}
            />
            <Route
              path="/newpassword"
              element={<NewPassword mode={mode} setMode={setMode} />}
            />
            <Route
              path="/createpassword"
              element={<CreatePassword mode={mode} setMode={setMode} />}
            />
            <Route
              path="/createusername"
              element={<CreateUserName mode={mode} setMode={setMode} />}
            />
            <Route
              path="/logged"
              element={
                <Protected>
                  <Dashboard mode={mode} setMode={setMode} />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
