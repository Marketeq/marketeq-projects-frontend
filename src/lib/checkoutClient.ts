const BASE = process.env.NEXT_PUBLIC_CHECKOUT_BASE_URL!;

async function j<T>(res: Response): Promise<T> {
  if (!res.ok) throw await res.json().catch(() => ({ message: res.statusText }));
  return res.json() as Promise<T>;
}

export const CheckoutAPI = {
  createSession: (body: { items: Array<{ id: string; qty: number }> }) =>
    fetch(`${BASE}/v1/checkout/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    }).then(j<{ id: string; clientSecret: string }>()),

  getSession: (id: string) =>
    fetch(`${BASE}/v1/checkout/sessions/${id}`, { credentials: 'include' })
      .then(j<{ id: string; status: string }>()),
};
