
import style from './style.module.scss';
import cn from 'classnames';
import React from 'react';
import { PatternFormat } from 'react-number-format';


export default function Input (props) {
	const [inputValue, setInputValue] = React.useState(props.defaultValue || '');
	const [typeInput, setTypeInput] = React.useState(props.type)
	const inputRef = React.useRef();
	let idNumber = Math.random();
	
	const handleChange = (e) => {
		e.preventDefault();
		if(e.target.name === 'clearButton'){
			if(props.setValue){
				props.setValue(props.nameField, '');
			} else {
				setInputValue('');
			}
		} else {
			if(props.type === 'number'){
				setInputValue(e.target.value.replace(/\D/g, ""))
			} else {
				setInputValue(e.target.value)
			}

		}
	}

	const showPassword = (e) => {
		e.preventDefault();
		setTypeInput(typeInput === 'password' ? 'text' : 'password');
	}

    return (
        <div className={cn(style.field, props.className)}>
			{props.labelBefore &&
			<label className={cn(style.field__label)}
				htmlFor={`input${idNumber}`}>
					{props.labelBefore}
			</label>}
				<div className={cn(style.field__box, {[style.field__box_error]: props.classError})}>
					{!props.format &&
						<input className={style.field__input}
							id={`input${idNumber}`}
							tabIndex={props.tabIndex}
							type={typeInput || 'text'}
							accept={props.accept}
							name={props.nameField || props.name}
							placeholder={props.placeholder}
							autoComplete={props.autoComplete || 'off'}
							disabled={props.isDisabled}
							onChange={props.onChange || handleChange}
							onKeyDown={props.onKeyDown}
							pattern={props.pattern}
							{...(props.nameField ? {} : {value: inputValue})}
							defaultValue={props.defaultValue}
							// {...(props.nameField ? {props.defaultValue: props.defaultValue} : {})}
							{...(props.nameField ? {} : {ref: inputRef})}
							{...props.register ? {...props.register(props.nameField, props.validation)} : ''} />}
					{props.format &&
						<PatternFormat className={style.field__input}
							autoComplete={props.autoComplete || 'off'}
							placeholder={props.placeholder}
								format={props.format}
								patternChar={props.patternChar}
								mask={props.mask}
								value={props.watch}
								onValueChange={props.onValueChange}
								defaultValue={props.defaultValue}
								disabled={props.isDisabled} />}

					{(props.watch || inputValue) && !props.isDisabled && props.type !== 'password' &&
						<button className={cn(style.field__clearButton, 'icon_close')}
							name={'clearButton'}
							type={'button'}
							onClick={handleChange} />}
						{props.type === 'password' &&
							<button className={cn(style.field__password, 'icon_eye_password', {[style.field__password_show]: typeInput === 'text'} )}
								type={'button'}
								onClick={showPassword} >
								<img src="" alt="" />
							</button>
						}
				</div>
			{props.labelAfter &&
			<label className={cn(style.field__label)}
				htmlFor={`input${idNumber}`}>
					{props.labelAfter}
			</label>}
        </div>
    )
}