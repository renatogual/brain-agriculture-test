import { Link, useNavigate } from "react-router-dom";
import { Button, Flex, Modal, Space, Table, TableProps } from "antd"
import { Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { useFarm } from "../../contexts/FarmContext";
import { Farm } from "../../types";

const { Title } = Typography;
const { confirm } = Modal;

const Farms = () => {
    const navigate = useNavigate();
    const { farms, deleteFarm } = useFarm()

    const columns: TableProps<Farm>['columns'] = [
        {
            title: 'Produtor',
            dataIndex: 'ownerName',
            key: 'ownerName',
        },
        {
            title: 'Fazenda',
            dataIndex: 'farmName',
            key: 'farmName',
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, data) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEditFarm(data.id)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteFarm(data.id)} />
                </Space>
            ),
        },
    ];

    function handleEditFarm(id: string) {
        navigate(`/farms/register/${id}`)
    }

    function handleDeleteFarm(id: string) {
        confirm({
            title: 'Você tem certeza que deseja deletar este item?',
            icon: <ExclamationCircleFilled />,
            okType: 'danger',
            okText: 'Sim',
            cancelText: 'Cancelar',
            onOk() {
                deleteFarm(id);
            },
        });
    };

    return (
        <Flex vertical>
            <Flex style={{ gap: 8 }}>
                <Title level={4}>Fazendas</Title>
                <Link to="register">
                    <Button icon={<PlusOutlined />} />
                </Link>
            </Flex>
            <Table columns={columns} dataSource={farms} pagination={false} />
        </Flex>
    )
}

export default Farms