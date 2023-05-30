const years = [];
(function(){
	for (let year = 2023; year >= 1960; year--) {
		years.push(year);
	  }
}())

export const filtersData = {
	genre: ['Ужасы', 'Комедии', 'Фантастика', 'Фэнтази', 'Документальный', 'Природный', 'Хоррор', 'Музыкальное видео', 'Мультфильм', 'Арт', '3D'],
	studio: ['Нью лайн синема', '20 век фокс', 'Planetpics', 'Режиссер: Эдди Авил', 'Режиссер: Мария Милованович', 'Режиссер: Клеа Каллен', 'Lookport'],
	year: years,
	lang: ['Rus', 'Eng', 'Rus/Eng', 'Без озвучки']
}

export const sortData = ['Алфавиту', 'Дате добавления', 'Году создания', 'Времени']
export const sort = [
	{
		"id": "39df513c-964d-4b5c-b210-a2675e06d71f",
		"name": "Комедии"
	},
	{
		"id": "04be8dea-2241-4cfb-a905-9ba8d8c40654",
		"name": "Ужасы"
	}
]

export const filterGenre = [
	{ value: 'ужасы', label: 'Ужасы' },
	{ value: 'комедии', label: 'Комедии' },
	{ value: 'фантастика', label: 'Фантастика' },
	{ value: 'фэнтэзи', label: 'Фэнтэзи' },
	{ value: 'документальный', label: 'Документальный' },
	{ value: 'природный', label: 'Природный' },
	{ value: 'хоррор', label: 'Хоррор' },
	{ value: 'музыкальное видео', label: 'Музыкальное видео' },
	{ value: 'мультфильм', label: 'Мультфильм' },
	{ value: 'арт', label: 'Арт' },
	{ value: '3d', label: '3D' },
]

export const genre = filtersData.genre;
export const studio = filtersData.studio;
export const yearFrom = filtersData.year;
export const yearTo = filtersData.year;
export const lang = filtersData.lang;