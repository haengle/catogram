import styles from "./index.module.css";

export const CatButton = ({
	onCatButtonClick,
	isDisabled,
	text,
}: {
	onCatButtonClick: () => void;
	isDisabled: boolean;
	text: string;
}) => {
	return (
		<button
			className={styles.loadMoreBtn}
			data-testid='load-more'
			onClick={onCatButtonClick}
			disabled={isDisabled}
		>
			{text}
		</button>
	);
};
