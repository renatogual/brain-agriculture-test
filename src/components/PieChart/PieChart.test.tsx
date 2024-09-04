import { render } from '@testing-library/react';
import PieChart from './index';
import { Pie } from '@ant-design/plots';

jest.mock('@ant-design/plots', () => ({
    Pie: jest.fn(() => <div data-testid="mock-pie-chart" />),
}));

describe('PieChart component', () => {
    const mockData = [
        { key: 'A', value: 30 },
        { key: 'B', value: 70 },
    ];

    test('renders Pie with correct data', () => {
        render(<PieChart data={mockData} />);

        expect(Pie).toHaveBeenCalledWith(
            expect.objectContaining({
                data: mockData,
                angleField: 'value',
                colorField: 'key',
                label: expect.objectContaining({
                    text: 'key',
                    style: expect.objectContaining({
                        fontWeight: 'bold',
                    }),
                }),
                legend: false,
            }),
            {}
        );
    });
});
