# Ra9

Autonomous coding agent for the terminal — a stateful AI runtime designed for real development workflows, not chat-based code generation.

Ra9 combines persistent shell sessions, context-aware memory, goal planning, tool orchestration, and safe command execution into a single terminal-native experience. It feels less like a chatbot and more like an operating layer for autonomous software development.

## Architecture

Ra9 is a TypeScript monorepo managed with [pnpm](https://pnpm.io) workspaces and [Turborepo](https://turbo.build).

```
Ra9/
├── apps/
│   ├── cli/          # Terminal interface (@repo/cli)
│   └── server/       # HTTP API server (@repo/server)
├── packages/
│   ├── core/         # Agent runtime engine (@repo/core)
│   ├── protocol/     # Message & communication types (@repo/protocol)
│   ├── providers/    # LLM & service integrations (@repo/providers)
│   ├── tools/        # Tool & plugin registry (@repo/tools)
│   └── tsconfig/     # Shared TypeScript config (@repo/tsconfig)
```

### Apps

| App | Description |
|-----|-------------|
| **`@repo/cli`** | Command-line interface powered by [Commander.js](https://github.com/tj/commander.js). Exposes a `chat` command that sends prompts to the agent runtime. |
| **`@repo/server`** | [Express 5](https://expressjs.com) HTTP server exposing agent capabilities via REST API on port `3000`. |

### Packages

| Package | Description |
|---------|-------------|
| **`@repo/core`** | Core agent runtime. Contains the `runAgent()` entry point that drives prompt execution. |
| **`@repo/protocol`** | Protocol definitions for agent communication and message schemas. |
| **`@repo/providers`** | Provider adapters for LLMs and external services. |
| **`@repo/tools`** | Tool and plugin system for extending agent capabilities. |
| **`@repo/tsconfig`** | Shared TypeScript compiler configuration (strict mode, ES2022 target, ESNext modules). |

## Tech Stack

- **Language** — TypeScript 6, targeting ES2022
- **Runtime** — Node.js
- **Monorepo** — pnpm workspaces + Turborepo
- **CLI** — Commander.js, Chalk
- **Server** — Express 5
- **Validation** — Zod
- **Dev tooling** — tsx for fast TypeScript execution

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+

### Install

```bash
pnpm install
```

### Development

```bash
# Run all apps in dev mode
pnpm dev

# Run just the CLI
pnpm --filter @repo/cli dev

# Run just the server
pnpm --filter @repo/server dev
```

### Build

```bash
pnpm build
```

### CLI Usage

```bash
# Send a prompt to the agent
pnpm --filter @repo/cli dev chat "explain this function"
```

## Project Status

Ra9 is in early development. The core architecture and monorepo scaffolding are in place. The `protocol`, `providers`, and `tools` packages are ready for implementation.

## License

MIT
