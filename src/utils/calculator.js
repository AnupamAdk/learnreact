// Safe, accurate calculation engine with scientific math support

// Factorial helper
export function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // Limit overflow
  if (!Number.isInteger(n)) return gamma(n + 1);
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// Stirling approximation for non-integer factorials
function gamma(n) {
  if (n <= 0) return NaN;
  const g = 7;
  const p = [
    0.99999999999980993, 676.5203681218851, -1259.139216723469,
    771.3234287776531, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];
  let z = n - 1;
  let x = p[0];
  for (let i = 1; i < g + 2; i++) {
    x += p[i] / (z + i);
  }
  let t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

// Format number cleanly (avoid scientific notation for reasonable length, round floating inaccuracies)
export function formatResult(num, precision = 10) {
  if (typeof num !== 'number' || isNaN(num)) return 'Error';
  if (!isFinite(num)) return num > 0 ? 'Infinity' : '-Infinity';

  // Fix JS floating precision issues e.g. 0.1 + 0.2 = 0.30000000000000004
  const rounded = parseFloat(num.toFixed(precision));
  
  if (Math.abs(rounded) > 1e12 || (Math.abs(rounded) < 1e-7 && rounded !== 0)) {
    return num.toExponential(6);
  }

  return rounded.toString();
}

// Format number with thousands separators for display
export function formatWithCommas(str) {
  if (!str || str === 'Error' || str === 'Infinity' || str === '-Infinity') return str;
  const parts = str.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

// Safe Expression Evaluator
export function evaluateExpression(expr, angleUnit = 'DEG') {
  if (!expr || expr.trim() === '') return 0;

  try {
    let sanitized = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, Math.PI.toString())
      .replace(/\be\b/g, Math.E.toString())
      .replace(/−/g, '-');

    // Handle percentage calculations e.g. 50 * 20% -> 50 * 0.20
    sanitized = sanitized.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

    // Scientific functions replacement
    // Trigonometry (handles DEG vs RAD)
    const isDeg = angleUnit === 'DEG';
    const degToRad = (val) => isDeg ? (val * Math.PI) / 180 : val;
    const radToDeg = (val) => isDeg ? (val * 180) / Math.PI : val;

    // Functions mapped
    const scope = {
      sin: (x) => Math.sin(degToRad(x)),
      cos: (x) => Math.cos(degToRad(x)),
      tan: (x) => Math.tan(degToRad(x)),
      asin: (x) => radToDeg(Math.asin(x)),
      acos: (x) => radToDeg(Math.acos(x)),
      atan: (x) => radToDeg(Math.atan(x)),
      log: (x) => Math.log10(x),
      ln: (x) => Math.log(x),
      sqrt: (x) => Math.sqrt(x),
      cbrt: (x) => Math.cbrt(x),
      fact: (x) => factorial(x),
      abs: (x) => Math.abs(x),
    };

    // Transform expressions like sin(90) or sqrt(16) or 5^2
    // Power operator ^ -> Math.pow
    let tokens = sanitized;

    // Convert power e.g. 2^3 -> Math.pow(2, 3)
    while (tokens.includes('^')) {
      tokens = tokens.replace(/(\d+(\.\d+)?|\([^\)]+\))\^(\d+(\.\d+)?|\([^\)]+\))/g, 'Math.pow($1,$3)');
    }

    // Substitute scientific functions
    Object.keys(scope).forEach((fnKey) => {
      const regex = new RegExp(`\\b${fnKey}\\(`, 'g');
      tokens = tokens.replace(regex, `scope.${fnKey}(`);
    });

    // Evaluate in safe Function context
    const evaluator = new Function('scope', `return ${tokens};`);
    const val = evaluator(scope);

    if (typeof val !== 'number' || isNaN(val)) {
      return 'Error';
    }

    return val;
  } catch (err) {
    return 'Error';
  }
}
