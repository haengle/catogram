import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CatCard } from "../../src/components/CatCard/index";
import { mockCatObj } from "../../src/lib/mocks/mockCatObj";
import "@testing-library/jest-dom";

const renderWithRouter = (ui: React.ReactElement) =>
	render(<BrowserRouter>{ui}</BrowserRouter>);

describe("CatCard", () => {
	it("renders with correct aria-label and image alt", () => {
		renderWithRouter(
			<CatCard
				data={mockCatObj[0]}
				index={0}
			/>
		);
		const button = screen.getByTestId("cat-card");
		expect(button).toHaveAttribute("aria-label", "Bengal details");
		expect(button).toHaveAttribute("href", `/cat/${mockCatObj[0].id}`);
		const img = screen.getByAltText("Bengal");
		expect(img).toBeInTheDocument();
	});

	it("loads image from data-src on load", () => {
		renderWithRouter(
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
		renderWithRouter(
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
		renderWithRouter(
			<CatCard
				data={mockCatObj[0]}
				index={1}
			/>
		);
		expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
		renderWithRouter(
			<CatCard
				data={mockCatObj[0]}
				index={3}
			/>
		);
		expect(screen.getAllByRole("img")[1]).toHaveAttribute("loading", "lazy");
	});

	it("applies landscape style when width > height", () => {
		renderWithRouter(
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
		renderWithRouter(
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
});
