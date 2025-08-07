import styles from "./index.module.css";

export const ScaleBar = ({
	score,
	label,
	color,
}: {
	score: number;
	label: string;
	color: string;
}) => {
	const percentage = `${(score / 10) * 100}%`;

	return (
		<div className={styles.scaleBarWrapper}>
			<div className={styles.scaleBarLabel}>
				{label}: <span className={styles.score}>{score}/10</span>
			</div>
			<div
				className={styles.scaleBar}
				style={{
					background: `linear-gradient(to right, var(--color-${color}, #000) 0%, var(--color-${color}, #000) ${percentage}, #dadadaff ${percentage}, #dadadaff 100%`,
				}}
			></div>
		</div>
	);
};
