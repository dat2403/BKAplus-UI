import React from "react";
import "./UploadFilesStep.scss";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";

const UploadFilesStep: React.FC = () => {
  const toast = React.useRef<any>(null);
  const fileUploaderRef = React.useRef<FileUpload>(null);
  const [currentFiles, setCurrentFiles] = React.useState<File[]>([]);
  // const onUpload = () => {
  //   toast.current?.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
  // };

  const getCurrentFiles = () => {
    const newCurrentFiles = fileUploaderRef.current?.getFiles();
    console.log(newCurrentFiles);
    if (newCurrentFiles) {
      setCurrentFiles(newCurrentFiles);
    }
    // return currentFiles;
  };

  const renderPreviewFile = (file: any): React.ReactNode => {
    return (
      <Chip
        label={file?.name}
        icon="pi pi-file"
        removable
        onRemove={() => {
          const newCurrentFiles = currentFiles?.filter(
            (currentFile) => currentFile.name !== file.name,
          );
          fileUploaderRef.current?.setFiles(newCurrentFiles);
          setCurrentFiles(newCurrentFiles);
        }}
      />
    );
  };

  return (
    <div className="upload-file-step-container">
      <Toast ref={toast}></Toast>
      <FileUpload
        ref={fileUploaderRef}
        name="demo[]"
        url={"/api/upload"}
        multiple
        mode="advanced"
        accept=".pdf, .docx, .doc"
        maxFileSize={60000000}
        chooseOptions={{
          icon: "pi pi-upload",
          label: "Chọn file",
        }}
        uploadOptions={{
          style: {
            display: "none",
          },
        }}
        cancelOptions={{
          style: {
            display: "none",
          },
        }}
        itemTemplate={renderPreviewFile}
        emptyTemplate={<div className="drag-and-drop-text">Hoặc kéo thả</div>}
      />
      {/*<Button label={"Test"} onClick={getCurrentFiles} />*/}
    </div>
  );
};

export default UploadFilesStep;
