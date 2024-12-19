export const getCorrelationColor = (correlation: number): string => {
    const absCorrelation = Math.abs(correlation);
    
    if (correlation < 0) {
      if (absCorrelation >= 0.7) return '#2c5282'; // Strong negative - muted dark blue
      if (absCorrelation >= 0.5) return '#4a7ab7'; // Moderate negative - muted medium blue
      if (absCorrelation >= 0.3) return '#7ba3d6'; // Weak negative - soft light blue
      return '#b3d1f1'; // Very weak negative - very soft light blue
    } else {
      if (absCorrelation >= 0.7) return '#9b2c2c'; // Strong positive - muted dark red
      if (absCorrelation >= 0.5) return '#c53030'; // Moderate positive - muted medium red
      if (absCorrelation >= 0.3) return '#e05252'; // Weak positive - soft light red
      return '#f4a9a9'; // Very weak positive - very soft light red
    }
  };
  
  export const getCorrelationStrength = (correlation: number): string => {
    const absCorrelation = Math.abs(correlation);
    if (absCorrelation >= 0.7) return 'Strong';
    if (absCorrelation >= 0.5) return 'Moderate';
    if (absCorrelation >= 0.3) return 'Weak';
    return 'Very Weak';
  };
  
  export const formatCorrelationValue = (value: number): string => {
    return value.toFixed(3);
  };