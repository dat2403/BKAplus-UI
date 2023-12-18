import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ProtectedRoute from "./shared/guard/ProtectedRoute.tsx";
import React, { useEffect } from "react";
import useAuth from "./hooks/useAuth.ts";
import ApiClient from "./network/ApiClient.ts";
import "./App.scss";
import { Toast } from "primereact/toast";
import "./styles/index.scss";
import HomePage from "./pages/HomePage/HomePage.tsx";
import { AppRoute } from "./models/enums/AppRoute.ts";
import FavoriteDocsPage from "./pages/FavoriteDocsPage/FavoriteDocsPage.tsx";
import DocDetailsPage from "./pages/DocDetailsPage/DocDetailsPage.tsx";
import UploadDocsPage from "./pages/UploadDocsPage/UploadDocsPage.tsx";

export const AppToastRef = React.createRef<Toast>();

const ScrollToTop = (props: any) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

function App() {
  const { user, signOut } = useAuth();

  const client = ApiClient.getInstance();
  const token = user?.access_token;
  client.updateAccessToken(token);
  client.handleOnUnauthorized(signOut);

  // useEffect(() => {}, [user]);

  return (
    <ScrollToTop>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={AppRoute.HomePage} element={<HomePage />} />
          <Route path={AppRoute.FavoriteDocs} element={<FavoriteDocsPage />} />
          <Route path={AppRoute.SubjectDocs}>
            <Route path={AppRoute.Faculty}>
              <Route path={AppRoute.DocDetails} element={<DocDetailsPage />} />
            </Route>
          </Route>
          <Route path={AppRoute.UploadDocs} element={<UploadDocsPage />} />
          {/* Handle other routes */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toast ref={AppToastRef} />
    </ScrollToTop>
  );
}

export default App;
