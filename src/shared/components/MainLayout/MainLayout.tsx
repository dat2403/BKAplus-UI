import React from "react";
import "./MainLayout.scss";
import SideNavigationBar from "../SideNavigationBar/SideNavigationBar.tsx";
import { AppRoute } from "../../../models/enums/AppRoute.ts";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.tsx";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = (props) => {
  const { children } = props;
  const location = useLocation();
  const NoNeedSideNavBarRoutes = [AppRoute.UploadDocs];
  const renderSideNavigationBar = () => {
    //Auto check Home path first
    if (location.pathname === "/") {
      return <SideNavigationBar />;
    }
    if (NoNeedSideNavBarRoutes.find((item) => item.includes(location.pathname))) {
      return <></>;
    }
    return <SideNavigationBar />;
  };
  return (
    <div className="main-layout-container">
      <Header />
      <div className={"main-layout-content"}>
        {renderSideNavigationBar()}
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
