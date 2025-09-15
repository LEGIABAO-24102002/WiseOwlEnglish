import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LessonCard from "../../components/learner/LessonCard";
import Sidebar from "../../components/learner/Sidebar";
import Header from "../../components/learner/Header";
import NextLevelBox from "../../components/learner/NextLevelBox";
import "../../styles/learner/lessonsPage.css";
import "../../styles/learner/AccordionLesson.css";

const lessonsData: Record<string, { subtitle: string; title: string }[]> = {
  "1": [
    { subtitle: "UNIT 1", title: "Getting Started" },
    { subtitle: "UNIT 2", title: "My Family" },
    { subtitle: "UNIT 3", title: "Colors" },
    { subtitle: "UNIT 4", title: "My Body" },
    { subtitle: "UNIT 5", title: "School" },
  ],
  "2": [
    { subtitle: "UNIT 1", title: "Animals" },
    { subtitle: "UNIT 2", title: "Food" },
    { subtitle: "UNIT 3", title: "Weather" },
    { subtitle: "UNIT 4", title: "School" },
    { subtitle: "UNIT 5", title: "School" },
  ],
  "3": [
    { subtitle: "UNIT 1", title: "Clothes" },
    { subtitle: "UNIT 2", title: "Transport" },
    { subtitle: "UNIT 3", title: "School" },
    { subtitle: "UNIT 4", title: "School" },
    { subtitle: "UNIT 5", title: "School" },
  ],
  "4": [
    { subtitle: "UNIT 1", title: "Daily Routines" },
    { subtitle: "UNIT 2", title: "Sports" },
    { subtitle: "UNIT 3", title: "School" },
    { subtitle: "UNIT 4", title: "School" },
    { subtitle: "UNIT 5", title: "School" },
    { subtitle: "UNIT 6", title: "School" },
  ],
  "5": [
    { subtitle: "UNIT 1", title: "Future Plans" },
    { subtitle: "UNIT 2", title: "Technology" },
    { subtitle: "UNIT 3", title: "Smart" },
    { subtitle: "UNIT 4", title: "Happy" },
    { subtitle: "UNIT 5", title: "School" },
    { subtitle: "UNIT 6", title: "School" },
  ],
};

const LessonsPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const currentLevel = levelId || "1";
  const lessons = lessonsData[currentLevel] || [];

  // Accordion state: cho phép mở nhiều unit cùng lúc
  const [openUnits, setOpenUnits] = useState<Set<number>>(new Set());
  // refs cho từng unit để scroll vào tầm nhìn khi mở unit kế tiếp
  const unitRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pendingScrollIndex, setPendingScrollIndex] = useState<number | null>(null);

  // Lưu unit đã hoàn thành (completed) theo level
  const completedUnitsKey = useMemo(() => `woe_completed_units_${currentLevel}`, [currentLevel]);
  const [completedUnits, setCompletedUnits] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem(completedUnitsKey);
      return new Set(raw ? (JSON.parse(raw) as number[]) : []);
    } catch {
      return new Set<number>();
    }
  });

  // Lưu tiến trình subLesson của "unit đang học" theo level
  // Giá trị: số subLesson đã hoàn thành (0..n). SubLesson có thể học tiếp theo là index === count.
  const subProgressKey = useMemo(() => `woe_sub_progress_${currentLevel}`, [currentLevel]);
  const [subProgress, setSubProgress] = useState<Record<number, number>>(() => {
    try {
      const raw = localStorage.getItem(subProgressKey);
      return raw ? (JSON.parse(raw) as Record<number, number>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    // đổi level → reload progress
    try {
      const rawUnits = localStorage.getItem(completedUnitsKey);
      setCompletedUnits(new Set(rawUnits ? (JSON.parse(rawUnits) as number[]) : []));
    } catch {
      setCompletedUnits(new Set<number>());
    }
    try {
      const rawSub = localStorage.getItem(subProgressKey);
      setSubProgress(rawSub ? (JSON.parse(rawSub) as Record<number, number>) : {});
    } catch {
      setSubProgress({});
    }
  // Reset tất cả unit về trạng thái đóng khi đổi level.
  // Nếu level hiện tại CHƯA có bất kỳ tiến trình nào (chưa completed unit nào và chưa có subProgress)
  // VÀ level đã được mở khóa, thì mặc định mở Unit 1 để hiển thị sublesson đầu (available).
    try {
      const rawUnits = localStorage.getItem(completedUnitsKey);
      const completedArr: number[] = rawUnits ? JSON.parse(rawUnits) : [];
      const rawSub = localStorage.getItem(subProgressKey);
      const subProg = rawSub ? (JSON.parse(rawSub) as Record<number, number>) : {};
      const hasAnyProgress = completedArr.length > 0 || Object.keys(subProg).length > 0;
      if (!hasAnyProgress && isLevelUnlocked) {
        setOpenUnits(new Set([0]));
      } else {
        setOpenUnits(new Set());
      }
    } catch {
      setOpenUnits(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedUnitsKey, subProgressKey]);

  useEffect(() => {
    localStorage.setItem(completedUnitsKey, JSON.stringify(Array.from(completedUnits)));
  }, [completedUnits, completedUnitsKey]);

  useEffect(() => {
    localStorage.setItem(subProgressKey, JSON.stringify(subProgress));
  }, [subProgress, subProgressKey]);

  // Khi có pendingScrollIndex và phần tử đã render, cuộn mượt đến unit đó
  useEffect(() => {
    if (pendingScrollIndex != null) {
      const el = unitRefs.current[pendingScrollIndex];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setPendingScrollIndex(null);
      }
    }
  }, [pendingScrollIndex, openUnits]);

  // Mẫu các subLesson trong một unit
  const subLessonTemplate = useMemo(
    () => [
      { icon: "📖", label: "HỌC TỪ VỰNG" },
      { icon: "🕹️", label: "ÔN TẬP TỪ VỰNG" },
      { icon: "💬", label: "HỌC MẪU CÂU" },
      { icon: "🎯", label: "ÔN TẬP MẪU CÂU" },
      { icon: "✅", label: "KIỂM TRA BÀI HỌC" },
    ],
    []
  );

  // Xác định "unit đang học": unit đầu tiên chưa completed
  const currentActiveUnitIndex = useMemo(() => {
    const idx = lessons.findIndex((_, i) => !completedUnits.has(i));
    return idx === -1 ? lessons.length : idx; // nếu tất cả completed
  }, [lessons, completedUnits]);

  // Nút "Tiếp tục" sáng khi tất cả unit đã hoàn thành (của level hiện tại)
  const allLessonsUnlocked = lessons.length > 0 && completedUnits.size >= lessons.length;
  const maxLevel = useMemo(() => Math.max(...Object.keys(lessonsData).map(n => Number(n))), []);
  const nextLevel = Number(currentLevel) + 1;
  // Khóa liên cấp: level > 1 chỉ mở khi level trước đã hoàn thành toàn bộ unit
  const isLevelUnlocked = useMemo(() => {
    const n = Number(currentLevel);
    if (!Number.isFinite(n) || n <= 1) return true;
    const prev = String(n - 1);
    const prevLessons = lessonsData[prev] || [];
    try {
      const raw = localStorage.getItem(`woe_completed_units_${prev}`);
      const completedPrev: number[] = raw ? JSON.parse(raw) : [];
      // Nếu level trước không có unit nào, coi như mở khóa
      return completedPrev.length >= prevLessons.length;
    } catch {
      return false;
    }
  }, [currentLevel]);

  const showNextLevelBox = nextLevel <= maxLevel;

  return (
    <div className="lessons-container">
      <Sidebar />
      <div className="lessons-content">
        <Header />

        

        {lessons.map((lesson, index) => {
          const isCompleted = completedUnits.has(index);
          const isCurrent = index === currentActiveUnitIndex;
          // số subLesson đã hoàn thành trong unit (mặc định 0)
          const doneCount = subProgress[index] ?? 0;
          // Nếu level bị khóa: tất cả unit hiển thị xám.
          // Nếu level đã mở: unit xanh khi đã hoàn thành, hoặc là unit hiện tại, hoặc đã học >= 1 sublesson.
          const unitLockedForStyle = !isLevelUnlocked
            ? true
            : !(isCompleted || isCurrent || doneCount >= 1);

          return (
            <div
              key={index}
              className="unit-block"
              ref={el => {
                unitRefs.current[index] = el;
              }}
            >
              {/* Header unit */}
              <div
                onClick={() => {
                  // Cho phép mở/đóng để xem sublesson kể cả khi level bị khóa (view-only)
                  setOpenUnits(prev => {
                    const next = new Set(prev);
                    if (next.has(index)) {
                      next.delete(index);
                    } else {
                      next.add(index);
                    }
                    return next;
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <LessonCard
                  subtitle={lesson.subtitle}
                  title={lesson.title}
                  locked={unitLockedForStyle}
                />
              </div>

              {/* Danh sách subLesson có thể xem khi mở, kể cả level bị khóa (view-only) */}
              {openUnits.has(index) && (
                <div className="sub-lessons-list">
                  {subLessonTemplate.map((sub, subIdx) => {
                    // Trạng thái subLesson:
                    // - completed: khi unit đã hoàn thành hoặc subIdx < doneCount
                    // - available: chỉ đúng 1 bước kế tiếp của unit đang học (subIdx === doneCount)
                    // - locked: các trường hợp còn lại hoặc khi level bị khóa
                    let subStatus: "completed" | "available" | "locked" = "locked";
                    if (isLevelUnlocked) {
                      if (isCompleted) {
                        subStatus = "completed";
                      } else if (isCurrent) {
                        if (currentLevel === "1" && index === 0) {
                          // Chỉ cho phép sublesson đầu của Unit 1 Lớp 1 là available nếu chưa có tiến trình
                          if (doneCount === 0) {
                            subStatus = subIdx === 0 ? "available" : "locked";
                          } else {
                            // nếu đã có tiến trình thì theo tiến trình bình thường
                            if (subIdx < doneCount) subStatus = "completed";
                            else if (subIdx === doneCount) subStatus = "available";
                            else subStatus = "locked";
                          }
                        } else {
                          // các unit khác: theo tiến trình bình thường
                          if (subIdx < doneCount) subStatus = "completed";
                          else if (subIdx === doneCount) subStatus = "available";
                          else subStatus = "locked";
                        }
                      } else {
                        subStatus = "locked";
                      }
                    } else {
                      subStatus = "locked";
                    }

                    return (
                      <button
                        key={subIdx}
                        className={`sub-lesson-btn ${subStatus}`}
                        disabled={subStatus === "locked"}
                        onClick={() => {
                          if (subStatus !== "available" || !isLevelUnlocked) return; // chỉ bước kế tiếp mới tiến độ

                          // DEMO: hoàn thành subLesson đang học → tăng doneCount chỉ khi bấm đúng bước kế tiếp
                          if (isCurrent) {
                            const total = subLessonTemplate.length;
                            if (subIdx === doneCount) {
                              const next = doneCount + 1;

                              // Hoàn tất unit
                              if (next >= total) {
                                setCompletedUnits(prev => {
                                  const n = new Set(prev);
                                  n.add(index);
                                  return n;
                                });
                                setSubProgress(prev => {
                                  const n = { ...prev };
                                  delete n[index];
                                  return n;
                                });
                                // Mở unit kế tiếp để sublesson 1 của unit đó sáng ngay
                                const nextUnitIndex = index + 1;
                                if (nextUnitIndex < lessons.length) {
                                  setOpenUnits(prevOpen => new Set([...prevOpen, nextUnitIndex]));
                                  // Đặt cờ scroll tới unit kế tiếp sau khi render
                                  setPendingScrollIndex(nextUnitIndex);
                                }
                              } else {
                                setSubProgress(prev => ({ ...prev, [index]: next }));
                              }
                            }
                          }

                          // Điều hướng: đã gỡ bỏ theo yêu cầu revert lần gần nhất
                        }}
                      >
                        <span className="sub-lesson-ico">{sub.icon}</span>
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Box "Kế tiếp" */}
        {showNextLevelBox && (
          <NextLevelBox allLessonsUnlocked={allLessonsUnlocked} nextLevel={nextLevel} />
        )}
      </div>
    </div>
  );
};

export default LessonsPage;
