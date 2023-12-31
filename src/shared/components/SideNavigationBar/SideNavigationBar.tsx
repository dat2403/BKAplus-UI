import React, { useRef } from "react";
import "./SideNavigationBar.scss";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../models/enums/AppRoute";
import { Menu } from "primereact/menu";
import useAuth from "../../../hooks/useAuth.ts";
import { useAppDispatch } from "../../../store/Store.ts";
import { resetHomeState } from "../../../store/slices/HomeSlice.ts";

interface ISideNavButton {
  title: string;
  iconName: string;
  isFocused: boolean;
  onNavigate: () => void;
}

const SideNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const dispatch = useAppDispatch();

  const menuLeft = useRef<any>(null);
  const items = [
    {
      label: "Đăng xuất",
      icon: "pi pi-sign-out",
      command: signOut,
    },
  ];

  const sideNavButtonList: ISideNavButton[] = [
    {
      title: "Trang chủ",
      iconName: "pi-home",
      isFocused:
        location.pathname === AppRoute.HomePage ||
        location.pathname.includes("/may-you-care") ||
        location.pathname.includes("/recent"),
      onNavigate: () => {
        navigate(AppRoute.HomePage);
        dispatch(resetHomeState());
      },
    },
    {
      title: "Tài liệu môn học",
      iconName: "pi-book",
      isFocused: location.pathname.includes(AppRoute.SubjectDocs),
      onNavigate: () => {
        // navigate(`${AppRoute.SubjectDocs}/TruongCNTT/12`);
      },
    },
    {
      title: "Tài liệu yêu thích",
      iconName: "pi-heart",
      isFocused: location.pathname.includes(AppRoute.FavoriteDocs),
      onNavigate: () => {
        // navigate(AppRoute.FavoriteDocs);
      },
    },
    {
      title: "Chương trình đào tạo",
      iconName: "pi-bars",
      isFocused: false,
      onNavigate: () => {},
    },
  ];

  return (
    <div className="side-nav-bar-container">
      <div className="side-nav-header">
        <div className="side-nav-profile">
          <Avatar
            label={user?.user?.full_name?.[0]?.toUpperCase()}
            size="xlarge"
            shape="circle"
            image={user?.user?.avatar}
            onClick={(event) => menuLeft?.current?.toggle?.(event)}
            aria-controls="popup_menu_left"
            aria-haspopup
          />
          <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
          <div className="profile-text-container">
            <div className="profile-name">{user?.user?.full_name}</div>
            <div className="profile-school">
              <i className="pi pi-building"></i>
              HUST
            </div>
            <div className="download-upvotes">
              <div className="info-wrapper">
                <div className="info-number down-color">120</div>
                Tải lên
              </div>
              <div className="info-wrapper">
                <div className="info-number up-color">80</div>
                Upvotes
              </div>
            </div>
          </div>
        </div>

        <Button
          className="mt-5"
          label="Tải lên tài liệu"
          icon="pi pi-cloud-upload"
          onClick={() => {
            navigate(AppRoute.UploadDocs);
          }}
        />
      </div>

      <div className="mt-5">
        {sideNavButtonList.map((button) => {
          return (
            <div
              key={button.title}
              onClick={button.onNavigate}
              className={`side-nav-button ${button.isFocused ? "side-nav-button-focused" : ""}`}
            >
              <i className={`pi ${button.iconName}`}></i>
              {button.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavigationBar;
