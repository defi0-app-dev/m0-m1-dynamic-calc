import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '../Calculator';

describe('Calculator Component', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test('renders calculator inputs', () => {
    expect(screen.getByPlaceholderText('Enter M0')).toBeInTheDocument();
  });

  test('shows tooltip on input hover', () => {
    const input = screen.getByPlaceholderText('Enter M0');
    
    fireEvent.mouseEnter(input);
    expect(screen.getByText('Monetary Base (M0)')).toBeInTheDocument();
    
    fireEvent.mouseLeave(input);
    expect(screen.queryByText('Monetary Base (M0)')).not.toBeInTheDocument();
  });

  test('handles input changes', () => {
    const input = screen.getByPlaceholderText('Enter M0');
    
    fireEvent.change(input, { target: { value: '1000' } });
    expect(input).toHaveValue(1000);
  });
});
