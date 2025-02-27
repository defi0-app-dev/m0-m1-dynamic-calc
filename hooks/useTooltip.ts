import { useState } from 'react';
import { TooltipContent } from '../types/calculator';

export const useTooltip = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (element: HTMLElement, content: TooltipContent) => {
    const rect = element.getBoundingClientRect();
    setPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 5
    });
    setTooltipContent(content);
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
    setTooltipContent(null);
  };

  return {
    tooltipVisible,
    tooltipContent,
    position,
    showTooltip,
    hideTooltip
  };
};
