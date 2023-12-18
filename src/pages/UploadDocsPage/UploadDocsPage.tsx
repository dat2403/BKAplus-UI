import React from "react";
import "./UploadDocsPage.scss";
import { BreadCrumb } from "primereact/breadcrumb";
import { Steps } from "primereact/steps";
import UploadFilesStep from "./UploadFilesStep.tsx";
import AddDetailsStep from "./AddDetailsStep.tsx";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../../store/Store.ts";
import { resetState } from "../../store/slices/UploadFileSlice.ts";
import usePageState from "../../hooks/usePageState.ts";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../models/enums/AppRoute.ts";

const UploadDocsPage: React.FC = () => {
  const items = [{ label: "Tài liệu" }, { label: "Tải lên tài liệu" }];
  const home = { label: "Trang chủ", url: "/" };
  const [activeStep, setActiveStep] = React.useState(0);
  const { repository } = usePageState();
  const toastRef = React.useRef<Toast>(null);
  const navigate = useNavigate();
  const {
    docDescription,
    docTitle,
    selectedFiles,
    selectedSemester,
    selectedCategories,
    selectedSubject,
    // selectedSchool,
    selectedLecturer,
  } = useAppSelector((state) => state.uploadFile);

  const stepItems = [
    {
      label: "Tải tài liệu lên",
      onRenderContent: () => <UploadFilesStep />,
    },
    {
      label: "Thêm thông tin chi tiết",
      onRenderContent: () => <AddDetailsStep />,
    },
    {
      label: "Hoàn thành",
      onRenderContent: () => <div></div>,
    },
  ];
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  const onNextStep = () => {
    setActiveStep((currentStep) => {
      if (currentStep < 2) {
        return currentStep + 1;
      }
      return currentStep;
    });
  };

  const onPreviousStep = () => {
    setActiveStep((currentStep) => {
      if (currentStep > 0) {
        return currentStep - 1;
      }
      return currentStep;
    });
  };

  const showSuccess = () => {
    toastRef.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 3000,
    });
  };

  const onFinish = async () => {
    const categoriesString = selectedCategories.join(",");
    const requestBody = new FormData();
    requestBody.append("title", docTitle);
    for (let i = 0; i < selectedFiles.length; i++) {
      requestBody.append("files", selectedFiles[i], selectedFiles[i].name);
    }
    requestBody.append("description", docDescription);
    requestBody.append("semester", selectedSemester);
    requestBody.append("categories", categoriesString);
    requestBody.append("lecturer_id", selectedLecturer);
    requestBody.append("subject_id", selectedSubject);
    //Missing school id
    const uploadRes = await repository.uploadDocument(requestBody);
    if (uploadRes.status_code === 200) {
      showSuccess();
      // dispatch(resetState());
      navigate(`${AppRoute.SubjectDocs}/TruongCNTT/${uploadRes?.data?.id as string}`);
    }
    // console.log(selectedFiles);
  };

  return (
    <div className={"upload-doc-container"}>
      <Toast ref={toastRef} />
      <BreadCrumb model={items} home={home} />
      <h1 className="page-title">Form tải lên tài liệu</h1>
      <div className="step-container">
        <Steps model={stepItems} activeIndex={activeStep} />
        <div className={"step-content"}>{stepItems[activeStep]?.onRenderContent()}</div>

        <div className={"action-button-wrapper"}>
          {activeStep !== 0 && (
            <Button
              onClick={onPreviousStep}
              icon="pi pi-chevron-left"
              severity="danger"
              label={"Quay lại"}
            />
          )}
          {activeStep === 0 && (
            <Button onClick={onNextStep} icon="pi pi-chevron-right" label={"Bước tiếp theo"} />
          )}
          {activeStep === 1 && <Button onClick={onFinish} icon="pi pi-upload" label={"Tải lên"} />}
        </div>
      </div>
    </div>
  );
};

export default UploadDocsPage;
