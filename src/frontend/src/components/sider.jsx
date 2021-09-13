import React, {useState} from 'react'
import styles from "../styles/client.module.css";
import LogoComprimido from "../assets/images/switch.svg";
import Logo from "../assets/images/logo.svg";
import useWindowDimensions from "./windowsDimensions";
import {Layout, Menu} from "antd";
import {FileOutlined, PieChartOutlined, TeamOutlined} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";

const SiderMenu = () => {

    const {Sider} = Layout;
    const {SubMenu} = Menu;

    const {width} = useWindowDimensions();
    const [collapsed, setCollapsed] = useState(false)

    const sider = () => (
        <>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<TeamOutlined/>}>
                    Students
                </Menu.Item>
                <Menu.Item key="2" icon={<PieChartOutlined/>}>
                    Statistics
                </Menu.Item>
                <SubMenu key="sub1" icon={<TeamOutlined/>} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </>
    )

    return (
        <>
            {width <= 700 ?
                <Sider
                    collapsed={true}>
                    <div className={styles.logo}>
                        <img src={LogoComprimido} alt={"logo"} width={40} height={50}/>
                    </div>
                    {sider()}
                </Sider> :
                <Sider
                    collapsible collapsed={collapsed}
                    onCollapse={setCollapsed}
                >
                    <div className={styles.logo}>
                        {collapsed ? <img src={LogoComprimido} alt={"logo"} width={40} height={50}/> :
                            <img src={Logo} alt={"logo"} width={100} height={50}/>}
                    </div>
                    {sider()}
                </Sider>
            }

        </>

    )

}
export default SiderMenu;