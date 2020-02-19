import React from "react";
import { Spin } from "antd";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="Spinner">
      <Spin size="large" />
    </div>
  );
}
