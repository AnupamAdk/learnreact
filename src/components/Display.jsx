import React from 'react';
import { formatWithCommas } from '../utils/calculator';

export default function Display({ expression, value, angleUnit, hasMemory, mode }) {
  // Dynamically shrink font for long numbers
  const displayVal = formatWithCommas(value || '0');
  let fontSizeClass = '2.2rem';
  if (displayVal.length > 14) {
    fontSizeClass = '1.3rem';
  } else if (displayVal.length > 9) {
    fontSizeClass = '1.7rem';
  }

  return (
    <div className="calc-display">
      <div className="display-meta">
        <div style={{ display: 'flex', gap: '6px' }}>
          {hasMemory && <span className="display-badge">M</span>}
          {mode === 'scientific' && <span className="display-badge">{angleUnit}</span>}
        </div>
        <span style={{ opacity: 0.7 }}>React Calc</span>
      </div>

      <div className="display-expression">
        {expression || '\u00A0'}
      </div>

      <div className="display-result" style={{ fontSize: fontSizeClass }}>
        {displayVal}
      </div>
    </div>
  );
}
