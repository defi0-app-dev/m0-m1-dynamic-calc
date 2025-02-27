import { useState, useCallback } from 'react';
import { TooltipContent } from '../types/calculator';

export const useTooltip = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const showTooltip = useCallback((content: TooltipContent, event: React.MouseEvent) => {
    setTooltipContent(content);
    setPosition({ x: event.clientX, y: event.clientY });
    setTooltipVisible(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltipVisible(false);
  }, []);

  return {
    tooltipVisible,
    tooltipContent,
    position,
    showTooltip,
    hideTooltip
  };
};
