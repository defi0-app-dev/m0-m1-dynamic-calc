import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { useTooltip } from '../hooks/useTooltip';
import { CALCULATOR_TOOLTIPS } from '../utils/tooltips';
import { CalculatorInputs } from '../types/calculator';
import '../styles/tooltips.css';
import '../styles/Calculator.css';
import styles from './Calculator.module.css';

interface Position {
  x: number;
  y: number;
}

interface TooltipContent {
  title: string;
  description: string;
  example?: string;
}

type CalculatorOperator = '+' | '-' | '*' | '/' | '=';
type CalculatorInput = string | CalculatorOperator;

interface TooltipProps {
  position: Position;
  content: TooltipContent;
}

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [operator, setOperator] = useState<CalculatorOperator | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const { tooltipVisible, tooltipContent, position, showTooltip, hideTooltip } = useTooltip();

  const calculateResult = (a: number, b: number, op: CalculatorOperator): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : NaN;
      default: return b;
    }
  };

  const handleClick = (input: CalculatorInput) => {
    if (typeof input === 'string' && /\d/.test(input)) {
      if (waitingForSecondOperand) {
        setDisplay(input);
        setWaitingForSecondOperand(false);
      } else {
        setDisplay(display === '0' ? input : display + input);
      }
      return;
    }

    switch (input) {
      case 'C':
        setDisplay('');
        setCurrentValue(0);
        setOperator(null);
        setWaitingForSecondOperand(false);
        break;
      case '=':
        if (operator && !waitingForSecondOperand) {
          const result = calculateResult(currentValue, parseFloat(display), operator);
          setDisplay(Number.isFinite(result) ? result.toString() : 'Error');
          setCurrentValue(0);
          setOperator(null);
          setWaitingForSecondOperand(true);
        }
        break;
      default:
        if (operator && !waitingForSecondOperand) {
          const result = calculateResult(currentValue, parseFloat(display), operator);
          setDisplay(Number.isFinite(result) ? result.toString() : 'Error');
          setCurrentValue(result);
        } else {
          setCurrentValue(parseFloat(display));
        }
        setOperator(input as CalculatorOperator);
        setWaitingForSecondOperand(true);
        break;
    }
  };

  const tooltipStyles: React.CSSProperties = {
    left: position.x,
    top: position.y
  };

  return (
    <div className={styles.calculator} role="application" aria-label="Calculator">
      <div className={styles.display}>
        <input
          type="text"
          value={display}
          readOnly
          aria-label="Calculator display"
          className={styles.displayInput}
        />
      </div>
      <div className={styles.keypad}>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter M0"
            onMouseEnter={(e: React.MouseEvent) => showTooltip(CALCULATOR_TOOLTIPS.m0, e)}
            onMouseLeave={hideTooltip}
            aria-label="M0 input"
          />
        </div>
        
        {tooltipVisible && tooltipContent && (
          <div 
            className={`${styles.tooltipWrapper} tooltip-custom-wrapper tooltip-custom-offset`}
            role="tooltip"
            style={tooltipStyles}
          >
            <div className="tooltip-custom">
              <h6>{tooltipContent.title}</h6>
              <p>{tooltipContent.description}</p>
              {tooltipContent.example && (
                <small className="text-muted">{tooltipContent.example}</small>
              )}
            </div>
          </div>
        )}

        {[
          ['7', '8', '9', '/'],
          ['4', '5', '6', '*'],
          ['1', '2', '3', '-'],
          ['0', 'C', '=', '+']
        ].map((row, i) => (
          <div key={i} className={styles.buttonRow}>
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn as CalculatorInput)}
                className={styles.button}
                aria-label={btn === '=' ? 'Calculate' : btn}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
