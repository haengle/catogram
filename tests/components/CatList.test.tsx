import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CatList } from "../../src/components/CatList/index";
import { mockCatObj } from "../../src/lib/mocks/mockCatObj";
import "@testing-library/jest-dom";

const loadMore = vi.fn();

describe("CatList", () => {
	it("renders without crashing with empty list", () => {
		render(
			<CatList
				list={[]}
				loadMore={loadMore}
				moreLoading={false}
			/>
		);
		expect(screen.queryByTestId("cat-card")).toBeNull();
	});

	it("renders a CatCard for each cat in the list", () => {
		render(
			<CatList
				list={mockCatObj}
				loadMore={loadMore}
				moreLoading={false}
			/>
		);
		const cards = screen.getAllByTestId("cat-card");
		expect(cards).toHaveLength(3);
		expect(cards[0]).toHaveTextContent("Cat Details");
	});

	it("renders the 'more' button when list is not empty", () => {
		render(
			<CatList
				list={mockCatObj}
				loadMore={loadMore}
				moreLoading={false}
			/>
		);
		expect(screen.getByTestId("load-more")).toHaveTextContent("Moar Cats!");
	});

	it("calls loadMore when 'Moar Cats!' button is clicked", () => {
		render(
			<CatList
				list={mockCatObj}
				loadMore={loadMore}
				moreLoading={false}
			/>
		);
		fireEvent.click(screen.getByText("Moar Cats!"));
		expect(loadMore).toHaveBeenCalled();
	});

	it("renders error message and 'Try Meow!' button when list is empty", () => {
		render(
			<CatList
				list={[]}
				loadMore={loadMore}
				moreLoading={false}
			/>
		);
		expect(screen.getByText("Oops, try again:")).toBeInTheDocument();
		expect(screen.getByText("Try Meow!")).toBeInTheDocument();
	});

	it("calls loadMore when 'Try Meow!' button is clicked", () => {
		const loadMore = vi.fn();
		render(
			<CatList
				list={[]}
				loadMore={loadMore}
				moreLoading={false}
			/>
		);
		fireEvent.click(screen.getByText("Try Meow!"));
		expect(loadMore).toHaveBeenCalled();
	});
});
