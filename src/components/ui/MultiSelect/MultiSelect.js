import '../select-style.scss';
import Select from 'react-select'
import cn from 'classnames';

const styleProxy = new Proxy({}, {
	  get: () => () => {}
});

export default function MultiSelect({className, optionList, selectValue, selectLabel, placeholder, onChange, selectType, value}) {

	return(
		<Select
			styles={styleProxy}
			classNamePrefix={'customSelect'}
			className={cn(className, selectType)}
			isMulti
  			getOptionValue={(option) => `${option[selectValue]}`}
			getOptionLabel={(option) => `${option[selectLabel]}`}
			options={optionList}
			onChange={onChange}
			value={value}
			hideSelectedOptions={false}
			isSearchable={false}
			placeholder={placeholder}
			// menuIsOpen={true}
		/>
	)
}
