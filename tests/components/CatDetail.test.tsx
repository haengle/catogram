import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CatDetail } from "../../src/components/CatDetail";
import { mockCatObj } from "../../src/lib/mocks/mockCatObj";
import "@testing-library/jest-dom";

describe("CatDetail", () => {
	beforeEach(() => {
		HTMLDialogElement.prototype.showModal = vi.fn();
	});

	it("renders CatModal with correct cat data when cat is found", () => {
		render(
			<MemoryRouter initialEntries={[`/cat/${mockCatObj[0].id}`]}>
				<Routes>
					<Route
						path='/cat/:id'
						element={<CatDetail catList={mockCatObj} />}
					/>
				</Routes>
			</MemoryRouter>
		);
		expect(screen.getByTestId("cat-modal")).toBeInTheDocument();
	});

	it("renders 'Cat not found' when cat ID is not found", () => {
		render(
			<MemoryRouter initialEntries={["/cat/999"]}>
				<Routes>
					<Route
						path='/cat/:id'
						element={<CatDetail catList={mockCatObj} />}
					/>
				</Routes>
			</MemoryRouter>
		);
		expect(screen.getByTestId("not-found")).toBeInTheDocument();
	});
});
