import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/Store.ts";
import "./AddDetailsStep.scss";
import pdfIcon from "../../assets/icons/pdf-icon.png";
import { useUtils } from "../../shared/utility/Util.ts";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
// import { FileUpload } from "primereact/fileupload";
import usePageState from "../../hooks/usePageState.ts";
import {
  updateDocDescription,
  updateDocTitle,
  updateLecturerList,
  updateListCategory,
  updateSchoolList,
  updateSelectedCategories,
  updateSelectedLecturer,
  updateSelectedSchool,
  updateSelectedSemester,
  updateSelectedSubject,
  updateSubjectList,
} from "../../store/slices/UploadFileSlice.ts";
import { SelectItem, SelectItemOptionsType } from "primereact/selectitem";

const AddDetailsStep: React.FC = () => {
  const {
    isFirstLoad,
    selectedFiles,
    categoryList,
    schoolList,
    selectedSchool,
    selectedSubject,
    selectedLecturer,
    lecturerList,
    subjectList,
    selectedCategories,
    docTitle,
    docDescription,
    selectedSemester,
  } = useAppSelector((state) => state.uploadFile);
  const { repository } = usePageState();
  const { calcFileSizeInMB } = useUtils();
  // const [selectedCategories, setSelectedCategories] = React.useState(null);
  const dispatch = useAppDispatch();

  const semesterOptions = [
    { label: "2023.1", value: "20231" },
    { label: "2022.2", value: "20222" },
    { label: "2022.1", value: "20221" },
    { label: "2021.2", value: "20212" },
    { label: "2021.1", value: "20211" },
  ];

  React.useEffect(() => {
    const fetchInitData = async () => {
      const cateRes = await repository.getCategoryList();
      const newCateList: SelectItem[] | undefined = cateRes.data?.map(
        (cate) =>
          ({
            label: cate.name,
            value: cate.id,
          }) as SelectItem,
      );
      dispatch(updateListCategory(newCateList as SelectItem[]));
      const schoolRes = await repository.getSchoolList();
      const newSchoolList: SelectItem[] | undefined = schoolRes?.data?.map(
        (school) =>
          ({
            label: school.name,
            value: school.id,
          }) as SelectItem,
      );
      dispatch(updateSchoolList(newSchoolList as SelectItemOptionsType));
    };

    if (isFirstLoad) {
      fetchInitData();
    }
  }, []);

  React.useEffect(() => {
    const fetchLecturerAndSubjectList = async () => {
      const lecturerRes = await repository.getLecturerList(selectedSchool);
      const subjectRes = await repository.getSubjectList(selectedSchool);
      const newLecturerList = lecturerRes?.data?.map(
        (lecturer) =>
          ({
            label: lecturer.name,
            value: lecturer.id,
          }) as SelectItem,
      );
      const newSubjectList = subjectRes?.data?.map(
        (sub) =>
          ({
            label: sub.name,
            value: sub.id,
          }) as SelectItem,
      );
      dispatch(updateLecturerList(newLecturerList as SelectItemOptionsType));
      dispatch(updateSubjectList(newSubjectList as SelectItemOptionsType));
    };
    if (!selectedSchool || selectedSchool !== "") {
      fetchLecturerAndSubjectList();
    }
  }, [selectedSchool]);

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
              value={docTitle}
              onChange={(e) => dispatch(updateDocTitle(e.target.value))}
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
              value={docDescription}
              onChange={(e) => dispatch(updateDocDescription(e.target.value))}
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
              onChange={(e) => dispatch(updateSelectedCategories(e.value))}
              options={categoryList}
              optionLabel="label"
              optionValue="value"
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
                onChange={(e) => dispatch(updateSelectedSchool(e.value))}
                options={schoolList}
                optionLabel="label"
                optionValue="value"
                placeholder="Chọn khoa viện"
                className="w-full"
              />
            </div>
            <div className="display-column-gap-10 flex-grow-1">
              <div className={"field-title"}>Học kỳ</div>
              <Dropdown
                value={selectedSemester}
                onChange={(e) => dispatch(updateSelectedSemester(e.value))}
                options={semesterOptions}
                optionLabel="label"
                optionValue="value"
                placeholder="Chọn học kỳ"
                className="w-full"
              />
            </div>
          </div>
          {selectedSchool !== "" && (
            <React.Fragment>
              <div className="display-row-gap-20">
                <div className="display-column-gap-10 width-half-full">
                  <div className={"field-title"}>Giảng viên</div>
                  <Dropdown
                    value={selectedLecturer}
                    onChange={(e) => dispatch(updateSelectedLecturer(e.value))}
                    options={lecturerList}
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Chọn giảng viên"
                    className="w-full"
                  />
                </div>
                {/*<div className="display-column-gap-10 flex-grow-1">*/}
                {/*  <div className={"field-title"}>Thành tích môn học</div>*/}
                {/*  <FileUpload*/}
                {/*    style={{*/}
                {/*      width: "100%",*/}
                {/*    }}*/}
                {/*    mode="basic"*/}
                {/*    name="demo[]"*/}
                {/*    accept="image/*"*/}
                {/*    maxFileSize={1000000}*/}
                {/*    chooseOptions={{*/}
                {/*      icon: "pi pi-upload",*/}
                {/*      label: "Tải ảnh lên",*/}
                {/*      style: {*/}
                {/*        width: "100%",*/}
                {/*        background: "white",*/}
                {/*        color: "var(--gray-500)",*/}
                {/*        border: "1px solid var(--gray-300)",*/}
                {/*      },*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</div>*/}
              </div>
              <div className="display-column-gap-10">
                <div className={"field-title"}>Môn học</div>
                <Dropdown
                  value={selectedSubject}
                  onChange={(e) => dispatch(updateSelectedSubject(e.value))}
                  options={subjectList}
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Chọn môn học"
                  className="w-full"
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDetailsStep;
