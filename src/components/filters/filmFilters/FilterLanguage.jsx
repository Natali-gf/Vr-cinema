import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectLang } from '../../../store/slices/filterFilm';
import MultiSelect from '../../ui/select/MultiSelect';
import { getLanguageRequest } from '../../../store/actions/languageActions';

export default function FilterLanguage ({className}) {
	const dispatch = useDispatch();
	const languageList = useSelector(state => state.language);
	const {	language } = useSelector(state => state.filter);

	// getting genre from backend
	useEffect(() => {
		dispatch(getLanguageRequest())
	}, []);

	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectLang(e))
	}
	
	return(
		<MultiSelect className={className}
			optionList={languageList.language}
			selectValue={'id'}
			selectLabel={'name'}
			placeholder={'Выберите...'}
			onChange={handleChange}
			value={language}
			selectType={'selectCheckbox'} />
	)
}
