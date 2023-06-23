export function previewImage(e, setState) {
	const reader = new FileReader();
	reader.onload = () => {
		if(reader.readyState){
			setState(reader.result)
		}
	}
	return reader.readAsDataURL(e.target.files[0])
}

export function btnClearField(e, nameField, clearField) {
	e.preventDefault();
	clearField(nameField, undefined)
}