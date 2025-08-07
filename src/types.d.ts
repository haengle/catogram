interface CatDetail {
	url: string;
	id: string;
	width: number;
	height: number;
	breeds: Array[CatBreedDetail];
}

interface CatBreedDetail {
	description: string;
	name: string;
	temperament: string;
	wikipedia_url: string;
	dog_friendly: number;
	energy_level: number;
	health_issues: number;
	intelligence: number;
	vocalisation: number;
}
