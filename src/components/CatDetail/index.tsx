import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCatById } from "../../lib/getCatById";
import { CatModal } from "../CatModal";

export const CatDetail = ({ catList }: { catList: CatDetail[] }) => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	/* get the cat detail from state first */
	const [cat, setCat] = useState<CatDetail | undefined>(() =>
		catList.find((c) => c.id === id)
	);

	/* if its not in the state, fetch from API */
	useEffect(() => {
		if (!cat && id) {
			getCatById(id).then((result: CatDetail | CatDetail[]) => {
				if (Array.isArray(result) && result.length === 0) {
					setCat(undefined);
				} else {
					setCat(result as CatDetail);
				}
			});
		}
	}, [id, catList]);

	return (
		<>
			{cat ? (
				<CatModal
					data={cat}
					onClose={() => navigate("/")}
				/>
			) : (
				<div
					data-testid='not-found'
					style={{ textAlign: "center" }}
				>
					<h2>Cat not found</h2>
					<Link to='/'>Go back</Link>
				</div>
			)}
		</>
	);
};
