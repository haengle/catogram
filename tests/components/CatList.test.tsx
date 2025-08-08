import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CatList } from "../../src/components/CatList/index";
import { mockCatObj } from "../../src/lib/mocks/mockCatObj";
import "@testing-library/jest-dom";

describe("CatList", () => {
	const mockCats = mockCatObj;

	it("renders without crashing with empty list", () => {
		render(<CatList list={[]} />);
		expect(screen.queryByTestId("cat-card")).toBeNull();
	});

	it("renders a CatCard for each cat in the list", () => {
		render(<CatList list={mockCats as any} />);
		const cards = screen.getAllByTestId("cat-card");
		expect(cards).toHaveLength(3);
		expect(cards[0]).toHaveTextContent("Cat Details");
	});

	it("handles undefined list prop gracefully", () => {
		render(<CatList />);
		expect(screen.queryByTestId("cat-card")).toBeNull();
	});
});
