import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MultiSelect from '../../ui/select/MultiSelect';
import { selectOwner } from '../../../store/slices/filterCinema';
import { getFranchiseeRequest } from '../../../store/actions/franchiseeAction';

export default function FilterOwner({className}) {
	const dispatch = useDispatch();
	const { franchisee } = useSelector(state => state.franchisee);
	const filterCity = useSelector(state => state.filterCinema);

	// getting city from backend
	useEffect(() => {
		dispatch(getFranchiseeRequest());
	}, []);

	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectOwner(e));
	}

	return(
		<MultiSelect className={className}
			optionList={franchisee}
			selectValue={'id'}
			selectLabel={'name'}
			placeholder={'Выберите...'}
			onChange={handleChange}
			value={filterCity.owner}
			selectType={'selectCheckbox'} />
	)
}
