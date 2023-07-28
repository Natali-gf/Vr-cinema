
import style from './style.module.scss';
import cn from 'classnames';
import React from 'react';
import { PatternFormat } from 'react-number-format';


export default function Input ({className, classError, name, labelBefore, labelAfter, nameField, autoComplete, placeholder, defaultValue, isDisabled, register, validation, onChange, setValue, watch, format, patternChar, mask, onValueChange, type, onKeyDown}) {
	const [inputValue, setInputValue] = React.useState(defaultValue || '');
	const [typeInput, setTypeInput] = React.useState(type)
	const inputRef = React.useRef();
	let idNumber = Math.random();

	const handleChange = (e) => {
		e.preventDefault();
		if(e.target.name === 'clearButton'){
			if(setValue){
				setValue(nameField, '');
			} else {
				setInputValue('');
			}
		} else {
			setInputValue(e.target.value)
		}
	}

	const showPassword = (e) => {
		e.preventDefault();
		setTypeInput(typeInput === 'password' ? 'text' : 'password');
	}

    return (
        <div className={cn(style.field, className)}>
			{labelBefore &&
			<label className={cn(style.field__label)}
				htmlFor={`input${idNumber}`}>
					{labelBefore}
			</label>}
				<div className={cn(style.field__box, {[style.field__box_error]: classError})}>
					{!format &&
						<input className={style.field__input}
							id={`input${idNumber}`}
							type={typeInput || 'text'}
							name={nameField || name}
							placeholder={placeholder}
							autoComplete={autoComplete || 'off'}
							disabled={isDisabled}
							onChange={onChange || handleChange}
							onKeyDown={onKeyDown}
							{...(nameField ? {} : {value: inputValue})}
							defaultValue={defaultValue}
							// {...(nameField ? {defaultValue: defaultValue} : {})}
							{...(nameField ? {} : {ref: inputRef})}
							{...register ? {...register(nameField, validation)} : ''}
							/>}
					{format &&
						<PatternFormat className={style.field__input}
							autoComplete={autoComplete || 'off'}
							placeholder={placeholder}
								format={format}
								patternChar={patternChar}
								mask={mask}
								value={watch}
								onValueChange={onValueChange}
								defaultValue={defaultValue}
								disabled={isDisabled} />}

					{(watch || inputValue) && !isDisabled && type !== 'password' &&
						<button className={cn(style.field__clearButton, 'icon_close')}
							name={'clearButton'}
							onClick={handleChange} />}
						{type === 'password' &&
							<button className={cn(style.field__password, 'icon_eye_password', {[style.field__password_show]: typeInput === 'text'} )}
								onClick={showPassword} >
								<img src="" alt="" />
							</button>
						}
				</div>
			{labelAfter &&
			<label className={cn(style.field__label)}
				htmlFor={`input${idNumber}`}>
					{labelAfter}
			</label>}
        </div>
    )
}