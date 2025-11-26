export type ABTestVariant = 'keyword' | 'article' | 'graph';

const AB_TEST_STORAGE_KEY = 'ab_test_variant';

export const getABTestVariant = () => {
  const storedVariant = localStorage.getItem(AB_TEST_STORAGE_KEY);
  if (
    storedVariant === 'keyword' ||
    storedVariant === 'article' ||
    storedVariant === 'graph'
  ) {
    return storedVariant;
  }

  const variants: ABTestVariant[] = ['keyword', 'article', 'graph'];
  const randomIndex = Math.floor(Math.random() * 3);
  const assigned = variants[randomIndex];

  localStorage.setItem(AB_TEST_STORAGE_KEY, assigned);

  return assigned;
};
