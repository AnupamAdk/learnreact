import React from 'react';
import { IconDelete } from './Icons';

export default function Keypad({ onDigit, onOperator, onClear, onDelete, onEquals, onToggleSign, onPercent }) {
  return (
    <div className="keypad-grid">
      <button className="calc-btn btn-action" onClick={onClear}>AC</button>
      <button className="calc-btn btn-action" onClick={onToggleSign}>±</button>
      <button className="calc-btn btn-action" onClick={onPercent}>%</button>
      <button className="calc-btn btn-op" onClick={() => onOperator('÷')}>÷</button>

      <button className="calc-btn btn-num" onClick={() => onDigit('7')}>7</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('8')}>8</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('9')}>9</button>
      <button className="calc-btn btn-op" onClick={() => onOperator('×')}>×</button>

      <button className="calc-btn btn-num" onClick={() => onDigit('4')}>4</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('5')}>5</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('6')}>6</button>
      <button className="calc-btn btn-op" onClick={() => onOperator('−')}>−</button>

      <button className="calc-btn btn-num" onClick={() => onDigit('1')}>1</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('2')}>2</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('3')}>3</button>
      <button className="calc-btn btn-op" onClick={() => onOperator('+')}>+</button>

      <button className="calc-btn btn-num btn-zero" onClick={() => onDigit('0')}>0</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('.')}>.</button>
      <button className="calc-btn btn-action" onClick={onDelete}><IconDelete size={18} /></button>
      <button className="calc-btn btn-equals" onClick={onEquals}>=</button>
    </div>
  );
}
