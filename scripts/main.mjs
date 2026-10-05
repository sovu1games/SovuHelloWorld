import { MODULE_ID, log } from "./constants.mjs";

log("loaded (top level)");

Hooks.once("init", () => {
  log("init");
  game.settings.register(MODULE_ID, "greet", {
    name: "SOVU-HELLO-WORLD.Settings.Greet.Name",
    hint: "SOVU-HELLO-WORLD.Settings.Greet.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
});

Hooks.once("ready", async () => {
  log(`ready — Foundry ${game.version}, module ${game.modules.get(MODULE_ID).version}`);
  // Only the active GM posts, so a second GM logged in doesn't double the greeting.
  if (!game.user.isActiveGM || !game.settings.get(MODULE_ID, "greet")) return;
  await ChatMessage.implementation.create({
    content: `<p class="${MODULE_ID}">${game.i18n.format("SOVU-HELLO-WORLD.Hello", { name: game.user.name, version: game.modules.get(MODULE_ID).version })}</p>`,
    speaker: { alias: game.i18n.localize("SOVU-HELLO-WORLD.Title") },
    whisper: [game.user.id],
    flags: { [MODULE_ID]: { greeting: true } }
  });
});
