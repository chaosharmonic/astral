import { assertMatch } from "https://deno.land/std@0.201.0/assert/assert_match.ts";
import { cleanCache, getBinary, launch } from "../mod.ts";
import { assert } from "https://deno.land/std@0.201.0/assert/assert.ts";

Deno.test("Test download", async () => {
  // Download browser
  await cleanCache();
  const path = await getBinary("chrome");

  // Ensure browser is executable
  const command = new Deno.Command(path, {
    args: [
      "--version",
    ],
  });
  const { success, stdout } = await command.output();
  assert(success);
  assertMatch(new TextDecoder().decode(stdout), /Google Chrome/i);

  // Ensure browser is capable of loading pages
  const browser = await launch();
  const page = await browser.newPage("http://example.com");
  await page.waitForSelector("h1");
  await browser.close();
});
