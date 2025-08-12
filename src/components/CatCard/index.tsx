import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { isLandscape } from "../../lib/utils/isLandscape";
import { isPortrait } from "../../lib/utils/isPortrait";
import catSvg from "/cat.svg";
import styles from "./index.module.css";

export const CatCard = ({
	data,
	index,
}: {
	data: CatDetail;
	index: number;
}) => {
	const breedName = data.breeds?.[0].name ?? "cat";

	const style: React.CSSProperties = {
		...(isLandscape(data.width, data.height) && {
			gridColumnEnd: "span 2",
			gridRowEnd: "span 1",
		}),
		...(isPortrait(data.width, data.height) && {
			gridRowEnd: "span 2",
			gridColumnEnd: "span 1",
		}),
	};

	function handleImageLoad(e: SyntheticEvent<HTMLImageElement, Event>) {
		const img = e.target as HTMLImageElement;
		const dataSrc = img.getAttribute("data-src");
		if (dataSrc) {
			img.src = dataSrc;
			img.removeAttribute("data-src");
		}
	}

	return (
		<>
			<Link
				data-testid='cat-card'
				className={styles.catCard}
				to={`/catogram/cat/${data.id}`}
				style={style}
				aria-label={`${breedName} details`}
			>
				<div className={styles.catCardImgWrapper}>
					<img
						data-src={data.url}
						width={320}
						height={260}
						src={catSvg}
						alt={breedName}
						loading={index < 3 ? "eager" : "lazy"}
						onLoad={handleImageLoad}
						className={styles.catCardImg}
					/>
					<span>Cat Details</span>
				</div>
			</Link>
		</>
	);
};
