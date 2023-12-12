import React from "react";
import "./MainLayout.scss";
import SideNavigationBar from "../SideNavigationBar/SideNavigationBar.tsx";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className="main-layout-container">
      <SideNavigationBar />
      {children}
    </div>
  );
};

export default MainLayout;
