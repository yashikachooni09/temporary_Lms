import React from "react";
import "./rules.css";
import {
  FaBookDead,
  FaBan,
  FaBellSlash,
  FaMobileAlt,
  FaUserClock,
  FaIdBadge,
  FaChair,
  FaClock,
} from "react-icons/fa";

export const Rules = () => {
  const rules = [
    {
      icon: <FaUserClock />,
      text: "A fine of ₹5 per book per day will be charged for late returns.",
    },
    {
      icon: <FaBan />,
      text: "Bags and personal belongings are not allowed inside the library.",
    },
    {
      icon: <FaBellSlash />,
      text: "Maintain silence at all times in the library.",
    },
    {
      icon: <FaMobileAlt />,
      text: "Use of mobile phones is strictly prohibited.",
    },
    {
      icon: <FaIdBadge />,
      text: "Students must carry their ID cards for issuing books.",
    },
    {
      icon: <FaBookDead />,
      text: "Damaged or lost books must be replaced or paid for.",
    },
    {
      icon: <FaChair />,
      text: "Seats are available on a first-come, first-served basis. No reservations.",
    },
    {
      icon: <FaClock />,
      text: "Return issued books within time to avoid penalties.",
    },
  ];

  return (
    <div className="rules-page">
      <h1 className="rules-title">📜 Library Rules & Regulations</h1>
      <p className="rules-subtitle">
        Please follow these guidelines to ensure a peaceful and productive library environment.
      </p>

      <div className="rules-list">
        {rules.map((rule, index) => (
          <div className="rule-item" key={index}>
            <span className="rule-icon">{rule.icon}</span>
            <span className="rule-text">{rule.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
