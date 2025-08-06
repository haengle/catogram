import styles from "./index.module.css";

export const CatList = ({ list = [] }) => {
	return (
		<section className={styles.catGrid}>
			{Array.isArray(list) &&
				list.map((cats: CatList) => {
					return (
						<img
							key={cats.id}
							width={cats.width}
							height={cats.height}
							src={cats.url}
							alt={""}
							loading='lazy'
						/>
					);
				})}
		</section>
	);
};
