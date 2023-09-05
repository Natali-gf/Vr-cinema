import './select-style.scss';
import style from '../Input/style.module.scss';
import Select from 'react-select'
import cn from 'classnames';

const styleProxy = new Proxy({}, {
	  get: () => () => {}
});

export default function SingleSelect(props) {
	
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
					className={cn(props.className, props.selectType)}
					getOptionValue={(option) => `${option[props.selectValue ?? 'value']}`}
					getOptionLabel={(option) => `${option[props.selectLabel ?? 'label']}`}
					options={props.optionList}
					defaultValue={props.defaultValue}
					onChange={props.onChange}
					value={props.value}
					hideSelectedOptions={false}
					isSearchable={false}
					placeholder={props.placeholder}
					isDisabled={props.isDisabled}
					isClearable={props.isClearable} />
			{props.labelAfter &&
			<label className={cn(style.field__label)}
				htmlFor={props.id}>
					{props.labelAfter}
			</label>}
		</>
	)
}
