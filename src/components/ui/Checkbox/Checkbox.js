import style from './style.module.scss';
import cn from 'classnames';
import React from 'react';

export default function Checkbox (props) {
	const [checked, setChecked] = React.useState(props.isChecked || false);
	let idNumber = Math.random();
	const refCheckbox = React.useRef()

	const handleChange = (e) => {
		setChecked(!checked)

		if(props.nameField){
			props.setState(props.nameField, !checked)
		} else if (props.setState != undefined){
			props.setState(!checked)
		}
	}
	
    return (
        <div className={cn(style.checkbox, props.className)}>
            <input className={style.checkbox__input}
				id={`checkbox${idNumber}`}
                type={'checkbox'}
				checked={checked}
				onChange={props.onChange || handleChange}
				disabled={props.isDisabled}
				ref={refCheckbox} />
			<label className={cn(style.checkbox__label)}
				htmlFor={`checkbox${idNumber}`}
				children={props.children} />
        </div>
    )
}