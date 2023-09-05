import Multiselect from "multiselect-react-dropdown";
import { franchiseeSortBy } from "../../../data/constans";
import cn from "classnames";
import '../sort-style.scss';
import { useDispatch, useSelector } from "react-redux";
import { currentSort, selectSort } from "../../../store/slices/filterFranchisee";

function Sort({className, multiselectRef, setDesc}) {
	const dispatch = useDispatch()
	const {	franchisee } = useSelector(state => state.franchisee);
	console.log(franchisee)
	//sort
	const getSortBy = (e) => {
		let sortedFranchisee = franchisee;
		if (e[0] === franchiseeSortBy[0].name) {
				sortedFranchisee = [...sortedFranchisee].sort((a,b) => {
					if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
					if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					return 0;
				})
			} else if (e[0] === franchiseeSortBy[1].name) {
				sortedFranchisee = [...sortedFranchisee].sort((a,b) => {
					if(a.username.toLowerCase() < b.username.toLowerCase()) return -1;
					if(a.username.toLowerCase() > b.username.toLowerCase()) return 1;
					return 0;
				})
			}
		// update sort state
		dispatch(currentSort(sortedFranchisee))
		setDesc(true)
	}

	return (
		<div className={cn('customSingleSelect', 'sortList', className)}>
			<Multiselect
				isObject={false}
				onSelect={(e) => {dispatch(selectSort(e));getSortBy(e)}}
				options={franchiseeSortBy.map(el => el.name)}
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