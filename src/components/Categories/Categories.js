import React from 'react'
import { Tabs } from 'antd';
import { Redirect } from 'react-router-dom';

const { TabPane } = Tabs;

export default function Categories() {

    const callback = (key) => {
        if (key == 1) {
            return <Redirect to='/collections' />

        }
    }

    return (
        <div>
            <Tabs onTabClick={callback} defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div >
    )
}
