# API Conventions

## Next.js Route Handlers

- **File Location**: All API endpoints must live under `src/app/api/` as `route.ts`.
- **HTTP Methods**: Define endpoints using named exports: `export async function GET(request: Request) {}`, `POST`, `PUT`, `DELETE`, etc.
- **Request / Response**: Always return instances of `NextResponse` from `next/server`. Validate search params or body inputs before executing core logic.

## Feed Fetching & Parsing

- **GitHub Feed**: The principal backend service is `/api/github-feed`. It fetches the XML/Atom feed from GitHub, parses it to extract recent commit history, and serves a cleaned JSON representation.
- **Caching**: Ensure appropriate edge or cache control headers are configured on public feed routes so that they are fast, but do not exceed GitHub's rate limits (e.g., using `revalidate` segments or Stale-While-Revalidate headers).

## Error Handling

- Always wrap external fetch calls in `try...catch` blocks.
- Return appropriate HTTP status codes (e.g., 500 for parsing errors, 400 for bad parameters) and a descriptive JSON error payload.

