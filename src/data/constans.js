// Enum
export const years = [];
(function(){
	for (let year = 2023; year >= 1960; year--) {
		years.push({'value': year, 'year': year});
	  }
}())

export const age = [
	{ value: '0+', label: '0+' },
	{ value: '6+', label: '6+' },
	{ value: '12+', label: '12+' },
	{ value: '16+', label: '16+' },
	{ value: '18+', label: '18+' }
];

export const lang = [
	{ value: 'rus', label: 'Rus' },
	{ value: 'eng', label: 'Eng' },
	{ value: 'rus/eng', label: 'Rus/Eng' },
	{ value: 'Без озвучки', label: 'Без озвучки' },
];

export const sortBy = [
	{name: 'Алфавиту'},
	{name: 'Дате добавления'},
	{name: 'Году создания'},
	{name: 'Времени'}
];
export const sortData = ['Алфавиту', 'Дате добавления', 'Году создания', 'Времени'];

export const cinemaType = [
	{ value: 'family', label: 'Семейный' },
	{ value: 'flagman', label: 'Флагман' },
	{ value: 'light', label: 'Лайт' },
	{ value: 'vip', label: 'VIP' },
	{ value: 'multiplex', label: 'Мультиплекс' },
	{ value: 'arthouse', label: 'Арт-хаус' },
];

export const franchiseeType = [
	{ value: 'OOO', label: 'ООО' },
	{ value: 'ИП', label: 'ИП' },
	{ value: 'Физ.лицо', label: 'Физ.лицо' },
	{ value: 'Другое', label: 'Другое' },
];