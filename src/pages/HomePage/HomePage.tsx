import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import "./HomePage.scss";
import { useMockData } from "../../shared/utility/useMockData";
import { useUtils } from "../../shared/utility/Util.ts";
import { useNavigate } from "react-router-dom";
import usePageState from "../../hooks/usePageState.ts";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { SelectItem, SelectItemOptionsType } from "primereact/selectitem";
import { Empty } from "antd";
import {
  resetSelectedData,
  updateInitData,
  updateLecturerList,
  updateSelectedLecturer,
  updateSelectedSchool,
  updateSelectedSemester,
  updateSelectedSubject,
  updateSubjectList,
} from "../../store/slices/UploadFileSlice.ts";
import { useAppDispatch, useAppSelector } from "../../store/Store.ts";
import DocumentCard from "./DocumentCard.tsx";
import RecentDocumentCard from "./RecentDocumentCard.tsx";
import {
  updateSelectedCategoryName,
  updateSelectedFilteredCategory,
} from "../../store/slices/HomeSlice.ts";
import { modalActions } from "../../store/slices/ModalSlice.ts";

const HomePage: React.FC = () => {
  const { mostSearchSubject } = useMockData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { removeEmptyAndUndefinedParams } = useUtils();
  const navigate = useNavigate();
  const { repository } = usePageState();
  const [listDocs, setListDocs] = useState<any[]>([]);
  const [searchKey, setSearchKey] = React.useState("");
  const [isSearched, setIsSearched] = useState(false);
  // const [isShowFilterDialog, setIsShowFilterDialog] = React.useState(false);
  const {
    isFirstLoad,
    schoolList,
    lecturerList,
    subjectList,
    selectedSchool,
    selectedLecturer,
    selectedSubject,
    selectedSemester,
    semesterList,
  } = useAppSelector((state) => state.uploadFile);
  const { selectedCategory, selectedCategoryName } = useAppSelector((state) => state.home);
  const { isOpen: isShowFilterDialog } = useAppSelector((state) => state.model);
  //MOCK UI -> currently not working
  const sortOptions = [
    { name: "Nhiều lượt thích nhất", code: "mostlike" },
    { name: "Mới nhất", code: "newest" },
    { name: "Cũ nhất", code: "oldest" },
    { name: "Tài liệu uy tín", code: "verified" },
    { name: "Nhiều bình luận nhất", code: "most commented" },
    { name: "Ít bình luận nhất", code: "least commented" },
  ];

  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions?.[0]?.code);

  const [recentDocs, setRecentDocs] = React.useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [needFilter, setNeedFilter] = React.useState(false);
  const [filterKeyword, setFilterKeyword] = React.useState("");
  const fetchInitData = async () => {
    const res = await repository.getRecentDocs();
    setRecentDocs(res?.data?.data as any[]);
    const schoolRes = await repository.getSchoolList();
    const newSchoolList: SelectItem[] | undefined = schoolRes?.data?.map(
      (school) =>
        ({
          label: school.name,
          value: school.id,
        } as SelectItem)
    );
    const semesterRes = await repository.getSemesterList();
    const newSemesterList: SelectItem[] | undefined = semesterRes?.data?.map(
      (semester) =>
        ({
          label: semester.name,
          value: semester.id,
        } as SelectItem)
    );
    dispatch(
      updateInitData({
        schoolList: newSchoolList as SelectItemOptionsType,
        semesterList: newSemesterList as SelectItemOptionsType,
      })
    );
  };

  React.useEffect(() => {
    fetchInitData();

    // return () => {
    //   dispatch(resetHomeState())
    // }
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
          } as SelectItem)
      );
      const newSubjectList = subjectRes?.data?.map(
        (sub) =>
          ({
            label: sub.name,
            value: sub.id,
          } as SelectItem)
      );
      dispatch(updateLecturerList(newLecturerList as SelectItemOptionsType));
      dispatch(updateSubjectList(newSubjectList as SelectItemOptionsType));
    };
    if (!isFirstLoad && selectedSchool !== "") {
      fetchLecturerAndSubjectList();
    }
  }, [selectedSchool]);

  const fetchAllDocs = async () => {
    try {
      const params = {
        page: 0,
        per_page: 20,
        keyword: searchKey,
        category_id: selectedCategory,
      };
      const res = await repository.getAllDocs(params);
      if (searchKey !== "" || selectedCategory !== undefined) {
        setIsSearched(true);
      } else {
        setIsSearched(false);
      }
      const newDocsReverse = (res?.data?.data as any[])?.reverse()?.slice(0, 4);
      setListDocs(newDocsReverse);
    } catch (error) {
      //
    } finally {
      //
    }
  };

  const fetchFilteredData = async () => {
    try {
      const params = {
        page: 0,
        per_page: 20,
        lecturer_id: selectedLecturer,
        subject_id: selectedSubject,
        school_id: selectedSchool,
        keyword: filterKeyword,
        semester_id: selectedSemester,
      };

      const res = await repository.getAllDocs(params);
      setIsSearched(true);
      const newDocsReverse = (res?.data?.data as any[])?.reverse()?.slice(0, 4);
      setListDocs(newDocsReverse);
    } catch (error) {
      //
    } finally {
      //
    }
  };

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      fetchAllDocs();
    }, 300);
    return () => {
      clearTimeout(timeId);
    };
  }, [searchKey, selectedCategory]);

  React.useEffect(() => {
    fetchFilteredData();
  }, [needFilter]);

  const setIsShowFilterDialog = (isOpen: boolean) => dispatch(modalActions.setIsOpen(isOpen));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onHandleSearch = (event: any) => {
    setSearchKey(event.target.value);
  };

  const onHandleChangeKeyword = (event: any) => {
    setFilterKeyword(event.target.value);
  };

  const onApplyFilterCondition = () => {
    setNeedFilter(!needFilter);
    setIsShowFilterDialog(false);
  };

  const onResetFilter = () => {
    setFilterKeyword("");
    dispatch(resetSelectedData());
    // setIsSearched(false);
    // setIsFilterReset(!isFilterReset)
    // setIsShowFilterDialog(false);
  };

  const footerContent = (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end",
      }}
    >
      <Button
        label="Đóng"
        outlined
        severity={"secondary"}
        onClick={() => setIsShowFilterDialog(false)}
        // className="p-button-text"
      />
      <Button onClick={onResetFilter} severity="danger" label={"Đặt lại"} />
      <Button label="Tìm kiếm" icon="pi pi-search" onClick={onApplyFilterCondition} autoFocus />
    </div>
  );

  const renderFilterDialog = () => (
    <Dialog
      // header="Header"
      visible={isShowFilterDialog}
      // visible
      style={{ width: "50vw" }}
      onHide={() => setIsShowFilterDialog(false)}
      footer={footerContent}
    >
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          // maxWidth: "660px",
          gap: "30px",
        }}
      >
        <span style={{ width: "100%" }} className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={filterKeyword}
            onChange={onHandleChangeKeyword}
            style={{ width: "100%" }}
            placeholder="Nhập từ khóa (tên tài liệu, giảng viên, môn học)"
          />
        </span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            width: "100%",
            gap: "24px",
            paddingBottom: "40px",
          }}
        >
          <div
            style={{
              minWidth: "40%",
              flex: 1,
              gap: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>Khoa</div>
            <Dropdown
              value={selectedSchool}
              onChange={(e) => dispatch(updateSelectedSchool(e.value))}
              options={schoolList}
              optionLabel="label"
              optionValue="value"
              placeholder="Chọn khoa"
              className="w-full"
            />
          </div>
          <div
            style={{
              minWidth: "40%",
              flex: 1,
              gap: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>Học kỳ</div>
            <Dropdown
              value={selectedSemester}
              onChange={(e) => dispatch(updateSelectedSemester(e.value))}
              options={semesterList}
              optionLabel="label"
              optionValue="value"
              placeholder="Chọn học kỳ"
              className="w-full"
            />
          </div>
          {selectedSchool !== "" && (
            <React.Fragment>
              <div
                style={{
                  minWidth: "40%",
                  flex: 1,
                  gap: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>Giảng viên</div>
                <Dropdown
                  value={selectedLecturer}
                  onChange={(e) => dispatch(updateSelectedLecturer(e.value))}
                  options={lecturerList}
                  optionLabel="label"
                  optionValue="value"
                  placeholder={"Chọn giảng viên"}
                  className="w-full"
                />
              </div>
              <div
                style={{
                  minWidth: "40%",
                  flex: 1,
                  gap: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>Môn học</div>
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
    </Dialog>
  );

  const getSearchQuery = () => {
    if (searchKey) {
      return searchKey;
    } else if (selectedCategoryName) {
      return selectedCategoryName;
    } else return undefined;
  };

  return (
    <React.Fragment>
      <div className="home-page-wrapper">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <span className="p-input-icon-right search-box-container">
            <i className="pi pi-search" />
            <InputText
              placeholder="Tìm kiếm các khóa học, sách hoặc tài liệu"
              value={searchKey}
              // onChange={onHandleSearch}
              onClick={() => setIsShowFilterDialog(true)}
            />
          </span>
          <Button icon={"pi pi-filter"} onClick={() => setIsShowFilterDialog(true)} />
        </div>

        {isSearched ? (
          <React.Fragment>
            <div className="list-last-seen-document">
              <div className="title-container">
                <div className="list-title">
                  Đã tìm thấy {listDocs?.length} kết quả cho {getSearchQuery()}
                </div>
                <Dropdown
                  style={{
                    width: "250px",
                  }}
                  value={selectedSortOption}
                  onChange={(e) => setSelectedSortOption(e.value)}
                  options={sortOptions}
                  optionLabel="name"
                  optionValue="code"
                />
              </div>
              <div className="list-content">
                {listDocs?.length === 0 && (
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Empty description={"Không có dữ liệu"} />
                  </div>
                )}
                {listDocs &&
                  listDocs?.length > 0 &&
                  listDocs?.map((doc) => {
                    return <RecentDocumentCard key={doc?.id} doc={doc} />;
                  })}
              </div>
            </div>
            <div className="list-course">
              <div className="title-container">
                <div className="list-title">Có thể bạn quan tâm</div>
                <div
                  className="view-all"
                  onClick={() => {
                    navigate("/may-you-care");
                  }}
                >
                  Xem tất cả
                  <i style={{ fontSize: "12px" }} className="pi pi-chevron-right"></i>
                </div>
              </div>

              <div className="list-course-content">
                {listDocs?.length === 0 && (
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Empty description={"Không có dữ liệu"} />
                  </div>
                )}
                {listDocs &&
                  listDocs?.length > 0 &&
                  listDocs?.map((doc) => {
                    return <DocumentCard key={doc?.id} doc={doc} />;
                  })}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="list">
              <div className="list-title">Học phần hay được tìm kiếm</div>
              {mostSearchSubject().map((subject) => {
                return (
                  <div
                    key={subject.title}
                    className="list-item-wrapper"
                    onClick={() => {
                      dispatch(updateSelectedFilteredCategory(subject?.cateCode));
                      dispatch(updateSelectedCategoryName(subject?.title));
                    }}
                  >
                    <i className="pi pi-folder"></i>
                    <div className="item-right">
                      {subject.title}
                      <i className="pi pi-chevron-right" style={{ fontSize: "14px" }}></i>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="list-course">
              <div className="title-container">
                <div className="list-title">Có thể bạn quan tâm</div>
                <div
                  className="view-all"
                  onClick={() => {
                    navigate("/may-you-care");
                  }}
                >
                  Xem tất cả
                  <i style={{ fontSize: "12px" }} className="pi pi-chevron-right"></i>
                </div>
              </div>

              <div className="list-course-content">
                {listDocs?.length === 0 && (
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Empty description={"Không có dữ liệu"} />
                  </div>
                )}
                {listDocs &&
                  listDocs?.length > 0 &&
                  listDocs?.map((doc) => {
                    return <DocumentCard key={doc?.id} doc={doc} />;
                  })}
              </div>
            </div>
            <div className="list-last-seen-document">
              <div className="title-container">
                <div className="list-title">Được xem gần đây</div>
                <div
                  className="view-all"
                  onClick={() => {
                    navigate("/list-recent-docs");
                  }}
                >
                  Xem tất cả
                  <i style={{ fontSize: "12px" }} className="pi pi-chevron-right"></i>
                </div>
              </div>
              <div className="list-content">
                {recentDocs?.length === 0 && (
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Empty description={"Không có dữ liệu"} />
                  </div>
                )}

                {recentDocs &&
                  recentDocs?.length > 0 &&
                  recentDocs?.map((doc) => {
                    return <RecentDocumentCard key={doc?.document?.id} doc={doc?.document} />;
                  })}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      {renderFilterDialog()}
    </React.Fragment>
  );
};

export default HomePage;
