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
	const { breeds = [] } = data ?? {};

	const {
		name = "",
		description = "",
		temperament = "",
		wikipedia_url = "",
		dog_friendly,
		energy_level,
		health_issues,
		intelligence,
		vocalisation,
	} = breeds[0] ?? {};

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

	return (
		<dialog
			data-testid='cat-modal'
			onClose={onClose}
			ref={dialogRef}
			aria-modal='true'
			aria-labelledby={data.id}
		>
			<button
				data-testid='modal-close'
				autoFocus
				onClick={onClose}
			>
				Close
			</button>
			<div className={styles.catModalBody}>
				<div
					className={styles.catModalImg}
					style={{
						backgroundImage: `url(${data.url})`,
						backgroundSize: "cover",
					}}
				>
					<img
						data-testid='cat-img'
						src={data.url}
						width={320}
						height={260}
						alt={name}
					/>
				</div>
				{Array.isArray(data.breeds) && data.breeds.length > 0 && (
					<>
						<div className={styles.catModalContent}>
							<h2
								id={data.id}
								data-testid='header'
							>
								{name}
							</h2>
							<p data-testid='temperament'>
								<strong>Temperament:</strong> {temperament}
							</p>
							<p data-testid='description'>{description}</p>
							{wikipedia_url ? (
								<p>
									<a
										data-testid='wiki-url'
										href={wikipedia_url}
										target='_blank'
										rel='noopener'
									>
										Read more about the {name} on Wikipedia
									</a>
								</p>
							) : null}
						</div>
						<div className={styles.catModalAttributes}>
							<ScaleBar
								score={dog_friendly ?? 0}
								label='Dog Friendly'
								color='blue'
							/>
							<ScaleBar
								score={energy_level ?? 0}
								label='Energy Level'
								color='pink'
							/>
							<ScaleBar
								score={health_issues ?? 0}
								label='Health Issues'
								color='dark-red'
							/>
							<ScaleBar
								score={intelligence ?? 0}
								label='Intelligence'
								color='purple'
							/>
							<ScaleBar
								score={vocalisation ?? 0}
								label='Vocalisation'
								color='mid-blue'
							/>
						</div>
					</>
				)}
			</div>
		</dialog>
	);
};
