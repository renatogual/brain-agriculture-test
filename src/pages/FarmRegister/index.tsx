/* eslint-disable react-hooks/exhaustive-deps */
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Row,
    Col,
} from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Farm } from '../../types';
import { useFarm } from '../../contexts/FarmContext';
import { useEffect } from 'react';

const cropsOptions = [
    {
        label: 'Soja',
        value: 'soya'
    },
    {
        label: 'Milho',
        value: 'corn'
    },
    {
        label: 'Algodão',
        value: 'cotton'
    },
    {
        label: 'Café',
        value: 'coffee'
    },
    {
        label: 'Cana de Açucar',
        value: 'sugarCane'
    },
]

const FarmRegister = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams()
    const { farms, addFarm, editFarm } = useFarm()

    function handleSubmit(fieldsValue: Farm) {
        const action = id ? editFarm : addFarm
        const updatedValues = id ? { ...fieldsValue, id } : fieldsValue
        action(updatedValues)
        navigate('/farms')
    }

    useEffect(() => {
        if (!id) return

        const farmFounded = farms.find(farm => farm.id === id)
        form.setFieldsValue({ ...farmFounded, id })
    }, [id])

    return (
        <Form
            form={form}
            variant='outlined'
            layout='vertical'
            size='large'
            onFinish={handleSubmit}
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="CPF/CPNJ" name="cpfCnpj" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Área total em hectares da fazenda"
                        name="totalArea"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="Produtor" name="ownerName" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>

                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Área agricultável em hectares"
                        name="arableArea"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="Fazenda" name="farmName" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Área de vegetação em hectares"
                        name="vegetationArea"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="Cidade" name="city" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Culturas plantadas"
                        name="crops"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select
                            placeholder="Selecione a cultura plantada"
                            allowClear
                            mode="multiple"
                            options={cropsOptions}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="Estado" name="state" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12} />
            </Row>
            <Row justify='end' style={{ gap: 8 }}>
                <Link to="/farms">
                    <Button>Cancelar</Button>
                </Link>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Salvar
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default FarmRegister;