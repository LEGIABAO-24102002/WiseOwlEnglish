import React from "react";
import Sidebar from "../../components/user/Sidebar";
import Header from "../../components/user/Header";
import LessonCard from "../../components/user/LessonCard";
import "../../styles/user/homePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <LessonCard subtitle="Lớp 1, Bài học 1" title="Getting Started" />
        <LessonCard subtitle="Lớp 1, Bài học 2" title="My Family" />
        <LessonCard subtitle="Lớp 1, Bài học 3" title="Colors" />
        <LessonCard subtitle="Lớp 1, Bài học 4" title="My Body" />
        <LessonCard subtitle="Lớp 1, Bài học 5" title="School"  />
      </div>
    </div>
  );
};

export default HomePage;
