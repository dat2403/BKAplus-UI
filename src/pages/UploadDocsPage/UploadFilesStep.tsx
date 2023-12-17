import React from "react";
import "./UploadFilesStep.scss";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Chip } from "primereact/chip";
import { useAppDispatch, useAppSelector } from "../../store/Store.ts";
import { updateSelectedFiles } from "../../store/slices/UploadFileSlice.ts";

const UploadFilesStep: React.FC = () => {
  const toast = React.useRef<any>(null);
  const fileUploaderRef = React.useRef<FileUpload>(null);
  const dispatch = useAppDispatch();
  const { selectedFiles } = useAppSelector((state) => state.uploadFile);

  React.useEffect(() => {
    if (selectedFiles?.length > 0) {
      fileUploaderRef?.current?.setFiles(selectedFiles);
    }
  }, []);
  const renderPreviewFile = (file: any): React.ReactNode => {
    return (
      <Chip
        label={file?.name}
        icon="pi pi-file"
        removable
        onRemove={() => {
          const newCurrentFiles = selectedFiles?.filter(
            (currentFile) => currentFile.name !== file.name,
          );
          fileUploaderRef.current?.setFiles(newCurrentFiles);
          dispatch(updateSelectedFiles(newCurrentFiles));
        }}
      />
    );
  };

  const onFilesSelect = (event: FileUploadSelectEvent) => {
    console.log("HTD", event.files);
    dispatch(updateSelectedFiles(event.files));
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
        onSelect={onFilesSelect}
      />
    </div>
  );
};

export default UploadFilesStep;
