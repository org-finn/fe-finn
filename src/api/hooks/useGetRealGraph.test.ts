import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fetchInstance } from '../instance';
import { getRealGraph, getRealGraphPath } from './useGetRealGraph';

describe('getRealGraph', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(fetchInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  const url = `${getRealGraphPath('ticker-1')}?period=2W`;

  it('200 응답 → 그래프 데이터 반환', async () => {
    const mockData = {
      code: '200 OK',
      message: '실제 그래프 데이터를 성공적으로 조회하였습니다.',
      content: {
        period: '2W',
        graphData: [
          {
            date: '2025-06-01',
            price: 100,
            changeRate: 0,
            positiveArticleRatio: 0.5,
            negativeArticleRatio: 0.5,
          },
        ],
      },
    };
    mock.onGet(url).reply(200, mockData);

    const result = await getRealGraph({ tickerId: 'ticker-1' });
    expect(result).toEqual(mockData);
  });

  it('404 응답 → null 반환 (에러 아님)', async () => {
    mock.onGet(url).reply(404);

    const result = await getRealGraph({ tickerId: 'ticker-1' });
    expect(result).toBeNull();
  });

  it('500 응답 → AxiosError throw', async () => {
    mock.onGet(url).reply(500);

    const error = await getRealGraph({ tickerId: 'ticker-1' }).catch((e) => e);
    expect(axios.isAxiosError(error)).toBe(true);
    expect(error.response?.status).toBe(500);
  });
});
