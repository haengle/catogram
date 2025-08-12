import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CatModal } from "../../src/components/CatModal";
import { mockCatObj } from "../../src/lib/mocks/mockCatObj";
import "@testing-library/jest-dom";

describe("CatModal", () => {
	let onClose: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		onClose = vi.fn();
		HTMLDialogElement.prototype.showModal = vi.fn();
		HTMLDialogElement.prototype.close = vi.fn();
		document.body.removeAttribute("inert");
		document.body.style.overflow = "";
	});

	it("renders modal with cat details", () => {
		render(
			<CatModal
				data={mockCatObj[0]}
				onClose={onClose}
			/>
		);
		expect(screen.getByTestId("cat-modal")).toBeInTheDocument();
		expect(screen.getByTestId("header")).toHaveTextContent("Bengal");
		expect(screen.getByTestId("temperament")).toHaveTextContent(
			"Alert, Agile, Energetic, Demanding, Intelligent"
		);
		expect(screen.getByTestId("description")).toHaveTextContent(
			"Bengals are a lot of fun to live with, but they're definitely not the cat for everyone, or for first-time cat owners. Extremely intelligent, curious and active, they demand a lot of interaction and woe betide the owner who doesn't provide it."
		);
		expect(screen.getByTestId("cat-img")).toHaveAttribute(
			"src",
			mockCatObj[0].url
		);
	});

	it("calls onClose when close button is clicked", () => {
		render(
			<CatModal
				data={mockCatObj[0]}
				onClose={onClose}
			/>
		);
		const closeButton = screen.getByTestId("modal-close");
		fireEvent.click(closeButton);
		expect(onClose).toHaveBeenCalled();
	});

	it("sets and removes body inert and overflow styles", () => {
		const { unmount } = render(
			<CatModal
				data={mockCatObj[0]}
				onClose={onClose}
			/>
		);
		expect(document.body.hasAttribute("inert")).toBe(true);
		expect(document.body.style.overflow).toBe("hidden");
		unmount();
		expect(document.body.hasAttribute("inert")).toBe(false);
		expect(document.body.style.overflow).toBe("");
	});

	it("renders only image if breed data is missing", () => {
		render(
			<CatModal
				data={mockCatObj[2]}
				onClose={onClose}
			/>
		);
		expect(screen.getByTestId("cat-modal")).toBeInTheDocument();
		expect(screen.queryByTestId("header")).toBeNull();
	});

	it("does not render wikipedia link if url missing", () => {
		render(
			<CatModal
				data={mockCatObj[1]}
				onClose={onClose}
			/>
		);
		expect(screen.getByTestId("cat-modal")).toBeInTheDocument();
		expect(screen.queryByTestId("wiki-url")).toBeNull();
	});
});
