export async function getCatImages() {
	const API_KEY = import.meta.env.VITE_CAT_API_KEY;
	try {
		const res = await fetch(
			`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${API_KEY}`
		);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("error fetching from Cat API", error);
	}
}
