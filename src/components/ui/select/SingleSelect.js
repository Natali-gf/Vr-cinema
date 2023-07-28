import './select-style.scss';
import style from '../Input/style.module.scss';
import Select from 'react-select'
import cn from 'classnames';

const styleProxy = new Proxy({}, {
	  get: () => () => {}
});

export default function SingleSelect({className, classError, optionList, selectValue, selectLabel, placeholder, onChange, selectType, value, defaultValue, isDisabled, labelBefore, labelAfter, id,isClearable}) {

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
					className={cn(className, selectType)}
					getOptionValue={(option) => `${option[selectValue ?? 'value']}`}
					getOptionLabel={(option) => `${option[selectLabel ?? 'label']}`}
					options={optionList}
					defaultValue={defaultValue}
					onChange={onChange}
					value={value}
					hideSelectedOptions={false}
					isSearchable={false}
					placeholder={placeholder}
					isDisabled={isDisabled}
					isClearable={isClearable}
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
