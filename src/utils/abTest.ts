export type DetailABVariant = 'A' | 'B';

const DETAIL_AB_STORAGE_KEY = 'detail_ab_variant';

export const getDetailABVariant = (): DetailABVariant => {
  const storedVariant = localStorage.getItem(DETAIL_AB_STORAGE_KEY);
  if (storedVariant === 'A' || storedVariant === 'B') return storedVariant;

  const variants: DetailABVariant[] = ['A', 'B'];
  const assigned = variants[Math.floor(Math.random() * 2)];
  localStorage.setItem(DETAIL_AB_STORAGE_KEY, assigned);

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'ab_test_assigned',
      ab_test_name: 'detail_summary_ui',
      ab_test_variant: assigned,
    });
  }

  return assigned;
};
