import { useDispatch, useSelector } from 'react-redux';
import { selectYearTo } from '../../../store/slices/filterFilm';
import { currentYear } from '../../../data/constans';
import { getYears } from '../../../helpers/helpers';
import SingleSelect from '../../ui/select/SingleSelect';
import { useEffect, useState } from 'react';

export default function FilterYearTo ({className}) {
	const dispatch = useDispatch();
	const {	yearFrom, yearTo } = useSelector(state => state.filter);
	const [ years, setYears] = useState('');

	useEffect(() => {
		setYears(getYears(currentYear, yearFrom, ''))
	}, [yearFrom, yearTo]);
	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectYearTo(e))
	}

	return(
		<SingleSelect className={className}
			optionList={years}
			selectValue={'value'}
			selectLabel={'year'}
			placeholder={'По...'}
			onChange={handleChange}
			value={yearTo}
			selectType={'selectYear'}
			isClearable={true} />
	)
}