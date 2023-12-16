import React from "react";
import "./UploadDocsPage.scss";
import { BreadCrumb } from "primereact/breadcrumb";
import { Steps } from "primereact/steps";
import UploadFilesStep from "./UploadFilesStep.tsx";
import AddDetailsStep from "./AddDetailsStep.tsx";
import { Button } from "primereact/button";

const UploadDocsPage: React.FC = () => {
  const items = [{ label: "Tài liệu" }, { label: "Tải lên tài liệu" }];
  const home = { label: "Trang chủ", url: "/" };
  const [activeStep, setActiveStep] = React.useState(0);
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

  const onFinish = () => {};

  return (
    <div className={"upload-doc-container"}>
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
