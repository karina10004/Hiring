// import {Flex} from 'antd';
// import { Menu } from 'antd';
// import {FireFilled, LoginOutlined, ProfileFilled, UserAddOutlined, UserOutlined, UsergroupAddOutlined} from '@ant-design/icons'
// import React from 'react';
// const Dashboard = () => {
//   return (
//     <>
//       <Flex align='center' justify="center">
//         <div className='logo'>
//           <FireFilled/>
//         </div>
//       </Flex>
//       <Menu mode = "inline" defaultSelectedKeys={['1']} className="menu-bar" items={[
//         {
//         key :'1',
//         icon:<UserOutlined/>,
//         label : 'Dashboard'
//       },
//       {
//         key :'2',
//         icon:<UserAddOutlined/>,
//         label : 'Add Employee'
//       },
//       {
//         key :'3',
//         icon:<ProfileFilled/>,
//         label : 'Profile'
//       },
//       {
//         key :'4',
//         icon:<UsergroupAddOutlined/>,
//         label : 'Add Hiring Process'
//       },
//       {
//         key :'5',
//         icon:<LoginOutlined/>,
//         label : 'Log out'
//       }
//       ]}/>
//     </>
//   )
// }
// export default Dashboard
import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        User
      </Menu.Item>
      <Menu.Item key="3" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="4" icon={<UserAddOutlined />}>
        <Link to={`/employee`}>Add Employee</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<UserAddOutlined />}>
        <Link to={`/hiring`}>Add Hiring Process</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
