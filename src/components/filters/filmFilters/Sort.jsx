import Multiselect from "multiselect-react-dropdown";
import { filmSortBy, sortData } from "../../../data/constans";
import cn from "classnames";
import moment from 'moment';
import '../sort-style.scss';
import { useDispatch, useSelector } from "react-redux";
import { currentSort, selectSort } from "../../../store/slices/filterFilm";

//sort
export const getSortBy = (e, films) => {
	let sortedFilms = films;
	if (e[0] ==='Алфавиту') {
			sortedFilms = [...sortedFilms].sort()
		} else if (e[0] ==='Дате добавления'){
			sortedFilms = [...sortedFilms].sort((a,b)=>
						(+moment(a.date_add, 'yyyy-mm-dd')) - (+moment(b.date_add, 'yyyy-mm-dd')))
		} else if (e[0] ==='Году создания'){
			sortedFilms = [...sortedFilms].sort((a,b)=>
						a.year - b.year)
		} else if (e[0] ==='Времени'){
			sortedFilms = [...sortedFilms].sort((a,b)=>
						(+moment(a.duration, 'hh:mm:ss')) - (+moment(b.duration, 'hh:mm:ss')))}
						
	return sortedFilms;
}

function Sort({className, setDesc}) {
	const dispatch = useDispatch()
	const {	films } = useSelector(state => state.films);

	return (
		<div className={cn('customSingleSelect', 'sortList', className)}>
			<Multiselect
				isObject={false}
				onSelect={(e) => {
					dispatch(selectSort(e));
					dispatch(currentSort(getSortBy(e, films)));
					setDesc(true)}}
				options={filmSortBy.map(el => el.name)}
				avoidHighlightFirstOption={true}
				placeholder=''
				hidePlaceholder={true}
				selectedValues={[]}
				hideSelectedList={true}
				singleSelect/>
		</div>
	)
}

export default Sort;