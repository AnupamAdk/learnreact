import React, { useState } from 'react';
import { CONVERSION_CATEGORIES, convertUnit } from '../utils/unitConverter';

export default function UnitConverter() {
  const [category, setCategory] = useState('Length');
  const [fromUnit, setFromUnit] = useState(CONVERSION_CATEGORIES['Length'].units[0]);
  const [toUnit, setToUnit] = useState(CONVERSION_CATEGORIES['Length'].units[1]);
  const [inputValue, setInputValue] = useState('1');

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const catData = CONVERSION_CATEGORIES[cat];
    setFromUnit(catData.units[0]);
    setToUnit(catData.units[1] || catData.units[0]);
  };

  const convertedValue = convertUnit(inputValue, category, fromUnit, toUnit);

  return (
    <div className="tool-panel">
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {Object.keys(CONVERSION_CATEGORIES).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Input Value</label>
        <input
          type="number"
          className="form-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="form-group">
          <label className="form-label">From</label>
          <select
            className="form-select"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {CONVERSION_CATEGORIES[category].units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">To</label>
          <select
            className="form-select"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {CONVERSION_CATEGORIES[category].units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="tool-result-box">
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
          Converted Result
        </div>
        <div className="tool-result-val">
          {convertedValue || '0'}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {toUnit}
        </div>
      </div>
    </div>
  );
}
