import '../select-style.scss';
import Select from 'react-select'
import cn from 'classnames';
import { useRef } from 'react';

const styleProxy = new Proxy({}, {
	  get: () => () => {}
});

export default function SingleSelect({className, optionList, selectValue, selectLabel, placeholder, onChange, selectType, value}) {
	const selectRef = useRef()
	return(
		<Select
			styles={styleProxy}
			classNamePrefix={'customSelect'}
			className={cn(className, selectType)}
  			getOptionValue={(option) => `${option[selectValue ?? 'value']}`}
			getOptionLabel={(option) => `${option[selectLabel ?? 'label']}`}
			options={optionList}
			onChange={onChange}
			value={value}
			hideSelectedOptions={false}
			isSearchable={false}
			placeholder={placeholder}
			ref={selectRef}
			// isClearable
			// menuIsOpen={true}
		/>
	)
}
