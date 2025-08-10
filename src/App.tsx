import { useRef, useEffect, useState } from "react";
import { getCatImages } from "./lib/getCatImages";
import { Loader } from "./components/Loader";
import { CatList } from "./components/CatList";

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
		<>
			<h1>Catogram</h1>
			<div className={`fade ${catState.loading ? "fade-in" : "fade-out"}`}>
				{catState.loading ? (
					<Loader />
				) : (
					<CatList
						list={catState.catList}
						loadMore={handleMoreImages}
						moreLoading={catState.imagesLoading}
					/>
				)}
			</div>
		</>
	);
}

export default App;
