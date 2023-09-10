// Hexagonal architecture
// Ports & Adapters
export async function httpClient(url, options) {
  const response = await fetch(url, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : null,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return {
    data: await response.json(),
    ok: response.ok,
  };
}
