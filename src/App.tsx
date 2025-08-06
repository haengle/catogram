import { useEffect, useState } from "react";
import { getCatImages } from "./lib/getCatImages";
import { Loader } from "./components/Loader";
import { CatList } from "./components/CatList";

function App() {
	const [catState, setCatState] = useState({
		catList: [],
		loading: true,
		imagesLoaded: 0,
	});

	useEffect(() => {
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
		<div className={`fade ${catState.loading ? "fade-in" : "fade-out"}`}>
			{catState.loading ? <Loader /> : <CatList list={catState.catList} />}
		</div>
	);
}

export default App;
