export default function usegetVariant(isUp: number) {
  if (isUp === 1) return 'red';
  if (isUp === 0) return 'darkgrey';
  return 'blue';
}
