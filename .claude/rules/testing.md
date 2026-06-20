# Testing Conventions

## Running Checks

### Linting & Formatting
```bash
npm run lint              # runs eslint and check-rules
```

### TypeScript Compilation Check
```bash
npx tsc --noEmit          # compile check without outputting assets
```

### Production Build
```bash
npm run build             # builds the Next.js production bundle
```

## Pre-commit Checklist

1. Run lint checks: `npm run lint`
2. Validate TypeScript compile: `npx tsc --noEmit`
3. Run build to verify production compatibility: `npm run build`

