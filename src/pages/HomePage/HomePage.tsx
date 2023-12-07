import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import "./HomePage.scss";
import { useMockData } from "../../shared/utility/useMockData";


const HomePage: React.FC = () => {
  const { mostSearchSubject, mayYouCareCourses } = useMockData();
  return <div className="home-page-wrapper">
    <span className="p-input-icon-right search-box-container">
      <i className="pi pi-search" />
      <InputText placeholder="Tìm kiếm các khóa học, sách hoặc tài liệu" />
    </span>

    <div className="list">
      <div className="list-title">Học phần hay được tìm kiếm</div>
      {mostSearchSubject().map(subject => {
        return <div key={subject.title} className="list-item-wrapper">
          <i className="pi pi-folder"></i>
          <div className="item-right">
            {subject.title}
            <i className="pi pi-chevron-right" style={{ fontSize: "14px" }}></i>
          </div>
        </div>;
      })}
    </div>
    <div className="list-course">
      <div className="title-container">
        <div className="list-title">Có thể bạn quan tâm</div>
        <div className="view-all">Xem tất cả
          <i style={{ fontSize: "12px" }} className="pi pi-chevron-right"></i>
        </div>
      </div>

      <div className="list-course-content">
        {mayYouCareCourses.map(course => {
          return <div className="course-card">
            <img src={course.imageUrl} alt="course-img" className="course-image" />
            <div className="course-content">
              <div className="title">{course.title}</div>
              <div className="description">{course.description}</div>
            </div>
          </div>;
        })}
      </div>
    </div>
  </div>;
};

export default HomePage;
