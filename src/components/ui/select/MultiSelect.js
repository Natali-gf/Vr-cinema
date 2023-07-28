import './select-style.scss';
import style from '../Input/style.module.scss';
import Select from 'react-select'
import cn from 'classnames';
import React, { useRef } from 'react';

const styleProxy = new Proxy({}, {
	  get: () => () => {}
});

export default function MultiSelect({className, classError, optionList, selectValue, selectLabel, placeholder, onChange, selectType, value, defaultValue, isDisabled, labelBefore, labelAfter, id}) {

	return(
		<>
			{labelBefore &&
			<label className={cn(style.field__label)}
				htmlFor={id}>
					{labelBefore}
			</label>}
				<Select
					styles={styleProxy}
					classNamePrefix={cn(classError ? 'customSelectError' : 'customSelect')}
					className={cn(selectType, className)}
					isMulti
					getOptionValue={(option) => `${option[selectValue]}`}
					getOptionLabel={(option) => `${option[selectLabel]}`}
					options={optionList}
					defaultValue={defaultValue}
					onChange={onChange}
					value={value}
					hideSelectedOptions={false}
					isSearchable={false}
					placeholder={placeholder}
					isDisabled={isDisabled}
					id={id}
					// menuIsOpen={true}
				/>
			{labelAfter &&
			<label className={cn(style.field__label)}
				htmlFor={id}>
					{labelAfter}
			</label>}
		</>
	)
}
