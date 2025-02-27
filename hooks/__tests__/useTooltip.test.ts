import { renderHook } from '@testing-library/react';
import { useTooltip } from '../useTooltip';
import { TooltipContent } from '../../types/calculator';

describe('useTooltip', () => {
  it('should show and hide tooltip', () => {
    const { result } = renderHook(() => useTooltip());

    const mockElement = document.createElement('div');
    const mockContent: TooltipContent = {
      title: 'Test Title',
      description: 'Test Description',
      example: 'Test Example'
    };

    // Initial state check
    expect(result.current.tooltipVisible).toBe(false);
    expect(result.current.tooltipContent).toBe(null);

    // Show tooltip
    result.current.showTooltip(mockElement, mockContent);
    expect(result.current.tooltipVisible).toBe(true);
    expect(result.current.tooltipContent).toEqual(mockContent);

    // Hide tooltip
    result.current.hideTooltip();
    expect(result.current.tooltipVisible).toBe(false);
    expect(result.current.tooltipContent).toBe(null);
  });
});
