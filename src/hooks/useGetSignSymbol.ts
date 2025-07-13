export default function useGetSignSymbol(isUp: number) {
  if (isUp === 1) return '+';
  if (isUp === -1) return '-';
  return '';
}
