import { Link } from "react-router-dom";
import { Button, Flex, Space, Table, TableProps } from "antd"
import { Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { DataType } from "./types";

const { Title } = Typography;

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Produtor',
        dataIndex: 'farmer',
        key: 'farmer',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Fazenda',
        dataIndex: 'farm',
        key: 'farm',
    },
    {
        title: 'Ação',
        key: 'action',
        render: () => (
            <Space size="middle">
                <Button icon={<EditOutlined />} />
                <Button icon={<DeleteOutlined />} />
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        farm: 'John Brown',
        farmer: 'Fazenda 1',
    },
    {
        key: '2',
        farm: 'John Brown',
        farmer: 'Fazenda 2',
    },
    {
        key: '3',
        farm: 'John Brown',
        farmer: 'Fazenda 3',
    },
];

const Farms = () => {
    return (
        <Flex vertical>
            <Flex style={{ gap: 8 }}>
                <Title level={4}>Fazendas</Title>
                <Link to="register">
                    <Button icon={<PlusOutlined />} />
                </Link>
            </Flex>
            <Table columns={columns} dataSource={data} pagination={false} />
        </Flex>
    )
}

export default Farms