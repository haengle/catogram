import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CatCard } from "../../src/components/CatCard/index";
import { mockCatObj } from "../../src/lib/mocks/mockCatObj";
import "@testing-library/jest-dom";

describe("CatCard", () => {
	beforeEach(() => {
		// Mock showModal and close methods on HTMLDialogElement
		HTMLDialogElement.prototype.showModal = vi.fn();
		HTMLDialogElement.prototype.close = vi.fn();
	});

	it("renders with correct aria-label and image alt", () => {
		render(
			<CatCard
				data={mockCatObj[0]}
				index={0}
			/>
		);
		const button = screen.getByTestId("cat-card");
		expect(button).toHaveAttribute("aria-label", "Bengal details");
		const img = screen.getByAltText("Bengal");
		expect(img).toBeInTheDocument();
	});

	it("loads image from data-src on load", () => {
		render(
			<CatCard
				data={mockCatObj[0]}
				index={0}
			/>
		);
		const img = screen.getByAltText("Bengal") as HTMLImageElement;
		// Simulate image load
		fireEvent.load(img);
		expect(img.src).toContain(mockCatObj[0].url);
		expect(img.getAttribute("data-src")).toBeNull();
	});

	it("uses fallback alt when breeds is empty", () => {
		render(
			<CatCard
				data={{ ...mockCatObj[3] }}
				index={0}
			/>
		);
		expect(screen.getByAltText("cat")).toBeInTheDocument();
		expect(screen.getByTestId("cat-card")).toHaveAttribute(
			"aria-label",
			"cat details"
		);
	});

	it("sets loading to eager for index < 3, lazy otherwise", () => {
		render(
			<CatCard
				data={mockCatObj[0]}
				index={1}
			/>
		);
		expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
		render(
			<CatCard
				data={mockCatObj[0]}
				index={3}
			/>
		);
		expect(screen.getAllByRole("img")[1]).toHaveAttribute("loading", "lazy");
	});

	it("applies landscape style when width > height", () => {
		render(
			<CatCard
				data={{ ...mockCatObj[0], width: 600, height: 300 }}
				index={0}
			/>
		);
		const button = screen.getByTestId("cat-card");
		expect(button).toHaveStyle({
			gridColumnEnd: "span 2",
			gridRowEnd: "span 1",
		});
	});

	it("applies portrait style when height > width", () => {
		render(
			<CatCard
				data={{ ...mockCatObj[0], width: 200, height: 300 }}
				index={0}
			/>
		);
		const button = screen.getByTestId("cat-card");
		expect(button).toHaveStyle({
			gridRowEnd: "span 2",
			gridColumnEnd: "span 1",
		});
	});

	it("opens CatModal on card click and closes it", () => {
		render(
			<CatCard
				data={mockCatObj[0]}
				index={0}
			/>
		);
		const button = screen.getByTestId("cat-card");
		fireEvent.click(button);
		expect(screen.getByTestId("cat-modal")).toBeInTheDocument();
		fireEvent.click(screen.getByText("Close"));
		expect(screen.queryByTestId("cat-modal")).not.toBeInTheDocument();
	});
});
