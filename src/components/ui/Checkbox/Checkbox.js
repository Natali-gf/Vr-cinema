import style from './style.module.scss';
import cn from 'classnames';
import React from 'react';

export default function Checkbox ({className, isChecked, children, setState, nameField, isDisabled, onChange}) {
	const [checked, setChecked] = React.useState(isChecked || false);
	const [label, setLabel] = React.useState(isChecked || false);
	let idNumber = Math.random();
	const refCheckbox = React.useRef()
	
	React.useEffect(() =>{
		// console.log(refCheckbox.current.value)
	},[])
	React.useEffect(() =>{
		// console.log(refCheckbox.current)
	},[refCheckbox.current])

	const handleChange = (e) => {
		setChecked(!checked)

		if(nameField){
			setState(nameField, !checked)
		} else if (setState != undefined){
			setState(!checked)
		}
	}

    return (
        <div className={cn(style.checkbox, className)}>
            <input className={style.checkbox__input}
				id={`checkbox${idNumber}`}
                type={'checkbox'}
				checked={checked}
				onChange={onChange || handleChange}
				disabled={isDisabled}
				ref={refCheckbox}
				value={children}
				 />
			<label className={cn(style.checkbox__label)}
				htmlFor={`checkbox${idNumber}`}
				children={children} />
        </div>
    )
}