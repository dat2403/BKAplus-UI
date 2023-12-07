import React from "react";
import { AppRoute } from "../../models/enums/AppRoute";

interface IMostSearchSubject {
  title: string;
  link: string;
}

interface ICourse {
  imageUrl: string;
  title: string;
  description: string;

  //TODO: lastSeen
}

export const useMockData = () => {
  const mostSearchSubject = (): IMostSearchSubject[] => [
    {
      title: "Kinh tế chính trị Mac Lenin",
      //TODO
      link: ""
    },
    {
      title: "Lịch sử Đảng",
      //TODO
      link: ""
    },
    {
      title: "Tư tưởng Hồ Chí Minh",
      //TODO
      link: ""
    },
    {
      title: "Triết học Mác Lê nin",
      //TODO
      link: ""
    },
  ];

  const mayYouCareCourses: ICourse[] = [
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-2Msc76ZmVylsCcRjyCKgvw_M41C42BFxjegWjt47H_jApQZPICXcWyEdJsdSFTlQ_g&usqp=CAU",
      title: "Thực hành mạng máy tính",
      description: "Thực hành mạng máy tính Thực hành mạng máy tính"
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-2Msc76ZmVylsCcRjyCKgvw_M41C42BFxjegWjt47H_jApQZPICXcWyEdJsdSFTlQ_g&usqp=CAU",
      title: "Lập trình C",
      description: "Thực hành mạng máy tính Thực hành mạng máy tính"
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-2Msc76ZmVylsCcRjyCKgvw_M41C42BFxjegWjt47H_jApQZPICXcWyEdJsdSFTlQ_g&usqp=CAU",
      title: "Lập trình hướng đối tượng",
      description: "Thực hành mạng máy tính Thực hành mạng máy tính"
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-2Msc76ZmVylsCcRjyCKgvw_M41C42BFxjegWjt47H_jApQZPICXcWyEdJsdSFTlQ_g&usqp=CAU",
      title: "Giao diện người dùng",
      description: "Thực hành mạng máy tính Thực hành mạng máy tính"
    },
  ];

  return {
    mostSearchSubject,
    mayYouCareCourses
  };
};