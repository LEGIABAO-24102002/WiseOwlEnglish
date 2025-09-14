import React from "react";
import { useParams } from "react-router-dom";
import LessonCard from "../../components/Learner/LessonCard";
import Sidebar from "../../components/Learner/Sidebar";
import Header from "../../components/Learner/Header";
import "../../styles/LessonsPage.css";

const lessonsData: Record<string, { subtitle: string; title: string; locked?: boolean }[]> = {
  "1": [
    { subtitle: "Lớp 1, Bài học 1", title: "Getting Started" },
    { subtitle: "Lớp 1, Bài học 2", title: "My Family" },
    { subtitle: "Lớp 1, Bài học 3", title: "Colors" },
    { subtitle: "Lớp 1, Bài học 4", title: "My Body" },
    { subtitle: "Lớp 1, Bài học 5", title: "School", locked: true },
  ],
  "2": [
    { subtitle: "Lớp 2, Bài học 1", title: "Animals" , locked: true },
    { subtitle: "Lớp 2, Bài học 2", title: "Food" , locked: true },
    { subtitle: "Lớp 2, Bài học 3", title: "Weather" , locked: true },
    { subtitle: "Lớp 2, Bài học 4", title: "School", locked: true },
    { subtitle: "Lớp 2, Bài học 5", title: "School", locked: true },
  ],
  "3": [
    { subtitle: "Lớp 3, Bài học 1", title: "Clothes" , locked: true },
    { subtitle: "Lớp 3, Bài học 2", title: "Transport" , locked: true },
    { subtitle: "Lớp 3, Bài học 3", title: "School", locked: true },
    { subtitle: "Lớp 3, Bài học 4", title: "School", locked: true },
    { subtitle: "Lớp 3, Bài học 5", title: "School", locked: true },
  ],
  "4": [
    { subtitle: "Lớp 4, Bài học 1", title: "Daily Routines" , locked: true },
    { subtitle: "Lớp 4, Bài học 2", title: "Sports", locked: true },
    { subtitle: "Lớp 4, Bài học 3", title: "School", locked: true },
    { subtitle: "Lớp 4, Bài học 4", title: "School", locked: true },
    { subtitle: "Lớp 4, Bài học 5", title: "School", locked: true },
    { subtitle: "Lớp 4, Bài học 6", title: "School", locked: true },
  ],
  "5": [
    { subtitle: "Lớp 5, Bài học 1", title: "Future Plans", locked: true },
    { subtitle: "Lớp 5, Bài học 2", title: "Technology", locked: true },
    { subtitle: "Lớp 5, Bài học 3", title: "School", locked: true },
    { subtitle: "Lớp 5, Bài học 4", title: "School", locked: true },
  ],
};

const LessonsPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const lessons = lessonsData[levelId || "1"] || [];

  return (
    <div className="lessons-container">
      <Sidebar />
      <div className="lessons-content">
        <Header />
        {lessons.map((lesson, index) => (
          <LessonCard
            key={index}
            subtitle={lesson.subtitle}
            title={lesson.title}
            locked={lesson.locked}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
