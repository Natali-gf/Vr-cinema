import style from './style.module.scss';
import cn from 'classnames';
import React from 'react';

export default function Radio (props) {
	const [checked, setChecked] = React.useState(props.isChecked || false);
	let idNumber = Math.random();

	const handleChange = (e) => {
		setChecked(!checked);

		if(props.nameField){
			props.setState(props.nameField, !checked)
		} else if (props.setState != undefined){
			props.setState(!checked)
		}
	}
	
    return (
        <div className={cn(style.radio, props.className)}>
            <input className={style.radio__input}
				id={props.id || `radio${idNumber}`}
                type={'radio'}
				name={props.name}
				checked={props.isChecked != undefined ? props.isChecked : null}
				onChange={props.onChange || handleChange}
				disabled={props.isDisabled}
				value={props.children}
				onClick={props.onClick} />
			<label className={cn(style.radio__label)}
				htmlFor={props.id || `radio${idNumber}`}
				children={props.children} />
        </div>
    )
}