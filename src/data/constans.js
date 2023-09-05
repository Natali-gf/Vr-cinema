// Enum
export const currentYear = new Date().getFullYear();

export const age = [
	{ value: '0+', label: '0+' },
	{ value: '6+', label: '6+' },
	{ value: '12+', label: '12+' },
	{ value: '16+', label: '16+' },
	{ value: '18+', label: '18+' }
];

export const franchiseeType = [
	{ value: 'OOO', label: 'OOO' },
	{ value: 'ИП', label: 'ИП' },
	{ value: 'Физ.лицо', label: 'Физ.лицо' },
	{ value: 'Другое', label: 'Другое' },
];

export const filmSortBy = [
	{name: 'Алфавиту'},
	{name: 'Дате добавления'},
	{name: 'Году создания'},
	{name: 'Времени'}
];
export const cinemaSortBy = [
	{name: 'Названию'},
	{name: 'Франчайзи'},
];
export const franchiseeSortBy = [
	{name: 'Наименованию'},
	{name: 'Логину'},
];
