import { useState, useEffect } from 'react';
import { useGetRealTimeStream } from '@/api/hooks/useGetRealTimeStream';
import { RealTimePriceData, TickerRealTimeGraphResponse } from '@/types';

export function useLiveChart(
  id: string,
  isLiveMode: boolean,
  isAuthenticated: boolean,
  realTimePriceData: RealTimePriceData | undefined
) {
  const [liveChartData, setLiveChartData] = useState<
    TickerRealTimeGraphResponse[]
  >([]);

  useEffect(() => {
    if (realTimePriceData?.priceDataList) {
      setLiveChartData(realTimePriceData.priceDataList);
    }
  }, [realTimePriceData]);

  useGetRealTimeStream(id, isLiveMode && isAuthenticated, (newItem) => {
    setLiveChartData((prev) => {
      const last = prev[prev.length - 1];
      const toMinute = (time: string) => time.slice(0, 5);

      // 같은 1분봉이면 마지막 가격만 실시간 업데이트
      if (last && toMinute(last.hours) === toMinute(newItem.time)) {
        return [
          ...prev.slice(0, -1),
          {
            ...last,
            price: newItem.close,
            hours: newItem.time,
          },
        ];
      }

      const nextIndex = (last?.index ?? -1) + 1;
      return [
        ...prev,
        { price: newItem.close, hours: newItem.time, index: nextIndex },
      ];
    });
  });

  return { liveChartData };
}
