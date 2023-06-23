export async function fieldFilm() {
	return [
		{
			name: 'title',//как id должен быть разным
			placeholder: 'Название',
			type: 'text',
			required: true,
		},
		{
			name: 'time',
			placeholder: 'Время',
			type: 'text',
			required: true,
		},
		{
			name: 'year',
			placeholder: 'Год',
			type: 'text',
			required: true,
		},
	]
}

export async function fieldCinema() {
	return [
		{
			name: 'type',//как id должен быть разным
			placeholder: 'Тип',
			type: 'select',
			required: true,
			select: 'select'
		},
		{
			name: 'adress',
			placeholder: 'Адрес',
			type: 'text',
			required: true,
		},
		{
			name: 'owner',
			placeholder: 'Владелец',
			type: 'select',
			required: true,
			select: 'select'
		},
	]
}

export async function fieldFranchisee() {
	return [
		{
			name: 'type',//как id должен быть разным
			placeholder: 'Тип',
			type: 'select',
			required: true,
			select: 'select'
		},
		{
			name: 'name',
			placeholder: 'Наименование',
			type: 'text',
			required: true,
		},
		{
			name: 'login',
			placeholder: 'Логин',
			type: 'text',
			required: true,
		},
		{
			name: 'parol',
			placeholder: 'Пароль',
			type: 'text',
			required: true,
		},
		{
			name: 'contract',
			placeholder: '№ договора',
			type: 'text',
			required: true,
		},
	]
}

export async function fieldFranchiseeOOO() {
	return [
		{
			name: 'ogrn',//как id должен быть разным
			placeholder: 'ОГРН',
			type: 'text',
			required: true,
		},
		{
			name: 'inn',
			placeholder: 'ИНН',
			type: 'text',
			required: true,
		},
		{
			name: 'kpp',
			placeholder: 'КПП',
			type: 'text',
			required: true,
		},
		{
			name: 'adress',
			placeholder: 'Адрес',
			type: 'text',
			required: true,
		},
		{
			name: 'bank',
			placeholder: 'Название банка',
			type: 'text',
			required: true,
		},
		{
			name: 'account',
			placeholder: 'Номер счета',
			type: 'text',
			required: true,
		},
		{
			name: 'bik',
			placeholder: 'БИК',
			type: 'text',
			required: true,
		},
	]
}

export async function fieldFranchiseeIP() {
	return [
		{
			name: 'ogrnip',//как id должен быть разным
			placeholder: 'ОГРНИП',
			type: 'text',
			required: true,
		},
		{
			name: 'inn',
			placeholder: 'ИНН',
			type: 'text',
			required: true,
		},
		{
			name: 'kpp',
			placeholder: 'КПП',
			type: 'text',
			required: true,
		},
		{
			name: 'adress',
			placeholder: 'Адрес',
			type: 'text',
			required: true,
		},
		{
			name: 'bank',
			placeholder: 'Название банка',
			type: 'text',
			required: true,
		},
		{
			name: 'account',
			placeholder: 'Номер счета',
			type: 'text',
			required: true,
		},
		{
			name: 'bik',
			placeholder: 'БИК',
			type: 'text',
			required: true,
		},
	]
}

export async function fieldFranchiseeIndividual() {
	return [
		{
			name: 'inn',
			placeholder: 'ИНН',
			type: 'text',
			required: true,
		},
		{
			name: 'kpp',
			placeholder: 'КПП',
			type: 'text',
			required: true,
		},
		{
			name: 'adress',
			placeholder: 'Адрес',
			type: 'text',
			required: true,
		},
		{
			name: 'bank',
			placeholder: 'Название банка',
			type: 'text',
			required: true,
		},
		{
			name: 'account',
			placeholder: 'Номер счета',
			type: 'text',
			required: true,
		},
		{
			name: 'bik',
			placeholder: 'БИК',
			type: 'text',
			required: true,
		},
	]
}
