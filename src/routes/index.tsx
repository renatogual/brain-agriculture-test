import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import {
    PieChartOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';

import Dashboard from '../pages/Dashboard';
import Farms from '../pages/Farms';
import FarmRegister from '../pages/FarmRegister';

const { Sider, Content } = Layout;

const menuItems = [
    {
        key: '1',
        icon: <PieChartOutlined />,
        label: <Link to="/">Dashboard</Link>,
    },
    {
        key: '2',
        icon: <UnorderedListOutlined />,
        label: <Link to="/farms">Fazendas</Link>,
    },
];

const AppRoutes = () => (
    <Router>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <Menu theme="dark" mode="vertical" items={menuItems} />
            </Sider>
            <Layout>
                <Content style={{ margin: '16px' }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/farms" element={<Outlet />}>
                            <Route index element={<Farms />} />
                            <Route path="register/:id?" element={<FarmRegister />} />
                        </Route>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    </Router>
);

export default AppRoutes;
