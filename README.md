# 28x Website

The official website for the 28x open temporal standard.

## Status

Deployment-ready: All build errors resolved.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment

| Variable | Description |
|----------|-------------|
| `TWENTY_EIGHT_X_API_BASE` | Optional. Base URL for the 28x Time API (no trailing slash). Defaults to `https://api.28x.org`. For local development, run the API on a different port than Next (e.g. `PORT=3001 npm run dev` in `api.28x.org/`) and set this to `http://localhost:3001`. |

## Structure

- `/` - Homepage with thesis and entry points
- `/standard` - 28x Time Standard v0.1 specification
- `/why-now` - Essay: "Why Now: Temporal Integrity in the Age of Intelligent Systems"
- `/time-literacy` - Essay: "Time Literacy: Why Education Must Teach Rhythm Before Schedules"
- `/governance` - Stewardship, versioning, and openness
- `/convert` - Placeholder for future date conversion tools

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Design Principles

- Calm, authoritative reference
- Typography-forward, minimal styling
- Infrastructure feel (like standards documents, research labs)
- Light mode by default
- Generous whitespace and clear hierarchy

