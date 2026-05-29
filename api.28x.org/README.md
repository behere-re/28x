# 28x Time API

The official time service for the 28x temporal standard. Pure calculation — no database, no auth.

**Live:** `api.28x.org`

## Endpoints

| Endpoint | Description |
|---|---|
| `GET /` | API documentation (JSON) |
| `GET /now` | Current moment in 28x time |
| `GET /convert` | Convert between Gregorian and 28x |
| `GET /premium/convert` | x402-protected premium conversion with attestation |
| `GET /season` | Season information for a 28x year |
| `GET /afn-coordinate` | 28x coordinate for AFN minting |
| `GET /health` | Health check |
| `GET /admin/metrics` | Admin-only API usage metrics |

Responses include both `28x.coordinate` (fixed numeric form) and
`28x.canonicalCoordinate` (public standard form). Intercalary days are emitted
as `28X-YYYY-ID` / `28X-YYYY-LID` in `canonicalCoordinate`; legacy numeric
intercalary inputs (`28X-YYYY-00-00` / `28X-YYYY-00-01`) are still accepted.

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm test
```

## Deployment

Configured for Railway via `railway.toml`. Reads `PORT` from environment, defaults to 3000.

### Environment

| Variable | Description |
|---|---|
| `ADMIN_TOKEN` | Enables `GET /admin/metrics`. Send as `Authorization: Bearer <token>` or `x-admin-token`. |
| `METRICS_HASH_SALT` | Optional stable salt for privacy-safe client hashing. If omitted, a random per-process salt is used. |
| `METRICS_LOG_PATH` | Optional JSONL path for sanitized request/payment events. Raw IPs are never written. |
| `X402_PAY_TO` | Algorand wallet address that receives x402 payments. Enables `GET /premium/convert`. |
| `X402_PRICE` | Optional x402 price for premium conversion. Defaults to `$0.001`. |
| `X402_NETWORK` | Optional x402 network. Defaults to Algorand TestNet (`algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=`). |
| `X402_FACILITATOR_URL` | Optional facilitator URL. Defaults to `https://facilitator.goplausible.xyz`. |
| `X402_ENABLED` | Set to `false` to force-disable x402 premium endpoints. |

### x402 proof endpoint

`GET /premium/convert` accepts the same query parameters as `/convert`, but requires
x402 payment when `X402_PAY_TO` is configured. The response includes the conversion,
canonical coordinates, and a deterministic attestation ID. The endpoint records x402
funnel events in admin metrics: payment required, submitted, verified, settled,
fulfilled, and failed.

## The 28x Calendar

- **Epoch:** 2026-03-20 00:00:00 UTC = 28X-0000-01-01
- **Structure:** 13 months × 28 days = 364 named days + 1 intercalary day (2 in leap years)
- **Leap rule:** 28x years divisible by 4 are leap years, except Year 0000
- **Seasons:** Spring (M1-3), Summer (M4-6), Autumn (M7-9), Winter (M10-13)
- **Standard:** [28x.org/standard](https://28x.org/standard)
