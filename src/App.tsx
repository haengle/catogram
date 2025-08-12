import { useRef, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCatImages } from "./lib/getCatImages";
import { Loader } from "./components/Loader";
import { CatList } from "./components/CatList";
import { CatDetail } from "./components/CatDetail";

function App() {
	const [catState, setCatState] = useState<{
		catList: CatDetail[];
		loading: boolean;
		imagesLoading: boolean;
	}>({
		catList: [],
		loading: true,
		imagesLoading: false,
	});

	/* NOTE: 
		Adding this hasFetched ref to avoid a 2nd set of images being fetched
		in dev/strict mode
	*/
	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasFetched.current) return;
		hasFetched.current = true;

		getCatImages().then((data) => {
			setCatState((prev) => ({
				...prev,
				catList: data || [],
				loading: false,
			}));
		});
	}, []);

	const handleMoreImages = () => {
		setCatState((prev) => ({ ...prev, imagesLoading: true }));
		getCatImages().then((data) => {
			setCatState((prev) => ({
				...prev,
				catList: [...prev.catList, ...(data || [])],
				imagesLoading: false,
			}));
		});
	};

	return (
		<BrowserRouter>
			<header>
				<h1>Catogram</h1>
			</header>
			<main className={`fade ${catState.loading ? "fade-in" : "fade-out"}`}>
				<Routes>
					<Route
						path='/catogram'
						element={
							catState.loading ? (
								<Loader />
							) : (
								<CatList
									list={catState.catList}
									loadMore={handleMoreImages}
									moreLoading={catState.imagesLoading}
								/>
							)
						}
					/>
					<Route
						path='/catogram/cat/:id'
						element={<CatDetail catList={catState.catList} />}
					/>
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
