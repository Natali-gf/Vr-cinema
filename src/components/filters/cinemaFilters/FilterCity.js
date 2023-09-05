import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MultiSelect from '../../ui/select/MultiSelect';
import { selectCity } from '../../../store/slices/filterCinema';
import { getCityRequest } from '../../../store/actions/cityActions';

export default function FilterCity({className}) {
	const dispatch = useDispatch();
	const { city } = useSelector(state => state.city);
	const filterCinema = useSelector(state => state.filterCinema);

	// getting TypeCinema from backend
	useEffect(() => {
		dispatch(getCityRequest());
	}, []);

	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectCity(e));
	}

	return(
		<MultiSelect className={className}
			optionList={city}
			selectValue={'id'}
			selectLabel={'name'}
			placeholder={'Выберите...'}
			onChange={handleChange}
			value={filterCinema.city}
			selectType={'selectCheckbox'} />
	)
}
