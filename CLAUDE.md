# SovuHelloWorld — Sovu Hello World

Foundry VTT module for V14. Repo `sovu1games/SovuHelloWorld` (public). Shared rules: `..\..\CLAUDE.md`.

## Identity (permanent)
- id: `sovu-hello-world`
- Manifest URL: https://github.com/sovu1games/SovuHelloWorld/releases/latest/download/module.json

## Targets
- Foundry: **V14**, minimum `14`, verified `14.368`
- System: none (system-agnostic)
- Requires: none

## What it does
The pipeline's smoke test. When a world loads, the active GM gets a whispered greeting in chat.
A world setting turns it off.

## Layout
- `scripts/main.mjs`: the entry point; registers the setting and posts the greeting on `ready`
- `scripts/constants.mjs`: `MODULE_ID` and `log`
- `styles/main.css` (scoped under `.sovu-hello-world`), `lang/en.json` (namespace `SOVU-HELLO-WORLD`)

## Settings and flags
| Key | Scope | Meaning |
|---|---|---|
| `greet` | world | whisper the greeting on load (default on) |

Flags this module writes: `flags.sovu-hello-world.greeting` on the greeting ChatMessage.

## Testing
Harness checks in `tests/checks.mjs`, run in `ModuleDev` as Gamemaster and Tester:
- `greetingSetting`, `settingLocalized`: the setting is registered and localized
- `greetingVisibility`: the GM sees the greeting, the player doesn't
- `greetingVersion`: the latest greeting names the loaded version
- `greetingColour`: the greeting is in the chat log, styled

Not covered by the harness (look yourself): how the greeting looks.
