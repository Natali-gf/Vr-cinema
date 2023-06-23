import { useDispatch, useSelector } from 'react-redux';
import { selectYearTo } from '../../../store/slices/filterFilm';
import { years } from '../../../data/constans'
import SingleSelect from '../../ui/SingleSelect/SingleSelect';

export default function FilterYearTo ({className}) {
	const dispatch = useDispatch();
	const {	yearTo } = useSelector(state => state.filter);
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
			selectType={'selectYear'} />
	)
}