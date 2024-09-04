import { Col, Flex, Row, Space } from "antd"
import { useFarm } from "../../contexts/FarmContext"
import Card from "../../components/Card"
import PieChart from "../../components/PieChart"


const Dashboard = () => {
    const { farms } = useFarm()

    const totalFarms = farms.length
    const totalArea = farms.reduce((sum, farm) => sum + farm.totalArea, 0);

    const statesAmount = farms.reduce((acc, farm) => {
        acc[farm.state] = (acc[farm.state] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const statesData = Object.entries(statesAmount).map(([key, value]) => ({ key, value }));

    const cropsAmount = farms.reduce((acc, farm) => {
        farm.crops.forEach(crop => {
            acc[crop] = (acc[crop] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    const cropsData = Object.entries(cropsAmount).map(([key, value]) => ({ key, value }));

    const landUseAmount = farms.reduce((acc, farm) => {
        acc['Agricultável'] = (acc['Agricultável'] || 0) + farm.arableArea;
        acc['Vegetação'] = (acc['Vegetação'] || 0) + farm.vegetationArea;
        return acc;
    }, {} as Record<string, number>);

    const landUseData = Object.entries(landUseAmount).map(([key, value]) => ({ key, value }));

    return (
        <Space direction="vertical" size={24}>
            <Row gutter={24}>
                <Col span={12}>
                    <Space direction="vertical" size={24}>
                        <Card title="Total de fazendas" total={totalFarms} />
                    </Space>
                </Col>
                <Col span={12}>
                    <Space direction="vertical" size={24}>
                        <Card title="Área total de fazendas em hectares" total={totalArea} />
                    </Space>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={12} lg={8}>
                    <Card title="Total de fazendas por estado">
                        <PieChart data={statesData} />
                    </Card>
                </Col>
                <Col xs={12} lg={8}>
                    <Card title="Total de fazendas por cultura plantada">
                        <PieChart data={cropsData} />
                    </Card>
                </Col>
                <Col xs={12} lg={8}>
                    <Card title="Total de fazendas por uso de solo">
                        <PieChart data={landUseData} />
                    </Card>
                </Col>
            </Row>
        </Space>
    )
}

export default Dashboard