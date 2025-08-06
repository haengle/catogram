import CatLogo from "/cat-gradient.svg";
import styles from "./index.module.css";

export const Loader = () => {
	return (
		<div className={styles.loaderWrapper}>
			<img
				src={CatLogo}
				alt='Catogram is loading'
			/>
			<p>Loading...</p>
		</div>
	);
};
