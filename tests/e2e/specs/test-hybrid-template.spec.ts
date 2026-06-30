import path from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({
	path: path.resolve(__dirname, "../../../.env"),
});

import { test } from "../fixtures/test";

test("test", async ({ authPage }) => {
	// Provide credentials for the test user
	await authPage.goto("http://localhost:3000/");
	await authPage.getByRole("button", { name: "Go to dashboard" }).click();

	// Import an existing resume in json format
	await authPage
		.getByRole("heading", { name: "Import an existing resume" })
		.locator("..") // move from <h3> to the overlay container
		.locator("..") // then to the clickable card wrapper
		.click();

	await authPage.getByRole("combobox", { name: "Type" }).click();
	await authPage.getByRole("option", { name: "Reactive Resume (JSON)" }).click();
	await authPage
		.locator('input[type="file"]', { hasText: "" })
		.setInputFiles("/home/jpdoyon/Documents/Repos/Internal/reactive-resume-json/rosko_splitted_fr.json");
	await authPage.getByRole("button", { name: "Import" }).click();

	console.log("Test completed successfully!");
});
