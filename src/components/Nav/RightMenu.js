import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function RightMenu() {

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="about">
                    <Link to='/about'>About</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}
export default RightMenu;