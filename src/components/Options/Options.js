import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function Options(props) {
    return (
        <div>
            <Select defaultValue="Latest" style={{ width: 120 }} onChange={props.handleOptionChange}>
                <Option value="latest">Latest</Option>
                <Option value="oldest">Oldest</Option>
                <Option value="popular">Popular</Option>
            </Select>
        </div>
    )
}
