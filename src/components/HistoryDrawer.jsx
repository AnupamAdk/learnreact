import React from 'react';
import { IconClose, IconTrash } from './Icons';

export default function HistoryDrawer({ isOpen, onClose, history, onSelectHistory, onClearHistory }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="history-drawer">
        <div className="drawer-header">
          <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>History Log</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {history.length > 0 && (
              <button
                className="icon-btn"
                onClick={onClearHistory}
                title="Clear History"
                style={{ color: '#f43f5e' }}
              >
                <IconTrash size={16} />
              </button>
            )}
            <button className="icon-btn" onClick={onClose} title="Close">
              <IconClose size={18} />
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
            No calculations yet
          </div>
        ) : (
          <div className="history-list">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="history-item"
                onClick={() => onSelectHistory(item)}
              >
                <div className="history-expr">{item.expression} =</div>
                <div className="history-res">{item.result}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
