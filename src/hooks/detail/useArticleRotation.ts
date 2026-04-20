import { useState, useEffect } from 'react';
import { DetailArticleData } from '@/types';

export function useArticleRotation(articles: DetailArticleData[] | undefined) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const articleCount = articles?.length || 0;
    setCurrentIndex(0);

    if (articleCount <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articleCount);
    }, 15000);
    return () => clearInterval(interval);
  }, [articles]);

  return { currentIndex };
}
