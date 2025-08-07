import type { SyntheticEvent } from "react";
import { useState } from "react";
import { isLandscape } from "../../lib/utils/isLandscape";
import { isPortrait } from "../../lib/utils/isPortrait";
import styles from "./index.module.css";
import { CatModal } from "../CatModal";

export const CatCard = ({ data }: { data: CatDetail }) => {
	const [detailOpen, setDetailOpen] = useState(false);

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
			<div
				className={styles.catCard}
				role='button'
				tabIndex={0}
				onClick={handleCardClick}
				style={style}
			>
				<div className={styles.catCardImgWrapper}>
					<img
						data-src={data.url}
						width={320}
						height={260}
						src='/cat.svg'
						alt={data.breeds[0].name}
						loading='lazy'
						onLoad={handleImageLoad}
						className={styles.catCardImg}
					/>
					<span>Cat Details</span>
				</div>
			</div>
			{detailOpen ? (
				<CatModal
					data={data}
					onClose={() => setDetailOpen(false)}
				/>
			) : null}
		</>
	);
};
