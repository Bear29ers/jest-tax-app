import { act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';

import { renderHook, waitForRequest } from './test-utils';
import { useCalcTax } from './useCalcTax';

// MSWの初期化やクリーンアップ
// MSWサーバーをセットアップ
const server = setupServer();
// テスト実行時に最初にサーバーの待ち受けを開始
beforeAll(() => server.listen());
// テストケース内で設定したハンドラとリスナーを各テストの実行後にリセット
afterEach(() => {
  server.resetHandlers();
  server.events.removeAllListeners();
});
// テストの実行がすべて終わった後にサーバーを停止
afterAll(() => server.close());

// リクエストをキャプチャするPromiseを返す
const waitForCalcTaxRequest = () =>
  waitForRequest(server, 'POST', 'http://localhost:3000/calc-tax');

describe('useCalcTax', () => {
  test('所得税計算APIを呼び出せる', async () => {
    // テストケース内でMSWのハンドラをセットアップ
    server.use(
      rest.post('http://localhost:3000/calc-tax', async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ tax: 15315 }));
      }),
    );

    // キャプチャ関数を呼び出し
    const pendingRequest = waitForCalcTaxRequest();

    // フックをレンダリング
    const { result } = renderHook(() => useCalcTax());

    // フックから返されたmutate関数を使用してAPIを呼び出す
    act(() => {
      result.current.mutate({
        yearsOfService: 6,
        isOfficer: false,
        isDisability: false,
        severancePay: 3_000_000,
      });
    });

    // フックの結果が成功になるまで待つ
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ステータスコードとレスポンスボディのJSONデータを確認
    expect(result.current.data?.status).toBe(200);
    expect(await result.current.data?.json()).toStrictEqual({ tax: 15315 });

    // キャプチャされたリクエストボディの内容を確認する
    const request = await pendingRequest;
    expect(await request.json()).toStrictEqual({
      yearsOfService: 6,
      isOfficer: false,
      isDisability: false,
      severancePay: 3_000_000,
    });
  });
});
