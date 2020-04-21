import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function LeftMenu() {
  return (
    <Menu mode="vertical">
      <Menu.Item>
        <Link to="/photos">Photos</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/collections">Collections</Link>
      </Menu.Item>
      {/* <Menu.Item>
        <Link to="users">Users</Link>
      </Menu.Item> */}
    </Menu>
  );
}
export default LeftMenu;
