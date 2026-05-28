# Implementation Plan - Style CLI UI

Goal: Restyle the CLI components to match the "NIGHTCODE" image design.

## Proposed Changes

### 1. Update Header Logo
- File: `apps/cli/components/Header.tsx`
- Change: Change text to "NIGHTCODE" and font to "block".

### 2. Update Statusbar Content
- File: `apps/cli/components/Statusbar.tsx`
- Change: Update model text to "opus-4-6".

### 3. Update InputPrompt Placeholder
- File: `apps/cli/components/InputPrompt.tsx`
- Change: Update placeholder to "Ask anything... 'Fix a bug in the database'".

### 4. Wrap Components in index.tsx
- File: `apps/cli/index.tsx`
- Change: Group `InputPrompt` and `Statusbar` in a `<box>` with `backgroundColor="#1A1A24"`, padding, and centering.

## Verification Plan

### Automated Tests
- N/A (Project doesn't seem to have a test suite set up for UI components yet, based on complexity analysis).

### Manual Verification
- Run the CLI app (if possible in this environment) or review the code changes to ensure they align with the design specifications.
