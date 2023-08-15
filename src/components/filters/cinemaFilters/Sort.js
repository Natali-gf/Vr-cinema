import Multiselect from "multiselect-react-dropdown";
import { cinemaSortBy, sortData } from "../../../data/constans";
import cn from "classnames";
import moment from 'moment';
import '../sort-style.scss';
import { useDispatch, useSelector } from "react-redux";
import { currentSort, selectSort } from "../../../store/slices/filterCinema";

function Sort({className, multiselectRef, setDesc}) {
	const dispatch = useDispatch()
	const {	cinema } = useSelector(state => state.cinema);
	//sort
	const getSortBy = (e) => {
		let sortedFilms = cinema;
		console.log(sortedFilms)
		if (e[0] ==='Названию') {
				sortedFilms = [...sortedFilms].sort((a,b) => {
					if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
					if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					return 0;
				})
			} else if (e[0] ==='Франчайзи'){
				sortedFilms = [...sortedFilms].sort((a,b) => {
					if(a.franchisee.toLowerCase() < b.franchisee.toLowerCase()) return -1;
					if(a.franchisee.toLowerCase() > b.franchisee.toLowerCase()) return 1;
					return 0;
				})
			}
			console.log(sortedFilms)
		// update sort state
		dispatch(currentSort(sortedFilms))
		setDesc(true)
	}

	return (
		<div className={cn('customSingleSelect', 'sortList', className)}>
			<Multiselect
				isObject={false}
				onSelect={(e) => {dispatch(selectSort(e));getSortBy(e)}}
				options={cinemaSortBy.map(el => el.name)}
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