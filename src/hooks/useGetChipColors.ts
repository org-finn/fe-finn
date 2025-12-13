export function getChipColors(variant: string) {
  if (variant === 'red') {
    return {
      gradient: 'linear-gradient(145deg, #ffecec, #ffd5d5)',
      shadow:
        '2px 2px 4px rgba(255, 107, 107, 0.15), -1px -1px 3px rgba(255, 255, 255, 0.8)',
    };
  }
  if (variant === 'blue') {
    return {
      gradient: 'linear-gradient(145deg, #e6f0ff, #cce0ff)',
      shadow:
        '2px 2px 4px rgba(71, 200, 217, 0.15), -1px -1px 3px rgba(255, 255, 255, 0.8)',
    };
  }
  return {
    gradient: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)',
    shadow:
      '2px 2px 4px rgba(0, 0, 0, 0.1), -1px -1px 3px rgba(255, 255, 255, 0.8)',
  };
}
