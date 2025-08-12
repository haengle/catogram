import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCatById } from "../src/lib/getCatById";

describe("getCatById", () => {
	const mockId = "1";
	const mockApiKey = "test-api-key";
	const mockResponse = { id: "abc", url: "https://cat.com/cat1.jpg" };

	beforeEach(() => {
		globalThis.fetch = vi.fn();
		// @ts-ignore
		import.meta.env.VITE_CAT_API_KEY = mockApiKey;
	});

	it("fetches single cat from API and returns object", async () => {
		// @ts-ignore
		fetch.mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: vi.fn().mockResolvedValueOnce(mockResponse),
		});

		const data = await getCatById(mockId);

		expect(fetch).toHaveBeenCalledWith(
			`https://api.thecatapi.com/v1/images/${mockId}?api_key=${mockApiKey}`
		);
		expect(data).toEqual(mockResponse);
	});

	it("returns empty array if response is not ok", async () => {
		// @ts-ignore
		fetch.mockResolvedValueOnce({
			ok: false,
			status: 500,
			json: vi.fn().mockResolvedValueOnce(mockResponse),
		});

		const data = await getCatById(mockId);

		expect(fetch).toHaveBeenCalledWith(
			`https://api.thecatapi.com/v1/images/${mockId}?api_key=${mockApiKey}`
		);
		expect(data).toEqual([]);
	});

	it("logs error and returns empty array if fetch throws", async () => {
		const error = new Error("Network error");
		// @ts-ignore
		fetch.mockRejectedValueOnce(error);
		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});

		const data = await getCatById(mockId);

		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"error fetching from Cat API",
			error
		);
		expect(data).toEqual([]);

		consoleErrorSpy.mockRestore();
	});
});
