export default function useGetSignSymbol(sentiment: number) {
  if (sentiment === 1) return '📈';
  if (sentiment === -1) return '📉';
  return '';
}
