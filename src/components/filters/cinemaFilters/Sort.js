import Multiselect from "multiselect-react-dropdown";
import { sortBy, sortData } from "../../../data/constans";
import cn from "classnames";
import moment from 'moment';
import '../sort-style.scss';
import { useDispatch, useSelector } from "react-redux";
import { currentSort, selectSort } from "../../../store/slices/filterFilm";

function Sort({className, multiselectRef, setDesc}) {
	const dispatch = useDispatch()
	const {	films } = useSelector(state => state.films);
	//sort
	const getSortBy = (e) => {
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
		// update sort state
		dispatch(currentSort(sortedFilms))
		setDesc(true)
	}

	return (
		<div className={cn('customSingleSelect', 'sortList', className)}>
			<Multiselect
				isObject={false}
				onSelect={(e) => {dispatch(selectSort(e));getSortBy(e)}}
				options={sortBy.map(el => el.name)}
				avoidHighlightFirstOption={true}
				placeholder=''
				hidePlaceholder={true}
				selectedValues={[]}
				hideSelectedList={true}
				ref={multiselectRef}
				singleSelect/>
		</div>
	)
}

export default Sort;