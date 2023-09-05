export function getYears (currentYear, yearFrom, yearTo){
	const years = [];
	for (let year = (yearTo ? yearTo.year : currentYear); year >= (yearFrom ? yearFrom.year : 1960); year--) {
		years.push({'value': year, 'year': year});
	}
	return years;
};

export function previewImage(e, setState) {
	const reader = new FileReader();

		reader.onload = () => {
			if(reader.readyState){
				setState(reader.result);
			}
		}

	const result = reader.readAsDataURL(e.target.files[0]);
	return result;
}

export function btnClearField(e, nameField, clearField) {
	e.preventDefault();
	clearField(nameField, undefined);
}

export function getIndexCheckedItems (options, checkedOptions, name){
	let optionIndex = [];
		options.map((o, i) => checkedOptions.map(e => {
			if((name ? o.name === e[name] : o.name === e) || o.label === e){
			optionIndex.push(i);
		}} ))
	return optionIndex;
}

export function chooseImage(e, setSrc, setState, nameField){
	previewImage(e, setSrc);
	setState(nameField, e.target.files[0]);
}

export function removeImage(setSrc, setState, nameField){
	setSrc('');
	setState(nameField, null);
}

export const setFormFieldsValue = (formFields, setFieldValue, currentData) => {
	let fields = {}
	formFields.map(nameField => {
		setFieldValue
		? setFieldValue(nameField, currentData[nameField])
		: fields[nameField] = currentData[nameField];
	})
	return fields;
}

export function sortByName(a, b){
    if (a.name < b.name) {return -1};
    if (a.name > b.name) {return 1};
    return 0;
}
