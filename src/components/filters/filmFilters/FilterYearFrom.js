import { useDispatch, useSelector } from 'react-redux';
import { selectYearFrom } from '../../../store/slices/filterFilm';
import { years } from '../../../data/constans'
import SingleSelect from '../../ui/SingleSelect/SingleSelect';

export default function FilterYearFrom ({className}) {
	const dispatch = useDispatch();
	const {	yearFrom } = useSelector(state => state.filter);
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
			selectType={'selectYear'} />
	)
}