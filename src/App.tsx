import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ProtectedRoute from "./shared/guard/ProtectedRoute.tsx";
import React, {useEffect} from "react";
import useAuth from "./hooks/useAuth.ts";
import ApiClient from "./network/ApiClient.ts";
import "./App.scss"
import {Toast} from 'primereact/toast';
import './styles/index.scss';
import HomePage from "./pages/HomePage/HomePage.tsx";

export const AppToastRef = React.createRef<Toast>()

function App() {
  const {user, signOut} = useAuth()

  const client = ApiClient.getInstance();

  useEffect(() => {
    const token = user?.access_token;
    client.updateAccessToken(token)
    client.handleOnUnauthorized(signOut)
  }, [user])

  return <>
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<HomePage/>}/>
        {/* Handle other routes */}
      </Route>
      <Route path="*" element={<Navigate to='/'/>}/>
    </Routes>
    <Toast ref={AppToastRef}/>
  </>
}

export default App
