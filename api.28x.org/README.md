# 28x Time API

The official time service for the 28x temporal standard. Pure calculation — no database, no auth.

**Live:** `api.28x.org`

## Endpoints

| Endpoint | Description |
|---|---|
| `GET /` | API documentation (JSON) |
| `GET /now` | Current moment in 28x time |
| `GET /convert` | Convert between Gregorian and 28x |
| `GET /season` | Season information for a 28x year |
| `GET /afn-coordinate` | 28x coordinate for AFN minting |
| `GET /health` | Health check |

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

## The 28x Calendar

- **Epoch:** 2026-03-20 00:00:00 UTC = 28X-0000-01-01
- **Structure:** 13 months × 28 days = 364 named days + 1 intercalary day (2 in leap years)
- **Seasons:** Spring (M1-3), Summer (M4-6), Autumn (M7-9), Winter (M10-13)
- **Standard:** [28x.org/standard](https://28x.org/standard)
