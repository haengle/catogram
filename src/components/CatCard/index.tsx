import type { SyntheticEvent } from "react";
import { useState } from "react";
import { isLandscape } from "../../lib/utils/isLandscape";
import { isPortrait } from "../../lib/utils/isPortrait";
import styles from "./index.module.css";
import { CatModal } from "../CatModal";

export const CatCard = ({ data }: { data: CatDetail }) => {
	const [detailOpen, setDetailOpen] = useState(false);
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

	function handleCardClick() {
		setDetailOpen(true);
	}

	return (
		<>
			<button
				data-testid='cat-card'
				className={styles.catCard}
				onClick={handleCardClick}
				style={style}
				aria-label={`${breedName} details`}
			>
				<div className={styles.catCardImgWrapper}>
					<img
						data-src={data.url}
						width={320}
						height={260}
						src='/catogram/cat.svg'
						alt={breedName}
						loading='lazy'
						onLoad={handleImageLoad}
						className={styles.catCardImg}
					/>
					<span>Cat Details</span>
				</div>
			</button>
			{detailOpen ? (
				<CatModal
					data={data}
					onClose={() => setDetailOpen(false)}
				/>
			) : null}
		</>
	);
};
