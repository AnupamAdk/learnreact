import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import ScientificKeypad from './components/ScientificKeypad';
import UnitConverter from './components/UnitConverter';
import FinanceCalculator from './components/FinanceCalculator';
import HistoryDrawer from './components/HistoryDrawer';
import ThemeSelector from './components/ThemeSelector';
import {
  IconCalculator,
  IconFlask,
  IconScale,
  IconPercent,
  IconHistory,
  IconVolume,
  IconVolumeMute
} from './components/Icons';
import { evaluateExpression, formatResult } from './utils/calculator';
import { soundFx } from './utils/audio';

export default function App() {
  const [mode, setMode] = useState('standard'); // 'standard' | 'scientific' | 'converter' | 'finance'
  const [theme, setTheme] = useState('dark');
  const [expression, setExpression] = useState('');
  const [currentValue, setCurrentValue] = useState('0');
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [angleUnit, setAngleUnit] = useState('DEG');
  const [memoryVal, setMemoryVal] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // History Log
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Sync sound toggle
  useEffect(() => {
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Sync theme class to body
  useEffect(() => {
    document.body.className = theme === 'dark' ? '' : `theme-${theme}`;
  }, [theme]);

  // Input Handlers
  const handleDigit = (digit) => {
    soundFx.playClick(650, 0.04);
    if (isEvaluated) {
      setCurrentValue(digit === '.' ? '0.' : digit);
      setExpression('');
      setIsEvaluated(false);
      return;
    }

    if (digit === '.') {
      if (currentValue.includes('.')) return;
      setCurrentValue(currentValue + '.');
    } else {
      if (currentValue === '0' || currentValue === 'Error') {
        setCurrentValue(digit);
      } else {
        setCurrentValue(currentValue + digit);
      }
    }
  };

  const handleOperator = (op) => {
    soundFx.playOperator();
    if (isEvaluated) {
      setExpression(`${currentValue} ${op} `);
      setCurrentValue('0');
      setIsEvaluated(false);
      return;
    }

    setExpression(`${expression}${currentValue} ${op} `);
    setCurrentValue('0');
  };

  const handleClear = () => {
    soundFx.playClear();
    setExpression('');
    setCurrentValue('0');
    setIsEvaluated(false);
  };

  const handleDelete = () => {
    soundFx.playClick(500, 0.03);
    if (isEvaluated) {
      handleClear();
      return;
    }
    if (currentValue.length > 1) {
      setCurrentValue(currentValue.slice(0, -1));
    } else {
      setCurrentValue('0');
    }
  };

  const handleToggleSign = () => {
    soundFx.playClick(700, 0.04);
    if (currentValue === '0' || currentValue === 'Error') return;
    if (currentValue.startsWith('-')) {
      setCurrentValue(currentValue.substring(1));
    } else {
      setCurrentValue('-' + currentValue);
    }
  };

  const handlePercent = () => {
    soundFx.playClick(750, 0.04);
    const num = parseFloat(currentValue);
    if (isNaN(num)) return;
    const res = num / 100;
    setCurrentValue(res.toString());
  };

  const handleEquals = () => {
    const fullExpr = `${expression}${currentValue}`;
    if (!fullExpr.trim()) return;

    const rawResult = evaluateExpression(fullExpr, angleUnit);
    const formatted = typeof rawResult === 'number' ? formatResult(rawResult) : 'Error';

    if (formatted === 'Error') {
      soundFx.playError();
    } else {
      soundFx.playEquals();
    }

    setCurrentValue(formatted);
    setExpression(`${fullExpr} =`);
    setIsEvaluated(true);

    if (formatted !== 'Error') {
      setHistory((prev) => [
        { expression: fullExpr, result: formatted, timestamp: Date.now() },
        ...prev
      ]);
    }
  };

  // Scientific functions e.g. sin, log, sqrt, etc.
  const handleSciFunc = (fnName) => {
    soundFx.playOperator();
    const val = parseFloat(currentValue) || 0;

    if (fnName === 'sqr') {
      const res = val * val;
      setCurrentValue(formatResult(res));
      setExpression(`(${currentValue})²`);
      setIsEvaluated(true);
    } else if (fnName === 'pow') {
      setExpression(`${expression}${currentValue}^`);
      setCurrentValue('0');
      setIsEvaluated(false);
    } else {
      setExpression(`${fnName}(${currentValue})`);
      const rawRes = evaluateExpression(`${fnName}(${currentValue})`, angleUnit);
      setCurrentValue(formatResult(rawRes));
      setIsEvaluated(true);
    }
  };

  const handleConstant = (constSymbol) => {
    soundFx.playClick(800, 0.04);
    const val = constSymbol === 'π' ? Math.PI : Math.E;
    setCurrentValue(formatResult(val));
    setIsEvaluated(false);
  };

  // Memory functions
  const handleMemory = (memAction) => {
    soundFx.playClick(900, 0.05);
    const num = parseFloat(currentValue) || 0;
    if (memAction === 'MC') setMemoryVal(null);
    if (memAction === 'MR') {
      if (memoryVal !== null) setCurrentValue(formatResult(memoryVal));
    }
    if (memAction === 'M+') setMemoryVal((prev) => (prev || 0) + num);
    if (memAction === 'M-') setMemoryVal((prev) => (prev || 0) - num);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'SELECT'].includes(document.activeElement.tagName)) return;

      if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
      else if (e.key === '.') handleDigit('.');
      else if (e.key === '+') handleOperator('+');
      else if (e.key === '-') handleOperator('−');
      else if (e.key === '*') handleOperator('×');
      else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') handleDelete();
      else if (e.key === 'Escape') handleClear();
      else if (e.key === '%') handlePercent();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentValue, expression, isEvaluated, angleUnit]);

  return (
    <div className={`calculator-card ${mode === 'scientific' ? 'wide-mode' : ''}`}>
      {/* Header Bar */}
      <div className="calc-header">
        {/* Navigation Tabs */}
        <div className="mode-tabs">
          <button
            className={`mode-tab ${mode === 'standard' ? 'active' : ''}`}
            onClick={() => setMode('standard')}
            title="Standard Calculator"
          >
            <IconCalculator size={15} />
            <span>Standard</span>
          </button>
          <button
            className={`mode-tab ${mode === 'scientific' ? 'active' : ''}`}
            onClick={() => setMode('scientific')}
            title="Scientific Calculator"
          >
            <IconFlask size={15} />
            <span>Sci</span>
          </button>
          <button
            className={`mode-tab ${mode === 'converter' ? 'active' : ''}`}
            onClick={() => setMode('converter')}
            title="Unit Converter"
          >
            <IconScale size={15} />
            <span>Convert</span>
          </button>
          <button
            className={`mode-tab ${mode === 'finance' ? 'active' : ''}`}
            onClick={() => setMode('finance')}
            title="Bill & Tip Calculator"
          >
            <IconPercent size={15} />
            <span>Finance</span>
          </button>
        </div>

        {/* Action Controls (History, Sound, Theme) */}
        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <IconVolume size={16} /> : <IconVolumeMute size={16} />}
          </button>
          <button
            className={`icon-btn ${isHistoryOpen ? 'active' : ''}`}
            onClick={() => setIsHistoryOpen(true)}
            title="Calculation History"
          >
            <IconHistory size={16} />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {mode === 'standard' && (
        <>
          <Display
            expression={expression}
            value={currentValue}
            angleUnit={angleUnit}
            hasMemory={memoryVal !== null}
            mode={mode}
          />
          <Keypad
            onDigit={handleDigit}
            onOperator={handleOperator}
            onClear={handleClear}
            onDelete={handleDelete}
            onEquals={handleEquals}
            onToggleSign={handleToggleSign}
            onPercent={handlePercent}
          />
        </>
      )}

      {mode === 'scientific' && (
        <>
          <Display
            expression={expression}
            value={currentValue}
            angleUnit={angleUnit}
            hasMemory={memoryVal !== null}
            mode={mode}
          />
          <ScientificKeypad
            onDigit={handleDigit}
            onOperator={handleOperator}
            onClear={handleClear}
            onDelete={handleDelete}
            onEquals={handleEquals}
            onToggleSign={handleToggleSign}
            onSciFunc={handleSciFunc}
            onConstant={handleConstant}
            angleUnit={angleUnit}
            onToggleAngle={() => setAngleUnit(angleUnit === 'DEG' ? 'RAD' : 'DEG')}
            onMemory={handleMemory}
          />
        </>
      )}

      {mode === 'converter' && <UnitConverter />}

      {mode === 'finance' && <FinanceCalculator />}

      {/* Footer Bar with Theme Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.2rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <ThemeSelector currentTheme={theme} onSelectTheme={setTheme} />
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
          Press Esc to clear
        </span>
      </div>

      {/* Sliding History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistory={(item) => {
          setExpression(`${item.expression} =`);
          setCurrentValue(item.result);
          setIsEvaluated(true);
          setIsHistoryOpen(false);
        }}
        onClearHistory={() => setHistory([])}
      />
    </div>
  );
}
