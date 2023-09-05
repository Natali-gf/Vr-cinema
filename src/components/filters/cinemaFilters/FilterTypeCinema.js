import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MultiSelect from '../../ui/select/MultiSelect';
import { getTypeCinemaRequest } from '../../../store/actions/typeCinemaActions';
import { selectTypeCinema } from '../../../store/slices/filterCinema';

export default function FilterTypeCinema({className}) {
	const dispatch = useDispatch();
	const { typeCinema } = useSelector(state => state.typeCinema);
	const filterCinema = useSelector(state => state.filterCinema);

	// getting TypeCinema from backend
	useEffect(() => {
		dispatch(getTypeCinemaRequest());
	}, []);

	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectTypeCinema(e));
	}

	return(
		<MultiSelect className={className}
			optionList={typeCinema}
			selectValue={'id'}
			selectLabel={'name'}
			placeholder={'Выберите...'}
			onChange={handleChange}
			value={filterCinema.typeCinema}
			selectType={'selectCheckbox'} />
	)
}
