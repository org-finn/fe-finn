import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  fetchInstance,
  setAccessToken,
  setOnUnauthorized,
  setRefreshTokenFn,
} from './index';

describe('fetchInstance 응답 인터셉터', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(fetchInstance);
    setAccessToken(null);
  });

  afterEach(() => {
    mock.restore();
    vi.clearAllMocks();
  });

  it('비로그인(accessToken 없음) 상태일 때 401 응답 받을 시 → refresh 시도 없이 401 reject', async () => {
    const mockRefresh = vi.fn().mockResolvedValue('new-token');
    setRefreshTokenFn(mockRefresh);
    mock.onGet('/test').reply(401);

    await expect(fetchInstance.get('/test')).rejects.toMatchObject({
      response: { status: 401 },
    });
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it('로그인(accessToken 있음) 상태일 때 401 응답 받을 시 → refresh 성공 → 원래 요청 재시도', async () => {
    setAccessToken('old-token');
    setRefreshTokenFn(vi.fn().mockResolvedValue('new-token'));
    mock
      .onGet('/test')
      .replyOnce(401)
      .onGet('/test')
      .reply(200, { data: 'ok' });

    const response = await fetchInstance.get('/test');
    expect(response.data).toEqual({ data: 'ok' });
  });

  // isLoggingOut은 모듈 레벨 상태라 외부에서 리셋 못하니까 마지막에 배치
  it('로그인(accessToken 있음) 상태일 때 401 응답 받을 시 → refresh 실패 → onUnauthorized 호출', async () => {
    const onUnauthorized = vi.fn();
    setAccessToken('old-token');
    setRefreshTokenFn(vi.fn().mockRejectedValue(new Error('refresh 실패')));
    setOnUnauthorized(onUnauthorized);
    mock.onGet('/test').reply(401);

    await expect(fetchInstance.get('/test')).rejects.toBeDefined();
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });
});
