export default function usegetVariant(sentiment: number) {
  if (sentiment === 1) return 'red';
  if (sentiment === 0) return 'darkgrey';
  return 'blue';
}
