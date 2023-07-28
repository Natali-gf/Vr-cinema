import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from '../../ui/select/MultiSelect';
import { franchiseeType } from '../../../data/constans';
import { selectTypeFranchisee } from '../../../store/slices/filterFranchisee';

export default function FilterTypeFranchisee({className}) {
	const dispatch = useDispatch();
	const { typeFranchisee } = useSelector(state => state.filterFranchisee);

	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectTypeFranchisee(e))
	}

	return(
		<MultiSelect className={className}
			optionList={franchiseeType}
			selectValue={'value'}
			selectLabel={'label'}
			placeholder={'Выберите...'}
			onChange={handleChange}
			value={typeFranchisee}
			selectType={'selectCheckbox'} />
	)
}
