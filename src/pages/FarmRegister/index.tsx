/* eslint-disable react-hooks/exhaustive-deps */
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Row,
    Col,
    Space,
    Typography
} from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Farm } from '../../types';
import { useFarm } from '../../contexts/FarmContext';
import { ChangeEvent, useEffect, useState } from 'react';
import { isCnpjValid, isCpfValid } from '../../utils';

const { Title } = Typography

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

    const [inputValue, setInputValue] = useState('');

    const pageTitle = id ? 'Editar fazenda:' : 'Adicionar fazenda:'
    const requiredMessage = 'Campo obrigatório'

    function handleSubmit(fieldsValue: Farm) {
        const action = id ? editFarm : addFarm
        const updatedValues = id ? { ...fieldsValue, id } : fieldsValue
        action(updatedValues)
        navigate('/farms')
    }

    function validateCPFOrCNPJ(_: any, value: string) {
        const cleanedValue = value.replace(/\D/g, '');
        if (!value) {
            return Promise.reject(new Error('Campo obrigatório'));
        } else if (cleanedValue.length <= 11 && !isCpfValid(value)) {
            return Promise.reject(new Error('CPF inválido'));
        } else if (cleanedValue.length > 11 && !isCnpjValid(value)) {
            return Promise.reject(new Error('CNPJ inválido'));
        }
        return Promise.resolve();
    };

    const handleCpfOrCnpjChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, '');

        if (value.length > 14) {
            value = value.slice(0, 14);
        }

        if (value.length <= 11) {
            // Apply CPF mask
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
            // Apply CNPJ mask
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
        }

        setInputValue(value);
        form.setFieldsValue({ cpfCnpj: value });
    };

    useEffect(() => {
        if (!id) return

        const farmFounded = farms.find(farm => farm.id === id)
        form.setFieldsValue({ ...farmFounded, id })
    }, [id])

    return (
        <Space direction='vertical' style={{ width: '100%' }}>
            <Title level={4}>{pageTitle}</Title>
            <Form
                form={form}
                variant='outlined'
                layout='vertical'
                size='large'
                onFinish={handleSubmit}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="CPF ou CNPJ" name="cpfCnpj" rules={[{ validator: validateCPFOrCNPJ }]}>
                            <Input
                                value={inputValue}
                                onChange={handleCpfOrCnpjChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Área total em hectares da fazenda"
                            name="totalArea"
                            rules={[{ required: true, message: requiredMessage }]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="Produtor" name="ownerName" rules={[{ required: true, message: requiredMessage }]}>
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Área agricultável em hectares"
                            name="arableArea"
                            rules={[{ required: true, message: requiredMessage }]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="Fazenda" name="farmName" rules={[{ required: true, message: requiredMessage }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Área de vegetação em hectares"
                            name="vegetationArea"
                            rules={[{ required: true, message: requiredMessage }]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="Cidade" name="city" rules={[{ required: true, message: requiredMessage }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Culturas plantadas"
                            name="crops"
                            rules={[{ required: true, message: requiredMessage }]}
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
                        <Form.Item label="Estado" name="state" rules={[{ required: true, message: requiredMessage }]}>
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
        </Space>
    );
};

export default FarmRegister;