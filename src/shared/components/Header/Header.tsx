import React from "react";
import "./Header.scss";
import { Chip } from "primereact/chip";
import { useAppDispatch, useAppSelector } from "../../../store/Store.ts";
import { Button } from "primereact/button";
import Assets from "../../../assets/Assets.ts";
import { useNavigate } from "react-router-dom";
import { modalActions } from "../../../store/slices/ModalSlice.ts";
import { resetHomeState } from "../../../store/slices/HomeSlice.ts";

const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="header-container">
      <div
        className={"logo-container"}
        onClick={() => {
          dispatch(resetHomeState());
          navigate("/");
        }}
      >
        <img src={Assets.logo} alt="" className={"img"} />
        <div className="page-name">BK A+</div>
      </div>
      <div className={"profile-container"}>
        <Button
          icon="pi pi-search"
          rounded
          text
          aria-label="Search"
          onClick={() => dispatch(modalActions.setIsOpen(true))}
        />
        <Button icon="pi pi-question-circle" rounded text aria-label="Q&A" />
        <Button icon="pi pi-bell" rounded text aria-label="Search" />
        <Chip label={user?.user?.full_name} image={user?.user?.avatar} />
      </div>
    </div>
  );
};

export default Header;
