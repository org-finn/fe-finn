import { useEffect, useRef } from 'react';
import { BASE_URL, getAccessToken } from '../instance';
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

    const abortController = new AbortController();

    const connect = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}${getRealTimeStreamPath(tickerId)}`,
          {
            signal: abortController.signal,
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
              Accept: 'text/event-stream',
              'Cache-Control': 'no-cache',
            },
          }
        );

        if (!response.ok || !response.body) return;

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const events = buffer.split(/\r?\n\r?\n/);
          buffer = events.pop() ?? '';

          for (const eventBlock of events) {
            let eventName = '';
            let dataLine = '';
            for (const line of eventBlock.split(/\r?\n/)) {
              if (line.startsWith('event:')) {
                eventName = line.slice(6).trim();
              }
              if (line.startsWith('data:')) {
                dataLine = line.slice(5).trim();
              }
            }
            if (!dataLine || eventName !== 'ticker-price') continue;
            try {
              const data = JSON.parse(dataLine) as TickerRealTimeStreamResponse;
              onMessageRef.current(data);
            } catch {
              // ignore parse errors
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    };

    connect();

    return () => {
      abortController.abort();
    };
  }, [tickerId, enabled]);
};
