import React from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Terminal,
  AlertTriangle,
  ArrowUpRight,
  UserPlus,
  HelpCircle,
} from "lucide-react";
import "./BottomBar.css";

export const BottomBar = () => {
  return (
    <div className="stripe-bottom-bar">
      {/* Developers Link - Left Side */}
      <div className="bottom-bar-left">
        <Link to="#" className="bottom-bar-link">
          <Code2 className="bottom-bar-icon" />
          <span className="bottom-bar-text">Developers</span>
        </Link>
      </div>

      {/* Icons - Right Side */}
      <div className="bottom-bar-icons">
        <button className="bottom-bar-icon-btn" aria-label="API" title="API">
          <Terminal />
        </button>
        <button className="bottom-bar-icon-btn" aria-label="Alerts" title="Alerts">
          <AlertTriangle />
        </button>
        <button className="bottom-bar-icon-btn" aria-label="Shortcuts" title="Shortcuts">
          <ArrowUpRight />
        </button>
        <button className="bottom-bar-icon-btn" aria-label="Team" title="Team">
          <UserPlus />
        </button>
        <button className="bottom-bar-icon-btn" aria-label="Help" title="Help">
          <HelpCircle />
        </button>
      </div>
    </div>
  );
};

