import { useDispatch, useSelector } from 'react-redux';
import { selectGenre } from '../../../store/slices/filterFilm';
import { categories } from '../../../store/slices/categorySlice';
import { fetchCategory } from '../../../store/actions/categoryActions';
import { useEffect } from 'react';
import MultiSelect from '../../ui/MultiSelect/MultiSelect';

export default function FilterGenre({className}) {
	const dispatch = useDispatch();
	const { category } = useSelector(categories);
	const {	genre } = useSelector(state => state.filter);

	// getting genre from backend
	useEffect(() => {
		dispatch(fetchCategory())
	}, []);

	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectGenre(e))
	}

	return(
		<MultiSelect className={className}
			optionList={category}
			selectValue={'id'}
			selectLabel={'name'}
			placeholder={'Выберите...'}
			onChange={handleChange}
			value={genre}
			selectType={'selectCheckbox'} />
	)
}
