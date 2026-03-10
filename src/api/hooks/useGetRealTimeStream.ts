import { useEffect, useRef } from 'react';
import { BASE_URL } from '../instance';
import { TickerRealTimeStreamResponse } from '@/types';

export const getRealTimeStreamPath = (tickerId: string) =>
  `/api/v1/price/ticker/${tickerId}/real-time/stream`;

export const useGetRealTimeStream = (
  tickerId: string,
  enabled: boolean,
  onMessage: (data: TickerRealTimeStreamResponse) => void
) => {
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    if (!enabled) return;

    const eventSource = new EventSource(
      `${BASE_URL}${getRealTimeStreamPath(tickerId)}`,
      { withCredentials: true }
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as TickerRealTimeStreamResponse;
        onMessageRef.current(data);
      } catch {
        // ignore parse errors
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [tickerId, enabled]);
};
