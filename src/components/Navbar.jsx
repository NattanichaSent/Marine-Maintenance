import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LineChartOutlined,
    AppstoreOutlined,
    LogoutOutlined,
    BarChartOutlined,
    DotChartOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Avatar, Space } from 'antd';


const { Header, Sider, Content } = Layout;

const Navbar = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const menuItems = [
        {
            key: '1',
            icon: <LineChartOutlined />,
            label: 'TLT Dashboard',
        },
        {
            key: '2',
            icon: <BarChartOutlined />,
            label: 'ITS Dashboard',
        },
        {
            key: '3',
            icon: <DotChartOutlined />,
            label: 'HVM Dashboard',
        },
        {
            key: '5',
            icon: <UserOutlined />,
            label: 'Profile',
            style: { marginTop: 'auto' },
        },
        {
            key: '6',
            icon: <LogoutOutlined />,
            label: 'Log out',
        },
    ];

    const siderWidth = 250;
    const collapsedWidth = isMobile ? 0 : 80;

    return (
        <>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={collapsedWidth}
                width={siderWidth}
                breakpoint="sm"
                onBreakpoint={(broken) => setIsMobile(broken)}
                style={{
                    background: colorBgContainer,
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 100,
                    overflow: 'auto',
                }}
            >
                <div className="flex flex-col h-full">
                    <Menu
                        mode="inline"
                        selectable={false}
                        items={[
                            {
                                key: 'static-menu',
                                icon: <AppstoreOutlined />,
                                label: 'Menu',
                                onClick: () => { },
                                style: {
                                    cursor: 'default',
                                    backgroundColor: 'transparent',
                                    fontSize: '18px',
                                    color: '#000',

                                },
                            },
                        ]}
                    />
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={menuItems}
                        className="flex flex-col h-full"
                    />
                </div>
            </Sider>

            <Layout
                style={{
                    marginLeft: collapsed ? collapsedWidth : siderWidth,
                    transition: 'margin-left 0.2s',
                }}
            >
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 99,
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className='flex items-center justify-between'>
                        <div className='flex'>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <p>Marine Logo</p>
                        </div>
                        <div className='flex items-center gap-x-3 mr-5'>

                            {/* ซ่อนข้อมูลเมื่อ Sidebar ถูกเปิด (collapsed) และเป็นหน้าจอ sm */}
                            {!collapsed || !isMobile ? (
                                <Avatar style={{ backgroundColor: '#9ACBD0', color: '#006A71' }} className='font-bold'>A</Avatar>

                            ) : null}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ margin: 0, lineHeight: '20px' }}>Alexandra Kang</p>
                                <p style={{ margin: 0, lineHeight: '20px' }}>Admin</p>
                            </div>
                        </div>


                    </div>
                </Header>

                <Content style={{ padding: 24, minHeight: '100vh' }}>
                    {children}
                </Content>
            </Layout>
        </>
    );
};

export default Navbar;
