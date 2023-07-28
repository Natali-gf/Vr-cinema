import { useDispatch, useSelector } from 'react-redux';
import { selectYearFrom } from '../../../store/slices/filterFilm';
import { currentYear } from '../../../data/constans';
import { getYears } from '../../../helpers/helpers';
import SingleSelect from '../../ui/select/SingleSelect';
import { useEffect, useState } from 'react';

export default function FilterYearFrom ({className}) {
	const dispatch = useDispatch();
	const {	yearFrom, yearTo } = useSelector(state => state.filter);
	const [ years, setYears] = useState('');

	useEffect(() => {
		setYears(getYears(currentYear, '', yearTo))
	}, [yearFrom, yearTo]);

	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectYearFrom(e))
	}
	
	return(
		<SingleSelect className={className}
			optionList={years}
			selectValue={'value'}
			selectLabel={'year'}
			placeholder={'С...'}
			onChange={handleChange}
			value={yearFrom}
			selectType={'selectYear'}
			isClearable={true} />
	)
}