import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import {
    PieChartOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import Farms from '../pages/Farms';
import FarmRegister from '../pages/FarmRegister';

const { Sider, Content } = Layout;

const Home = () => <h2>Home Page</h2>;

const AppRoutes = () => (
    <Router>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                        <Link to="/farms">Fazendas</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '16px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/farms" element={<Outlet />}>
                            <Route index element={<Farms />} />
                            <Route path="register" element={<FarmRegister />} />
                        </Route>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    </Router>
);

export default AppRoutes;
