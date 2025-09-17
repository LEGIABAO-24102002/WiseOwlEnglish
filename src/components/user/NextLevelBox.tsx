import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/NextLevelBox.css";

interface NextLevelBoxProps {
  allLessonsUnlocked: boolean;
  nextLevel: number;
}

const NextLevelBox: React.FC<NextLevelBoxProps> = ({ allLessonsUnlocked, nextLevel }) => {
  const navigate = useNavigate();

  function handleContinue() {
    if (allLessonsUnlocked) {
      // Điều hướng sang level kế
      navigate(`/lessons/${nextLevel}`);
      // Không thể chỉnh state trang đích ở đây, nhưng LessonsPage đã có logic
      // auto-open Unit 1 khi level chưa có tiến trình, nên vào level mới sẽ tự mở Unit 1.
    }
  }

  return (
    <div className="next-level-box">
      <div className="next-level-label">KẾ TIẾP</div>
      <div className="next-level-title">Lớp {nextLevel}</div>
      <div className="next-level-desc">Học từ, cụm từ và câu mẫu cơ bản</div>
      <button
        className={`next-level-btn${allLessonsUnlocked ? " active" : ""}`}
        disabled={!allLessonsUnlocked}
        onClick={handleContinue}
      >
        TIẾP TỤC
      </button>
    </div>
  );
};

export default NextLevelBox;