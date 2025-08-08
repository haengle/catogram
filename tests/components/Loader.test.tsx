import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loader } from "../../src/components/Loader";
import "@testing-library/jest-dom";

describe("Loader", () => {
	it("renders the loader wrapper", () => {
		render(<Loader />);
		const wrapper = screen.getByText("Loading...").parentElement;
		expect(wrapper).toBeInTheDocument();
	});

	it("renders the cat logo image with correct alt text", () => {
		render(<Loader />);
		const img = screen.getByAltText("Catogram is loading");
		expect(img).toBeInTheDocument();
		expect(img.tagName).toBe("IMG");
	});
});
