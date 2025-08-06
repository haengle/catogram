import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCatImages } from "../src/lib/getCatImages";

describe("getCatImages", () => {
	const mockApiKey = "test-api-key";
	const mockResponse = [
		{ id: "abc", url: "https://cat.com/cat1.jpg" },
		{ id: "def", url: "https://cat.com/cat2.jpg" },
	];

	beforeEach(() => {
		globalThis.fetch = vi.fn();
		// @ts-ignore
		import.meta.env.VITE_CAT_API_KEY = mockApiKey;
	});

	it("fetches cat images from the API and returns data", async () => {
		// @ts-ignore
		fetch.mockResolvedValueOnce({
			json: vi.fn().mockResolvedValueOnce(mockResponse),
		});

		const data = await getCatImages();

		expect(fetch).toHaveBeenCalledWith(
			`https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=${mockApiKey}`
		);
		expect(data).toEqual(mockResponse);
	});

	it("logs error and returns undefined if fetch throws", async () => {
		const error = new Error("Network error");
		// @ts-ignore
		fetch.mockRejectedValueOnce(error);
		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});

		const data = await getCatImages();

		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"error fetching from Cat API",
			error
		);
		expect(data).toBeUndefined();

		consoleErrorSpy.mockRestore();
	});
});
