import { InputText } from "primereact/inputtext";
import React from "react";
import "./HomePage.scss";
import { useMockData } from "../../shared/utility/useMockData";
import { Chip } from "primereact/chip";
import { useUtils } from "../../shared/utility/Util.ts";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../models/enums/AppRoute.ts";

const HomePage: React.FC = () => {
  const { mostSearchSubject, mayYouCareCourses, lastSeenDocuments } = useMockData();
  const { getPercentageOfLikes } = useUtils();
  const navigate = useNavigate();
  return (
    <div className="home-page-wrapper">
      <span className="p-input-icon-right search-box-container">
        <i className="pi pi-search" />
        <InputText placeholder="Tìm kiếm các khóa học, sách hoặc tài liệu" />
      </span>

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
          {lastSeenDocuments.map((doc) => {
            return (
              <div
                key={doc.title}
                className="doc-card"
                onClick={() => {
                  navigate(`${AppRoute.SubjectDocs}/TruongCNTT/123456`);
                }}
              >
                <img className="thumbnail" src={doc.thumbnail} alt="last-seen-img" />
                <div className="doc-text-content">
                  <div className="doc-title">{doc.title}</div>
                  <div className={"tags-container"}>
                    {doc.tags?.slice(0, 2).map((tag, index) => <Chip key={index} label={tag} />)}
                  </div>
                </div>
                <div className="like-container">
                  <Chip
                    icon={"pi pi-thumbs-up-fill"}
                    label={`${getPercentageOfLikes(doc.liked, doc.disliked).toString()}% (${
                      doc.liked
                    })`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
