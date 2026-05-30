# Ra9

Autonomous coding agent for the terminal — a stateful AI runtime designed for real development workflows, not chat-based code generation.

Ra9 combines persistent shell sessions, context-aware memory, goal planning, tool orchestration, and safe command execution into a single terminal-native experience. It feels less like a chatbot and more like an operating layer for autonomous software development.

## Architecture

Ra9 is a TypeScript monorepo managed with [Bun](https://bun.sh) workspaces and [Turborepo](https://turbo.build).

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
| **`@repo/cli`** | Interactive Terminal User Interface (TUI) powered by `@opentui/react` and `@opentui/core`. Provides a stateful command-line interface with a dynamic command menu, status bar, and real-time layout adjustments. |
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
- **Runtime** — Node.js 20+ & Bun 1.1+
- **Monorepo** — Bun workspaces + Turborepo
- **TUI Framework** — `@opentui/core`, `@opentui/react`, React 19
- **Server** — Express 5
- **Validation** — Zod

## CLI & TUI Features

The `@repo/cli` package implements a stateful terminal-based experience featuring:

- **Command Autocomplete** — Auto-suggests and completes commands starting with a slash (`/`).
- **Scrollable Command Menu** — Pressing `/` opens an interactive, scrollable popover listing all available commands.
- **Key Interceptions** — Use `Up` and `Down` arrow keys to navigate suggestions, `Tab` to autocomplete the highlighted option, `Enter` to run the command, and `Escape` to clear.
- **Adaptive Layout** — Automatically scales TUI components and heights according to current terminal dimensions.
- **Status Bar** — Displays active model and runtime details (e.g., `opus-4-6`).
- **ASCII Font Header** — Renders a custom ascii-font block header.

### Supported Commands

| Command | Description |
|---------|-------------|
| `/new` | Create a new conversation |
| `/exit` | Exit the application |
| `/help` | Show the help menu |
| `/models` | List available models |
| `/logout` | Logout from your account |
| `/agent` | Start an agent with a specified goal |
| `/sessions` | List active sessions |
| `/theme` | Change the terminal color theme |
| `/usage` | Show API usage statistics |

## Getting Started

### Prerequisites

- Node.js 20+
- Bun 1.1+

### Install

```bash
bun install
```

### Development

To start the applications in development mode:

```bash
# Run all apps in dev mode
bun dev

# Run just the TUI CLI
bun dev:cli

# Run just the server
bun --filter @repo/server dev
```

### Build

```bash
bun build
```

## Project Status

Ra9 is in early development. The core architecture and monorepo scaffolding are in place. The `protocol`, `providers`, and `tools` packages are ready for implementation.

## License

MIT
