import { ReactNode } from "react"
import { Card as AntdCard, Typography } from "antd"

const { Title, Text } = Typography

interface CardProps {
    title: string
    total?: number
    children?: ReactNode
}

const Card = ({ title, total, children }: CardProps) => (
    <AntdCard>
        <Title level={3} style={{ fontWeight: 700 }}  >{title}</Title>
        {total && <Text style={{ fontSize: 24 }}>{total}</Text>}
        {children}
    </AntdCard>
)

export default Card