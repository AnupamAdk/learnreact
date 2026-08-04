import React, { useState } from 'react';

export default function FinanceCalculator() {
  const [subtab, setSubtab] = useState('tip'); // 'tip' or 'discount'

  // Tip / Split states
  const [billAmount, setBillAmount] = useState('120');
  const [tipPercent, setTipPercent] = useState(15);
  const [numPeople, setNumPeople] = useState(3);

  // Discount states
  const [originalPrice, setOriginalPrice] = useState('100');
  const [discountPercent, setDiscountPercent] = useState('20');

  // Tip calculations
  const bill = parseFloat(billAmount) || 0;
  const tipAmount = (bill * tipPercent) / 100;
  const totalBill = bill + tipAmount;
  const perPerson = numPeople > 0 ? totalBill / numPeople : 0;

  // Discount calculations
  const origPrice = parseFloat(originalPrice) || 0;
  const disc = parseFloat(discountPercent) || 0;
  const saved = (origPrice * disc) / 100;
  const finalPrice = origPrice - saved;

  return (
    <div className="tool-panel">
      {/* Subtab Selector */}
      <div className="mode-tabs" style={{ width: '100%', marginBottom: '10px' }}>
        <button
          className={`mode-tab ${subtab === 'tip' ? 'active' : ''}`}
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => setSubtab('tip')}
        >
          Tip & Bill Split
        </button>
        <button
          className={`mode-tab ${subtab === 'discount' ? 'active' : ''}`}
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => setSubtab('discount')}
        >
          Discount & Savings
        </button>
      </div>

      {subtab === 'tip' ? (
        <>
          <div className="form-group">
            <label className="form-label">Bill Amount ($)</label>
            <input
              type="number"
              className="form-input"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tip Percentage ({tipPercent}%)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[10, 15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  className={`mode-tab ${tipPercent === pct ? 'active' : ''}`}
                  style={{ flex: 1, justifyContent: 'center', padding: '8px 0' }}
                  onClick={() => setTipPercent(pct)}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Split Among ({numPeople} people)</label>
            <input
              type="range"
              min="1"
              max="20"
              value={numPeople}
              onChange={(e) => setNumPeople(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--text-accent)' }}
            />
          </div>

          <div className="tool-result-box" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tip Total</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-accent)' }}>
                ${tipAmount.toFixed(2)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Per Person</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#10b981' }}>
                ${perPerson.toFixed(2)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="form-group">
            <label className="form-label">Original Price ($)</label>
            <input
              type="number"
              className="form-input"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Discount Percentage (%)</label>
            <input
              type="number"
              className="form-input"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
            />
          </div>

          <div className="tool-result-box" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>You Save</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f43f5e' }}>
                ${saved > 0 ? saved.toFixed(2) : '0.00'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Final Price</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#10b981' }}>
                ${finalPrice > 0 ? finalPrice.toFixed(2) : '0.00'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
