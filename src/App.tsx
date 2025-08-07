import { useRef, useEffect, useState } from "react";
import { getCatImages } from "./lib/getCatImages";
import { Loader } from "./components/Loader";
import { CatList } from "./components/CatList";

function App() {
	const [catState, setCatState] = useState({
		catList: [],
		loading: true,
		imagesLoaded: 0,
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

	console.table(catState.catList);
	return (
		<>
			<h1>Catogram</h1>
			<div className={`fade ${catState.loading ? "fade-in" : "fade-out"}`}>
				{catState.loading ? <Loader /> : <CatList list={catState.catList} />}
			</div>
		</>
	);
}

export default App;
