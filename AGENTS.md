<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## CRITICAL OVERRIDE: PERFORMANCE & EXECUTION RULES (HIGHEST PRIORITY)

The rules below strictly override the `nextjs-agent-rules` block above:

1. **DO NOT scan `node_modules/next/dist/docs/` automatically:** Ignore the instruction above to read `node_modules/next/dist/docs/` before writing code. Only look up a specific doc file if a build or type error explicitly requires it. Write code directly following existing patterns in `app/` and `components/`.
2. **Never start persistent servers:** Do NOT run `npm run dev`, `npx next dev`, or `npx prisma studio` inside agent terminals. They run forever and hang the task.
3. **No automatic E2E tests or full builds:** Do NOT run `npx playwright test` or `npm run build` automatically after editing files unless the user explicitly asks for them.
4. **Fast verification only:** Use `npx tsc --noEmit` to check types after editing files.
5. **Strict Ignore List:** Never search, index, or read `.next/`, `node_modules/`, `test-results/`, `tsconfig.tsbuildinfo`, `package-lock.json`, or the nested `ojix/` directory.