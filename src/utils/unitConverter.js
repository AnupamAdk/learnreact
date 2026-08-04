// Unit Converter utility logic

export const CONVERSION_CATEGORIES = {
  Length: {
    units: ['Meters (m)', 'Kilometers (km)', 'Centimeters (cm)', 'Millimeters (mm)', 'Miles (mi)', 'Yards (yd)', 'Feet (ft)', 'Inches (in)'],
    // Base unit: Meters
    rates: {
      'Meters (m)': 1,
      'Kilometers (km)': 1000,
      'Centimeters (cm)': 0.01,
      'Millimeters (mm)': 0.001,
      'Miles (mi)': 1609.344,
      'Yards (yd)': 0.9144,
      'Feet (ft)': 0.3048,
      'Inches (in)': 0.0254
    }
  },
  Weight: {
    units: ['Kilograms (kg)', 'Grams (g)', 'Milligrams (mg)', 'Pounds (lb)', 'Ounces (oz)', 'Metric Tons (t)'],
    // Base unit: Kilograms
    rates: {
      'Kilograms (kg)': 1,
      'Grams (g)': 0.001,
      'Milligrams (mg)': 0.000001,
      'Pounds (lb)': 0.45359237,
      'Ounces (oz)': 0.028349523125,
      'Metric Tons (t)': 1000
    }
  },
  Temperature: {
    units: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'],
    convert: (val, from, to) => {
      if (from === to) return val;
      let celsius = val;
      if (from === 'Fahrenheit (°F)') celsius = (val - 32) * (5 / 9);
      if (from === 'Kelvin (K)') celsius = val - 273.15;

      if (to === 'Celsius (°C)') return celsius;
      if (to === 'Fahrenheit (°F)') return celsius * (9 / 5) + 32;
      if (to === 'Kelvin (K)') return celsius + 273.15;
      return val;
    }
  },
  Area: {
    units: ['Square Meters (m²)', 'Square Kilometers (km²)', 'Square Feet (ft²)', 'Acres (ac)', 'Hectares (ha)'],
    // Base unit: Square Meters
    rates: {
      'Square Meters (m²)': 1,
      'Square Kilometers (km²)': 1000000,
      'Square Feet (ft²)': 0.092903,
      'Acres (ac)': 4046.856,
      'Hectares (ha)': 10000
    }
  },
  Speed: {
    units: ['Meters/sec (m/s)', 'Km/hour (km/h)', 'Miles/hour (mph)', 'Knots (kt)'],
    // Base unit: m/s
    rates: {
      'Meters/sec (m/s)': 1,
      'Km/hour (km/h)': 0.277778,
      'Miles/hour (mph)': 0.44704,
      'Knots (kt)': 0.514444
    }
  }
};

export function convertUnit(val, category, fromUnit, toUnit) {
  const num = parseFloat(val);
  if (isNaN(num)) return '';

  const catData = CONVERSION_CATEGORIES[category];
  if (!catData) return '';

  if (catData.convert) {
    const res = catData.convert(num, fromUnit, toUnit);
    return parseFloat(res.toFixed(6)).toString();
  }

  const baseVal = num * catData.rates[fromUnit];
  const targetVal = baseVal / catData.rates[toUnit];

  return parseFloat(targetVal.toFixed(6)).toString();
}
