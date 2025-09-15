import React from "react";
import "../../styles/learner/lessonCard.css";

interface LessonCardProps {
  title: string;
  subtitle: string;
  locked?: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ title, subtitle, locked }) => {
  return (
    <div className={`lesson-card ${locked ? "locked" : "active"}`}>
      <h4>{subtitle}</h4>
      <h3>{title}</h3>
    </div>
  );
};

export default LessonCard;
