import React from 'react';
import { IconPalette } from './Icons';

export default function ThemeSelector({ currentTheme, onSelectTheme }) {
  const themes = [
    { id: 'dark', label: 'Dark Glass', color: '#6366f1' },
    { id: 'cyber', label: 'Cyber Neon', color: '#06b6d4' },
    { id: 'midnight', label: 'Midnight', color: '#a855f7' },
    { id: 'light', label: 'Soft Light', color: '#38bdf8' }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <IconPalette size={16} style={{ color: 'var(--text-secondary)' }} />
      <div style={{ display: 'flex', gap: '6px' }}>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelectTheme(t.id)}
            title={t.label}
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: t.color,
              border: currentTheme === t.id ? '2px solid #fff' : '2px solid transparent',
              cursor: 'pointer',
              boxShadow: currentTheme === t.id ? `0 0 8px ${t.color}` : 'none',
              transition: 'all 0.2s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}
