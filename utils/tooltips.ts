import { TooltipContent } from '../types/calculator';

export const CALCULATOR_TOOLTIPS: Record<string, TooltipContent> = {
  m0: {
    title: 'Monetary Base (M0)',
    description: 'The total amount of physical currency in circulation plus reserves',
    example: 'Example: $1,000,000'
  },
  reserveRatio: {
    title: 'Reserve Ratio',
    description: 'Percentage of deposits banks must hold as reserves',
    example: 'Example: 10% means banks must keep 10% of deposits'
  },
  velocity: {
    title: 'Velocity of Money',
    description: 'The rate at which money changes hands in an economy',
    example: 'Example: 2 means each dollar is spent twice per period'
  }
};
