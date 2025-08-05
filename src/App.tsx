import { useEffect, useMemo, useState } from "react";
import CatLogo from "/cat-gradient.svg";
import { getCatImages } from "./lib/getCatImages";

import "./App.css";

function App() {
	const [catList, setCatList] = useState([]);

	const catData = useMemo(async () => {
		const data = await getCatImages();
		setCatList(data);
	}, []);

	console.log(catList);
	return (
		<>
			<img
				src={CatLogo}
				alt='Catogram'
			/>
			{catList.map((cats: CatList) => {
				return <img src={cats.url} />;
			})}
		</>
	);
}

export default App;
