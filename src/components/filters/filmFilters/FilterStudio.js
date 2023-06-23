import { useDispatch, useSelector } from 'react-redux';
import { selectStudio } from '../../../store/slices/filterFilm';
import { studios } from '../../../store/slices/copyrightSlice';

import { fetchCopyright } from '../../../store/actions/copyrightActions';
import { useEffect } from 'react';
import MultiSelect from '../../ui/MultiSelect/MultiSelect';

export default function FilterStudio ({className}) {
	const dispatch = useDispatch();
	const { copyright } = useSelector(studios)
	const { studio } = useSelector(state => state.filter);
	// getting studio from backend
	useEffect(() => {
		dispatch(fetchCopyright())
	}, []);

	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectStudio(e))
	}

	return(
		<MultiSelect className={className}
			optionList={copyright}
			selectValue={'id'}
			selectLabel={'name'}
			placeholder={'Выберите...'}
			onChange={handleChange}
			value={studio}
			selectType={'selectCheckbox'} />
	)
}
