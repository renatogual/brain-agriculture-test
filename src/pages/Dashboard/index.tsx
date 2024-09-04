import { Col, Flex, Row, Space } from "antd"
import { useFarm } from "../../contexts/FarmContext"
import Card from "../../components/Card"
import PieChart from "../../components/PieChart"


const Dashboard = () => {
    const { farms } = useFarm()

    const totalFarms = farms.length
    const totalArea = farms.reduce((sum, farm) => sum + farm.totalArea, 0);

    const statesData = farms.reduce((acc, farm) => {
        acc[farm.state] = (acc[farm.state] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const cropsData = farms.reduce((acc, farm) => {
        farm.crops.forEach(crop => {
            acc[crop] = (acc[crop] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    const landUseData = farms.reduce((acc, farm) => {
        acc['Agricultável'] = (acc['Agricultável'] || 0) + farm.arableArea;
        acc['Vegetação'] = (acc['Vegetação'] || 0) + farm.vegetationArea;
        return acc;
    }, {} as Record<string, number>);




    return (
        <Space direction="vertical" size={24}>
            <Row gutter={24}>
                <Col span={12}>
                    <Card title="Total de fazendas por estado">
                        <PieChart />
                    </Card>
                </Col>
                <Col span={12}>
                    <Space direction="vertical" size={24}>
                        <Card title="Total de fazendas em quantidade" total={totalFarms} />
                        <Card title="Total de fazendas em hectares (área total)" total={totalArea} />
                    </Space>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Card title="Total de fazendas por cultura">
                        <PieChart />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Total de fazendas por uso de solo">
                        <PieChart />
                    </Card>
                </Col>
            </Row>
        </Space>
    )
}

export default Dashboard