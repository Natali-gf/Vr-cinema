import Multiselect from "multiselect-react-dropdown";
import { sort, sortData } from "./filtersData";
import cn from "classnames";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { currentSort, selectSort } from "../../store/slices/filterSlice";

function SelectSort({className, films, multiselectRef }) {
	const dispatch = useDispatch()

	//sort
	const getSortBy = (e) => {
		let sortedFilms = films;
		if (e[0] ==='Алфавиту') {
				sortedFilms = [...sortedFilms].sort()
			} else if (e[0] ==='Дате добавления'){
				sortedFilms = [...sortedFilms].sort((a,b)=>
							(+moment(a.duration, 'yyyy-mm-dd')) - (+moment(b.duration, 'yyyy-mm-dd')))
			} else if (e[0] ==='Году создания'){
				sortedFilms = [...sortedFilms].sort((a,b)=>
							a.year - b.year)
			} else if (e[0] ==='Времени'){
				sortedFilms = [...sortedFilms].sort((a,b)=>
							(+moment(a.duration, 'hh:mm:ss')) - (+moment(b.duration, 'hh:mm:ss')))}
		// update sort state
		dispatch(currentSort(sortedFilms))
	}

	return (
		<div className={cn('customSingleSelect', 'sortList', className)}>
			<Multiselect
				isObject={false}
				onSelect={(e) => {dispatch(selectSort(e));getSortBy(e)}}
				options={sortData}
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

export default SelectSort;