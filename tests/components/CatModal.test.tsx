import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

	afterEach(() => {
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
		expect(screen.getByText(mockCatObj[0].breeds[0].name)).toBeInTheDocument();
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
});
