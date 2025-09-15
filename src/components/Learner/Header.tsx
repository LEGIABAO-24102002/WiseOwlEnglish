// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import "../../styles/Header.css";

// const Header: React.FC = () => {
//   const { levelId } = useParams<{ levelId: string }>();

//   return (
//     <div className="header">
//       <div className="level-tabs">
//         <Link to="/lessons/1">
//           <button className={`tab tab-green ${levelId === "1" ? "active" : ""}`}>Lớp 1</button>
//         </Link>
//         <Link to="/lessons/2">
//           <button className={`tab tab-blue ${levelId === "2" ? "active" : ""}`}>Lớp 2</button>
//         </Link>
//         <Link to="/lessons/3">
//           <button className={`tab tab-purple ${levelId === "3" ? "active" : ""}`}>Lớp 3</button>
//         </Link>
//         <Link to="/lessons/4">
//           <button className={`tab tab-pink ${levelId === "4" ? "active" : ""}`}>Lớp 4</button>
//         </Link>
//         <Link to="/lessons/5">
//           <button className={`tab tab-red ${levelId === "5" ? "active" : ""}`}>Lớp 5</button>
//         </Link>
//       </div>
//       <div className="header-info">
//         <span className="points">⚡ 1651</span>
//         <span className="avatar">🦉</span>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/learner/header.css";

const Header: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLevel = event.target.value;
    navigate(`/lessons/${newLevel}`);
  };

  return (
    <div className="header">
      <div className="level-select">
        <label htmlFor="level" className="level-label">Chọn lớp học: </label>
        <select
          id="level"
          value={levelId || "1"}
          onChange={handleChange}
          className="level-dropdown"
        >
          <option value="1">Lớp 1</option>
          <option value="2">Lớp 2</option>
          <option value="3">Lớp 3</option>
          <option value="4">Lớp 4</option>
          <option value="5">Lớp 5</option>
        </select>
      </div>
      
      <div className="header-info">
        <span className="points">⚡1651</span>
        <span className="user-avatar">🦉</span>
      </div>
    </div>
  );
};

export default Header;