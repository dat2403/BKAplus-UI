import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.ts";
import { Button } from "primereact/button";
import Assets from "../../assets/Assets.ts";
import { Avatar } from "primereact/avatar";
import "./styles/HomePage.scss";
import Scaffold, { TypeLoading } from "../../shared/components/Scaffold/Scaffold.tsx";
import usePageState from "../../hooks/usePageState.ts";
import useModal, { CloseModal } from "../../hooks/useModal.ts";
import { Dialog } from "primereact/dialog";
import { Input } from "antd";
import { AppToastRef } from "../../App.tsx";

const HomePage: React.FC = () => {
  const { signOut, user, updateUser } = useAuth();
  const { isLoading, setLoading, repository } = usePageState();
  const { modalNode, openModal } = useModal();

  return (
    <>
      <Scaffold
        isLoading={isLoading}
        typeLoading={TypeLoading.OVERLAY}>
        <div className="home-page-wrapper">
          <div
            className={"flex flex-row p-3"}
            style={{
              alignItems: "center"
            }}
          >
            <img
              src={Assets.icAccton}
              style={{
                height: 60
              }}
              alt={""}
            />

            <div className={"flex-1"} />

            <Avatar label="A" shape="circle" />

            <p
              style={{
                padding: 4
              }}
            >{`Hello, ${user?.username}`}</p>

            <Button
              style={{
                padding: 4
              }}
              onClick={() => {
                signOut();
              }}
            >
              Log out
            </Button>
          </div>
        </div>
        <div>
          <Button onClick={async () => {
            const result = await openModal<UpdateNameDialogData>(close => {
              return <Dialog visible header={"Update username"} onHide={close}>
                <UpdateNameDialog close={close} />
              </Dialog>;
            });

            updateUser({
              username: result?.user_name
            });

            AppToastRef.current?.show({
              severity: "success",
              detail: `Change to ${result?.user_name}`
            });
          }}>Update username using model</Button>
        </div>


      </Scaffold>
      {modalNode}
    </>
  );
};

export default HomePage;

interface UpdateNameModelProps<OutData> {
  close: CloseModal<OutData>;
}

interface UpdateNameDialogData {
  user_name: string;
}

const UpdateNameDialog: React.FC<UpdateNameModelProps<UpdateNameDialogData>> = (props) => {
  const { close } = props;
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  return <div className={"flex flex-column gap-2"}>
    <Input
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder={"Update user name"} />
    <Button type={"submit"} label={"Update"} onClick={() => close({
      user_name: username
    })} />
  </div>;
};
