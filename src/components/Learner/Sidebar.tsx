import React from "react";
import "../..//styles/learner/sidebar.css";

type NavKey = "study" | "rank" | "exp" | "profile" | "settings";


export default function Sidebar({ active = "study" }: { active?: NavKey }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span style={{filter:"drop-shadow(0 1px 0 rgba(83, 54, 54, 0.13))"}}>WiseOwl</span>
      </div>

      <nav className="nav">
        <a className={`nav-item ${active==="study" ? "active":""}`} href="#">
          <span className="nav-ico">🏠</span> <span>Học tập</span> 
        </a>
        <a className={`nav-item ${active==="rank" ? "active":""}`} href="#">
          <span className="nav-ico">🏆</span> <span>Bảng xếp hạng</span>
        </a>
        <a className={`nav-item ${active==="exp" ? "active":""}`} href="#">
          <span className="nav-ico">⚡</span> <span>Điểm kinh nghiệp</span>
        </a>
        <a className={`nav-item ${active==="profile" ? "active":""}`} href="#">
          <span className="nav-ico">👤</span> <span>Hồ sơ</span>
        </a>
        <a className={`nav-item ${active==="settings" ? "active":""}`} href="#">
          <span className="nav-ico">⚙️</span> <span>Cài đặt</span>
        </a>
      </nav>

    </aside>
  );
}