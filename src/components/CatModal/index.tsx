import { useRef, useEffect } from "react";
import styles from "./index.module.css";
import { ScaleBar } from "../ScaleBar";

export const CatModal = ({
	data,
	onClose,
}: {
	data: CatDetail;
	onClose: () => void;
}) => {
	const {
		name,
		description,
		temperament,
		wikipedia_url,
		dog_friendly,
		energy_level,
		health_issues,
		intelligence,
		vocalisation,
	} = data.breeds[0];

	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
			document.body.setAttribute("inert", "");
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.body.removeAttribute("inert");
			document.body.style.overflow = "";
		};
	}, []);

	function handleClose() {
		if (dialogRef.current) {
			dialogRef.current.close();
		}
		if (onClose) onClose();
	}

	return (
		<dialog
			onClose={handleClose}
			ref={dialogRef}
		>
			<button
				autoFocus
				onClick={handleClose}
			>
				Close
			</button>
			<div className={styles.catModalBody}>
				<div className={styles.catModalImg}>
					<img
						src={data.url}
						width={320}
						height={260}
						alt={name}
						loading='lazy'
					/>
				</div>
				<div className={styles.catModalContent}>
					<h2>{name}</h2>
					<p>
						<strong>Temperament:</strong> {temperament}
					</p>
					<p>{description}</p>
					<p>
						<a
							href={wikipedia_url}
							target='_blank'
							rel='noopener'
						>
							Read more about the {name} on Wikipedia
						</a>
					</p>
				</div>
				<div className={styles.catModalAttributes}>
					<ScaleBar
						score={dog_friendly}
						label='Dog Friendly'
						color='blue'
					/>
					<ScaleBar
						score={energy_level}
						label='Energy Level'
						color='pink'
					/>
					<ScaleBar
						score={health_issues}
						label='Health Issues'
						color='dark-red'
					/>
					<ScaleBar
						score={intelligence}
						label='Intelligence'
						color='purple'
					/>
					<ScaleBar
						score={vocalisation}
						label='Vocalisation'
						color='mid-blue'
					/>
				</div>
			</div>
		</dialog>
	);
};
