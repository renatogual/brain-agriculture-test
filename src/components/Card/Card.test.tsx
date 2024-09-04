import { render, screen } from '@testing-library/react';
import Card from './index';

describe('Card component', () => {
    test('renders title correctly', () => {
        const title = 'Test Title';
        render(<Card title={title} />);
        const titleElement = screen.getByText(title);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders total when provided', () => {
        const title = 'Test Title';
        const total = 100;
        render(<Card title={title} total={total} />);
        const totalElement = screen.getByText(total.toString());
        expect(totalElement).toBeInTheDocument();
    });

    test('does not render total when not provided', () => {
        const title = 'Test Title';
        render(<Card title={title} />);
        const totalElement = screen.queryByText(/^\d+$/);
        expect(totalElement).toBeNull();
    });

    test('renders children correctly', () => {
        const title = 'Test Title';
        const childrenText = 'This is a child component';
        render(
            <Card title={title}>
                <div>{childrenText}</div>
            </Card>
        );
        const childrenElement = screen.getByText(childrenText);
        expect(childrenElement).toBeInTheDocument();
    });
});
