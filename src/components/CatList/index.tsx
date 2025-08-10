import { CatCard } from "../CatCard";
import { CatButton } from "../CatButton";

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
						<CatButton
							onCatButtonClick={loadMore}
							isDisabled={moreLoading}
							text={"Moar Cats!"}
						/>
					) : null}
				</>
			) : (
				<div className={styles.errorMsg}>
					<p>Oops, try again:</p>
					<CatButton
						onCatButtonClick={loadMore}
						isDisabled={moreLoading}
						text={"Try Meow!"}
					/>
				</div>
			)}
		</section>
	);
};
