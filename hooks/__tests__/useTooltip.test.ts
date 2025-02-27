import { renderHook, act } from '@testing-library/react';
import { useTooltip } from '../useTooltip';

describe('useTooltip', () => {
  test('initial state is correct', () => {
    const { result } = renderHook(() => useTooltip());
    
    expect(result.current.tooltipVisible).toBe(false);
    expect(result.current.tooltipContent).toBeNull();
    expect(result.current.position).toEqual({ x: 0, y: 0 });
  });

  test('showTooltip updates state correctly', () => {
    const { result } = renderHook(() => useTooltip());
    const mockContent = { title: 'Test', description: 'Test desc' };
    const mockEvent = { clientX: 100, clientY: 200 } as React.MouseEvent;

    act(() => {
      result.current.showTooltip(mockContent, mockEvent);
    });

    expect(result.current.tooltipVisible).toBe(true);
    expect(result.current.tooltipContent).toEqual(mockContent);
    expect(result.current.position).toEqual({ x: 100, y: 200 });
  });

  test('hideTooltip resets visibility', () => {
    const { result } = renderHook(() => useTooltip());
    
    act(() => {
      result.current.hideTooltip();
    });

    expect(result.current.tooltipVisible).toBe(false);
  });
});
