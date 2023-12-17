import React from "react";
import { useAppSelector } from "../../store/Store.ts";
import "./AddDetailsStep.scss";
import pdfIcon from "../../assets/icons/pdf-icon.png";
import { useUtils } from "../../shared/utility/Util.ts";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

const AddDetailsStep: React.FC = () => {
  const { selectedFiles } = useAppSelector((state) => state.uploadFile);

  const { calcFileSizeInMB } = useUtils();
  const [documentTitle, setDocumentTitle] = React.useState("");
  const [documentDescription, setDocumentDescription] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState(null);
  const categoryOptions = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const [selectedSchool, setSelectedSchool] = React.useState(null);
  const [selectedSemester, setSelectedSemester] = React.useState(null);
  const schoolOptions = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const semesterOptions = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const [selectedLecturer, setSelectedLecturer] = React.useState(null);
  const lecturerOptions = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const subjectOptions = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  React.useEffect(() => {
    console.log(selectedFiles);
  }, []);

  return (
    <div className="add-details-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "24px",
        }}
      >
        {selectedFiles?.map((selectedFile, index) => (
          <div key={index} className="selected-file-info">
            <img src={pdfIcon} alt="" className={"selected-file-img"} />
            <div className="selected-file-text-wrapper">
              <div className={"title"}>{selectedFile?.name}</div>
              <div className={"size"}>{calcFileSizeInMB(selectedFile?.size)} MB</div>
            </div>
          </div>
        ))}
      </div>

      <div className={"info-fields-wrapper"}>
        <div className={"left-col"}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div className={"field-title"}>Tiêu đề</div>
            <InputText
              placeholder={"Thêm tiêu đề"}
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div className={"field-title"}>Mô tả</div>
            <InputTextarea
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
              rows={11}
              cols={30}
              placeholder={"Thêm mô tả"}
            />
          </div>
        </div>
        <div className={"right-col"}>
          <div className="display-column-gap-10">
            <div className={"field-title"}>Từ khóa</div>
            <MultiSelect
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.value)}
              options={categoryOptions}
              optionLabel="name"
              optionValue="code"
              display="chip"
              placeholder="Chọn từ khóa"
              maxSelectedLabels={3}
              className="w-full"
            />
          </div>
          <div className="display-row-gap-20">
            <div className="display-column-gap-10 width-half-full">
              <div className={"field-title"}>Khoa/Trường</div>
              <Dropdown
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.value)}
                options={schoolOptions}
                optionLabel="name"
                optionValue="code"
                placeholder="Chọn khoa viện"
                className="w-full"
              />
            </div>
            <div className="display-column-gap-10 flex-grow-1">
              <div className={"field-title"}>Học kỳ</div>
              <Dropdown
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.value)}
                options={semesterOptions}
                optionLabel="name"
                optionValue="code"
                placeholder="Chọn học kỳ"
                className="w-full"
              />
            </div>
          </div>
          <div className="display-row-gap-20">
            <div className="display-column-gap-10 width-half-full">
              <div className={"field-title"}>Giảng viên</div>
              <Dropdown
                value={selectedLecturer}
                onChange={(e) => setSelectedLecturer(e.value)}
                options={lecturerOptions}
                optionLabel="name"
                optionValue="code"
                placeholder="Chọn giảng viên"
                className="w-full"
              />
            </div>
            <div className="display-column-gap-10 flex-grow-1">
              <div className={"field-title"}>Thành tích môn học</div>
              <FileUpload
                style={{
                  width: "100%",
                }}
                mode="basic"
                name="demo[]"
                accept="image/*"
                maxFileSize={1000000}
                chooseOptions={{
                  icon: "pi pi-upload",
                  label: "Tải ảnh lên",
                  style: {
                    width: "100%",
                    background: "white",
                    color: "var(--gray-500)",
                    border: "1px solid var(--gray-300)",
                  },
                }}
              />
            </div>
          </div>
          <div className="display-column-gap-10">
            <div className={"field-title"}>Môn học</div>
            <Dropdown
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.value)}
              options={subjectOptions}
              optionLabel="name"
              optionValue="code"
              placeholder="Chọn môn học"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDetailsStep;
