import React from 'react';
import { IconDelete } from './Icons';

export default function ScientificKeypad({
  onDigit,
  onOperator,
  onClear,
  onDelete,
  onEquals,
  onToggleSign,
  onSciFunc,
  onConstant,
  angleUnit,
  onToggleAngle,
  onMemory
}) {
  return (
    <div className="keypad-grid scientific-grid">
      {/* Row 1: Memory & Angle */}
      <button className="calc-btn btn-sci" onClick={() => onMemory('MC')}>MC</button>
      <button className="calc-btn btn-sci" onClick={() => onMemory('MR')}>MR</button>
      <button className="calc-btn btn-sci" onClick={() => onMemory('M+')}>M+</button>
      <button className="calc-btn btn-sci" onClick={() => onMemory('M-')}>M-</button>
      <button className="calc-btn btn-sci" onClick={onToggleAngle} style={{ color: 'var(--text-accent)' }}>
        {angleUnit}
      </button>

      {/* Row 2: Scientific Trig */}
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('sin')}>sin</button>
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('cos')}>cos</button>
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('tan')}>tan</button>
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('fact')}>x!</button>
      <button className="calc-btn btn-action" onClick={onClear}>AC</button>

      {/* Row 3: Inverse Trig / Powers */}
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('asin')}>sin⁻¹</button>
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('acos')}>cos⁻¹</button>
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('atan')}>tan⁻¹</button>
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('pow')}>xʸ</button>
      <button className="calc-btn btn-action" onClick={onDelete}><IconDelete size={16} /></button>

      {/* Row 4: Log / Sqrt */}
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('log')}>log</button>
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('ln')}>ln</button>
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('sqrt')}>√x</button>
      <button className="calc-btn btn-sci" onClick={() => onSciFunc('sqr')}>x²</button>
      <button className="calc-btn btn-op" onClick={() => onOperator('÷')}>÷</button>

      {/* Row 5: Constants & Numbers */}
      <button className="calc-btn btn-sci" onClick={() => onConstant('π')}>π</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('7')}>7</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('8')}>8</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('9')}>9</button>
      <button className="calc-btn btn-op" onClick={() => onOperator('×')}>×</button>

      {/* Row 6: Constant e & Numbers */}
      <button className="calc-btn btn-sci" onClick={() => onConstant('e')}>e</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('4')}>4</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('5')}>5</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('6')}>6</button>
      <button className="calc-btn btn-op" onClick={() => onOperator('−')}>−</button>

      {/* Row 7: Parens & Numbers */}
      <button className="calc-btn btn-sci" onClick={() => onDigit('(')}>(</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('1')}>1</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('2')}>2</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('3')}>3</button>
      <button className="calc-btn btn-op" onClick={() => onOperator('+')}>+</button>

      {/* Row 8: Closing Paren, 0, dot, equals */}
      <button className="calc-btn btn-sci" onClick={() => onDigit(')')}>)</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('0')}>0</button>
      <button className="calc-btn btn-num" onClick={() => onDigit('.')}>.</button>
      <button className="calc-btn btn-action" onClick={onToggleSign}>±</button>
      <button className="calc-btn btn-equals" onClick={onEquals}>=</button>
    </div>
  );
}
