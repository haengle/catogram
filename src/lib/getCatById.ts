export async function getCatById(id: string) {
	const API_KEY = import.meta.env.VITE_CAT_API_KEY;
	try {
		const res = await fetch(
			`https://api.thecatapi.com/v1/images/${id}?api_key=${API_KEY}`
		);
		if (!res.ok) {
			return [];
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("error fetching from Cat API", error);
		return [];
	}
}
