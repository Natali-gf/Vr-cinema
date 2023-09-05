import './select-style.scss';
import style from '../Input/style.module.scss';
import Select from 'react-select'
import cn from 'classnames';
import React from 'react';

const styleProxy = new Proxy({}, {
	  get: () => () => {}
});

export default function MultiSelect(props) {

	return(
		<>
			{props.labelBefore &&
			<label className={cn(style.field__label)}
				htmlFor={props.id}>
					{props.labelBefore}
			</label>}
				<Select
					styles={styleProxy}
					classNamePrefix={cn(props.classError ? 'customSelectError' : 'customSelect')}
					className={cn(props.selectType, props.className)}
					isMulti
					getOptionValue={(option) => `${option[props.selectValue]}`}
					getOptionLabel={(option) => `${option[props.selectLabel]}`}
					options={props.optionList}
					noOptionsMessage={() => props.noOptionsMessage || 'Упс! Пусто...'}
					defaultValue={props.defaultValue}
					onChange={props.onChange}
					value={props.value}
					hideSelectedOptions={false}
					isSearchable={false}
					placeholder={props.placeholder}
					isDisabled={props.isDisabled}
					id={props.id} />
			{props.labelAfter &&
			<label className={cn(style.field__label)}
				htmlFor={props.id}>
					{props.labelAfter}
			</label>}
		</>
	)
}
