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
import { AppRoute } from "./models/enums/AppRoute.ts";
import FavoriteDocsPage from "./pages/FavoriteDocsPage/FavoriteDocsPage.tsx";
import DocDetailsPage from "./pages/DocDetailsPage/DocDetailsPage.tsx";

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
        <Route path={AppRoute.HomePage} element={<HomePage />} />
        <Route path={AppRoute.FavoriteDocs} element={<FavoriteDocsPage />} />
        <Route path={AppRoute.SubjectDocs}>
          <Route path={AppRoute.Faculty}>
            <Route path={AppRoute.DocDetails} element={<DocDetailsPage />} />
          </Route>
        </Route>
        {/* Handle other routes */}
      </Route>
      <Route path="*" element={<Navigate to='/'/>}/>
    </Routes>
    <Toast ref={AppToastRef}/>
  </>
}

export default App
