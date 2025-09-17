import React, { useState } from "react";
import "./AccordionLesson.css";

interface SubLesson {
  icon: string;
  label: string;
}

interface Unit {
  title: string;
  name: string;
  subLessons: SubLesson[];
  locked?: boolean;
}

const AccordionLesson: React.FC<{ units: Unit[] }> = ({ units }) => {
  const [openUnit, setOpenUnit] = useState<number | null>(null);

  return (
    <>
      {units.map((unit, unitIdx) => (
        <div key={unitIdx} className="unit-block">
          <div
            className={`lesson-card ${unit.locked ? "locked" : "active"}`}
            onClick={() => {
              if (!unit.locked) setOpenUnit(openUnit === unitIdx ? null : unitIdx);
            }}
            style={{ cursor: unit.locked ? "not-allowed" : "pointer" }}
          >
            <div style={{ fontSize: 13, fontWeight: 600 }}>{unit.title}</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{unit.name}</div>
          </div>
          {openUnit === unitIdx && !unit.locked && (
            <div className="sub-lessons-list">
              {unit.subLessons.map((sub, idx) => (
                <button
                  key={idx}
                  className={`sub-lesson-btn${idx === 0 ? " active" : " locked"}`}
                  disabled={idx !== 0}
                >
                  <span className="sub-lesson-ico">{sub.icon}</span>
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default AccordionLesson;