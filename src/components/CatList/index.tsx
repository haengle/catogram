import { CatCard } from "../CatCard";
import styles from "./index.module.css";

export const CatList = ({
	list = [],
	loadMore,
	moreLoading,
}: {
	list: CatDetail[];
	loadMore: () => void;
	moreLoading: boolean;
}) => {
	return (
		<section className={styles.catGrid}>
			{Array.isArray(list) &&
				list.map((cats) => {
					return (
						<CatCard
							data={cats}
							key={cats.id}
						/>
					);
				})}
			{loadMore ? (
				<button
					className={styles.loadMoreBtn}
					data-testid='load-more'
					onClick={loadMore}
					disabled={moreLoading}
				>
					Moar Cats!
				</button>
			) : null}
		</section>
	);
};
