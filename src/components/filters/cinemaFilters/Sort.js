import Multiselect from "multiselect-react-dropdown";
import { cinemaSortBy } from "../../../data/constans";
import cn from "classnames";
import '../sort-style.scss';
import { useDispatch, useSelector } from "react-redux";
import { currentSort, selectSort } from "../../../store/slices/filterCinema";

function Sort({className, multiselectRef, setDesc}) {
	const dispatch = useDispatch()
	const {	cinema } = useSelector(state => state.cinema);
	//sort
	const getSortBy = (e) => {
		let sortedCinema = cinema;
		if (e[0] ==='Названию') {
				sortedCinema = [...sortedCinema].sort((a,b) => {
					if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
					if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					return 0;
				})
			} else if (e[0] ==='Франчайзи'){
				sortedCinema = [...sortedCinema].sort((a,b) => {
					if(a.franchisee.name.toLowerCase() < b.franchisee.name.toLowerCase()) return -1;
					if(a.franchisee.name.toLowerCase() > b.franchisee.name.toLowerCase()) return 1;
					return 0;
				})
			}
		// update sort state
		dispatch(currentSort(sortedCinema));
		setDesc(true);
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