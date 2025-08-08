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
			{Array.isArray(list) && list.length > 0 ? (
				<>
					{list.map((cats, index) => (
						<CatCard
							data={cats}
							key={cats.id}
							index={index}
						/>
					))}
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
				</>
			) : (
				<div className={styles.errorMsg}>
					<p>Oops, try again:</p>
					<button
						className={styles.loadMoreBtn}
						data-testid='load-more'
						onClick={loadMore}
						disabled={moreLoading}
					>
						Get Cats!
					</button>
				</div>
			)}
		</section>
	);
};
