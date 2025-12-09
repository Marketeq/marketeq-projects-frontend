import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

export const worker = setupWorker(
  http.post('/v1/checkout/sessions', () =>
    HttpResponse.json({ id: 'cs_test_123', clientSecret: 'secret_abc' })
  ),
  http.get('/v1/checkout/sessions/:id', ({ params }) =>
    HttpResponse.json({ id: String(params.id), status: 'requires_payment_method' })
  )
);
