import style from './style.module.scss';
import cn from 'classnames';
import React from 'react';

export default function Radio ({className, isChecked, children, setState, nameField, isDisabled, onChange, name, id, onClick}) {
	const [checked, setChecked] = React.useState(isChecked || false);
	// const [label, setLabel] = React.useState(isChecked || false);
	let idNumber = Math.random();
	const refCheckbox = React.useRef()

	React.useEffect(() =>{
		// console.log(refCheckbox.current.value)
	},[])

	const handleChange = (e) => {
		setChecked(!checked)
console.log(22)
		if(nameField){
			setState(nameField, !checked)
		} else if (setState != undefined){
			setState(!checked)
		}
	}

    return (
        <div className={cn(style.checkbox, className)}>
            <input className={style.checkbox__input}
				id={id || `radio${idNumber}`}
                type={'radio'}
				name={name}
				// {...isChecked ? {checked: isChecked} : ''}
				checked={isChecked != undefined ? isChecked : null}
				onChange={onChange || handleChange}
				disabled={isDisabled}
				// ref={refCheckbox}
				value={children}
				onClick={onClick}
				 />
			<label className={cn(style.checkbox__label)}
				htmlFor={id || `radio${idNumber}`}
				children={children} />
        </div>
    )
}