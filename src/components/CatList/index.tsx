import { CatCard } from "../CatCard";
import styles from "./index.module.css";

export const CatList = ({ list = [] }) => {
	return (
		<section className={styles.catGrid}>
			{Array.isArray(list) &&
				list.map((cats: CatDetail) => {
					return (
						<CatCard
							data={cats}
							key={cats.id}
						/>
					);
				})}
		</section>
	);
};
