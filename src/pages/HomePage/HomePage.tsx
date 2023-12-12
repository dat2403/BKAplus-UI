import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import "./HomePage.scss";
import { useMockData } from "../../shared/utility/useMockData";
import { Chip } from "primereact/chip";
import { useUtils } from "../../shared/utility/Util.ts";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../models/enums/AppRoute.ts";
import usePageState from "../../hooks/usePageState.ts";
import { Dropdown } from "primereact/dropdown";

const HomePage: React.FC = () => {
  const { mostSearchSubject, mayYouCareCourses, defaultThumbnail } = useMockData();
  const { getPercentageOfLikes } = useUtils();
  const navigate = useNavigate();
  const { repository } = usePageState();
  const [listDocs, setListDocs] = useState<any[]>([]);
  const [searchKey, setSearchKey] = React.useState('');
  const [isSearched, setIsSearched] = useState(false);

  //MOCK UI -> currently not working
  const sortOptions = [
    { name: 'Nhiều lượt thích nhất', code: 'mostlike' },
    { name: 'Mới nhất', code: 'newest' },
    { name: 'Cũ nhất', code: 'oldest' },
    { name: 'Tài liệu uy tín', code: 'verified' },
    { name: 'Nhiều bình luận nhất', code: 'most commented' },
    { name: 'Ít bình luận nhất', code: 'least commented' }
  ];

  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions?.[0]?.code);

  const fetchAllDocs = async () => {
    try {
      const res = await repository.getAllDocs(0, 5, searchKey);
      if (searchKey !== "") {
        setIsSearched(true);
      } else {
        setIsSearched(false);
      }
      setListDocs(res?.data as any[]);
    } catch (error) {

    } finally {

    }
  };

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      fetchAllDocs();
    }, 300);
    return () => {
      clearTimeout(timeId);
    };
  }, [searchKey]);

  const onHandleSearch = (event: any) => {
    setSearchKey(event.target.value);
  }

  return (
    <div className="home-page-wrapper">
      <span className="p-input-icon-right search-box-container">
        <i className="pi pi-search" />
        <InputText
          placeholder="Tìm kiếm các khóa học, sách hoặc tài liệu"
          value={searchKey}
          onChange={onHandleSearch}
        // onBlur={() => {
        //   
        // }} 
        />
      </span>
      {isSearched ? (<React.Fragment>
        <div className="list-last-seen-document">
          <div className="title-container">
            <div className="list-title">Đã tìm thấy {listDocs?.length} kết quả cho <strong style={{ fontWeight: "700", fontSize: "20px" }}>{searchKey}</strong></div>
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
            {listDocs?.map((doc) => {
              return (
                <div
                  key={doc?.title}
                  className="doc-card"
                  onClick={() => {
                    navigate(`${AppRoute.SubjectDocs}/TruongCNTT/${doc?.id}`);
                  }}
                >
                  <img className="thumbnail" src={doc?.thumbnail ?? defaultThumbnail} alt="last-seen-img" />
                  <div className="doc-text-content">
                    <div className="doc-title">{doc?.title}</div>
                    <div className={"tags-container"}>
                      {doc?.categories?.slice(0, 2).map((cate: any) => <Chip key={cate?.id} label={cate?.name} />)}
                    </div>
                  </div>
                  <div className="like-container">
                    <Chip
                      icon={"pi pi-thumbs-up-fill"}
                      label={`${getPercentageOfLikes(doc?.liked, doc?.disliked).toString()}% (${doc?.liked ?? 100
                        })`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="list-course">
          <div className="title-container">
            <div className="list-title">Có thể bạn quan tâm</div>
            <div className="view-all">
              Xem tất cả
              <i style={{ fontSize: "12px" }} className="pi pi-chevron-right"></i>
            </div>
          </div>

          <div className="list-course-content">
            {mayYouCareCourses.map((course) => {
              return (
                <div key={course.title} className="course-card">
                  <img src={course.imageUrl} alt="course-img" className="course-image" />
                  <div className="course-content">
                    <div className="title">{course.title}</div>
                    <div className="description">{course.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>) : (<React.Fragment>
          <div className="list">
            <div className="list-title">Học phần hay được tìm kiếm</div>
            {mostSearchSubject().map((subject) => {
              return (
                <div key={subject.title} className="list-item-wrapper">
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
              <div className="view-all">
                Xem tất cả
                <i style={{ fontSize: "12px" }} className="pi pi-chevron-right"></i>
              </div>
            </div>

            <div className="list-course-content">
              {mayYouCareCourses.map((course) => {
                return (
                  <div key={course.title} className="course-card">
                    <img src={course.imageUrl} alt="course-img" className="course-image" />
                    <div className="course-content">
                      <div className="title">{course.title}</div>
                      <div className="description">{course.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="list-last-seen-document">
            <div className="title-container">
              <div className="list-title">Được xem gần đây</div>
              <div className="view-all">
                Xem tất cả
                <i style={{ fontSize: "12px" }} className="pi pi-chevron-right"></i>
              </div>
            </div>
            <div className="list-content">
              {listDocs?.map((doc) => {
                return (
                  <div
                    key={doc?.title}
                    className="doc-card"
                    onClick={() => {
                      navigate(`${AppRoute.SubjectDocs}/TruongCNTT/${doc?.id}`);
                    }}
                  >
                    <img className="thumbnail" src={doc?.thumbnail ?? defaultThumbnail} alt="last-seen-img" />
                    <div className="doc-text-content">
                      <div className="doc-title">{doc?.title}</div>
                      <div className={"tags-container"}>
                        {doc?.categories?.slice(0, 2).map((cate: any) => <Chip key={cate?.id} label={cate?.name} />)}
                      </div>
                    </div>
                    <div className="like-container">
                      <Chip
                        icon={"pi pi-thumbs-up-fill"}
                        label={`${getPercentageOfLikes(doc?.liked, doc?.disliked).toString()}% (${doc?.liked ?? 100
                          })`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </React.Fragment>)}

    </div>
  );
};

export default HomePage;

