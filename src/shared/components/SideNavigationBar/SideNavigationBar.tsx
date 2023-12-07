import React from "react";
import "./SideNavigationBar.scss";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../models/enums/AppRoute";

interface ISideNavButton {
  title: string;
  iconName: string;
  isFocused: boolean;
  onNavigate: () => void;
}

const SideNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sideNavButtonList: ISideNavButton[] = [
    {
      title: "Trang chủ",
      iconName: "pi-home",
      isFocused: location.pathname === AppRoute.HomePage,
      onNavigate: () => {
        navigate(AppRoute.HomePage);
      },
    },
    {
      title: "Tài liệu môn học",
      iconName: "pi-book",
      isFocused: location.pathname.includes(AppRoute.SubjectDocs),
      onNavigate: () => {
        navigate(`${AppRoute.SubjectDocs}/TruongCNTT/123456`);
      },
    },
    {
      title: "Tài liệu yêu thích",
      iconName: "pi-heart",
      isFocused: location.pathname.includes(AppRoute.FavoriteDocs),
      onNavigate: () => {
        navigate(AppRoute.FavoriteDocs);
      },
    },
    {
      title: "Chương trình đào tạo",
      iconName: "pi-bars",
      isFocused: false,
      onNavigate: () => { },
    },
  ];

  return <div className="side-nav-bar-container">
    <div className="side-nav-header">
      <div className="side-nav-profile">
        <Avatar label="P" size="xlarge" shape="circle" />
        <div className="profile-text-container">
          <div className="profile-name">ITSS Team</div>
          <div className="profile-school">
            <i className="pi pi-building"></i>
            HUST
          </div>
          <div className="download-upvotes">
            <div className="info-wrapper">
              <div className="info-number down-color">120</div>
              Tải lên
            </div>
            <div className="info-wrapper">              <div className="info-number up-color">80</div>
              Upvotes
            </div>
          </div>
        </div>
      </div>

      <Button className="mt-5" label="Tải tài liệu" icon="pi pi-cloud-upload" />
    </div>

    <div className="mt-5">
      {sideNavButtonList.map(button => {
        return <div key={button.title} onClick={button.onNavigate} className={`side-nav-button ${button.isFocused ? "side-nav-button-focused" : ""}`}>
          <i className={`pi ${button.iconName}`}></i>
          {button.title}
        </div>;
      })}
    </div>
  </div>;
};

export default SideNavigationBar;