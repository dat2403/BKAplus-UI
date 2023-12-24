import React from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../models/enums/AppRoute.ts";
import { useAppDispatch } from "../../store/Store.ts";
import { toggleContinueUpload } from "../../store/slices/UploadFileSlice.ts";
import { Button } from "primereact/button";

const CompleteStep: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onContinueUpload = () => {
    dispatch(toggleContinueUpload());
  };
  const backToHomePage = () => {
    navigate(AppRoute.HomePage);
  };
  const confirm1 = () => {
    confirmDialog({
      message: "Bạn có muốn quay về trang chủ?",
      header: "Đã tải file lên thành công!",
      icon: "pi pi-exclamation-triangle",
      footer: () => <div>
        <Button label="Về trang chủ" icon="pi pi-times" severity="danger" onClick={() => backToHomePage()} />
        <Button label="Tiếp tục tải lên" icon="pi pi-check" onClick={async () => {
          onContinueUpload();
        }} autoFocus />
      </div>
    });
  };

  React.useEffect(() => {
    confirm1();
  }, []);

  return <React.Fragment>
    <ConfirmDialog />
  </React.Fragment>;
};

export default CompleteStep;
