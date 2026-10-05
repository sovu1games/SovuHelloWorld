// Checks for the Playwright harness (Foundry\Dev\Testing\run.mjs). Not shipped in module.zip.
// Each export gets { page, user, isGM, id } and returns { pass, message }.

export async function greetingSetting({ page, id }) {
  const value = await page.evaluate(id => game.settings.get(id, "greet"), id);
  return { pass: value === true, message: `greet = ${value}` };
}

export async function settingLocalized({ page }) {
  const name = await page.evaluate(() => game.i18n.localize("SOVU-HELLO-WORLD.Settings.Greet.Name"));
  return { pass: name === "Greet on load", message: `setting name = "${name}"` };
}

export async function greetingVisibility({ page, isGM, id }) {
  // The greeting is created asynchronously after "ready"; give it a moment to arrive.
  if (isGM) await page.waitForFunction(id => game.messages.some(m => m.getFlag(id, "greeting")), id, { timeout: 10000 }).catch(() => {});
  const count = await page.evaluate(id =>
    game.messages.filter(m => m.getFlag(id, "greeting") && m.visible).length, id);
  return isGM
    ? { pass: count >= 1, message: `GM sees ${count} greeting(s)` }
    : { pass: count === 0, message: `player sees ${count} greeting(s)` };
}

export async function greetingVersion({ page, isGM, id }) {
  if (!isGM) return { pass: true, message: "skipped for players" };
  const r = await page.evaluate(id => {
    const version = game.modules.get(id).version;
    const latest = game.messages.filter(m => m.getFlag(id, "greeting")).at(-1);
    return { version, text: latest?.content ?? "" };
  }, id);
  return { pass: r.text.includes(`(v${r.version})`), message: `latest greeting names v${r.version}: ${r.text.includes(`(v${r.version})`)}` };
}

export async function greetingColour({ page, isGM, id }) {
  if (!isGM) return { pass: true, message: "skipped for players" };
  await page.evaluate(() => ui.sidebar.changeTab("chat", "primary"));
  await page.waitForSelector(`#sidebar .chat-log .${id}`, { timeout: 10000 }).catch(() => {});
  const colour = await page.evaluate(id => {
    const el = document.querySelector(`#sidebar .chat-log .${id}`);
    return el ? getComputedStyle(el).color : null;
  }, id);
  return { pass: colour !== null, message: `greeting colour = ${colour}` };
}
