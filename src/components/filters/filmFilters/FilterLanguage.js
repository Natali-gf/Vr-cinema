import { useDispatch, useSelector } from 'react-redux';
import { selectLang } from '../../../store/slices/filterFilm';
import { lang } from '../../../data/constans';
import MultiSelect from '../../ui/MultiSelect/MultiSelect';

export default function FilterLanguage ({className}) {
	const dispatch = useDispatch();
	const {	language } = useSelector(state => state.filter);

	// select filter or remove it. then write down the state
	function handleChange(e) {
		dispatch(selectLang(e))
	}

	return(
		<MultiSelect className={className}
			optionList={lang}
			selectValue={'value'}
			selectLabel={'label'}
			placeholder={'Выберите...'}
			onChange={handleChange}
			value={language}
			selectType={'selectCheckbox'} />
	)
}
