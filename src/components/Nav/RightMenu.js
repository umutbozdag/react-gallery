import React from "react";
import { Menu } from "antd";

function RightMenu() {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="about"></Menu.Item>
      </Menu>
    </div>
  );
}
export default RightMenu;
