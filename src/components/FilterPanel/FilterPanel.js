import style from './style.module.scss';
// import AddButton from '../ui/AddButton/AddButton';
import FilterButton from '../ui/FilterButton/FilterButton';
// import FilterOptions from '../FilterOptions/FilterOptions';
import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { currentSort, selectSort, clearAllFilter, resetAllButton, setFilterVisible, setActiveFilter, setClearFilter } from "../../store/slices/filterFilm";
import Sort from '../filters/filmFilters/Sort';
// import { showAddFilm, showAddCinema, showAddFranchisee } from '../../store/slices/windowStateSlice';

function FilterPanel({className, buttonAdd}) {
	const dispatch = useDispatch();
	// states from store
	const { sorted, sort, filterVisible, activeFilter, clearFilter } = useSelector(state => state.filter);
	// local states for style
	const [sortListVisible, setSortListVisible] = useState(false);
	const [asc, setDesc] = useState(true);
	const [activeSort, setActiveSort] = useState(false);
	const [clearSort, setClearSort] = useState(false);

	//style
	const classActiveSort = cn(activeSort ? style.sort_active : '');
	const rotateArrow = cn(sortListVisible ? 'icon_arrow_down' : 'icon_arrow_down_after');
	const sortIcon = cn(asc ? 'icon_sort' : 'icon_sort_after');
	const classActiveFilter = cn(activeFilter ? style.active : '');

	//for reset sort choice
	const multiselectRef = useRef();
	const resetSelectField = () => {
		multiselectRef.current.resetSelectedValues();
	};

	//sort button
	const sortReverse = () => {
		if(sort != ''){
			let reverse = sorted.toReversed()
			dispatch(currentSort(reverse))
			setDesc(!asc)
		}
	}

	//sort menu
	function showSortMenu(e) {
		setSortListVisible(!sortListVisible);
		if (e.target.value === 0 || sort != '') {
			setActiveSort(true)
			setClearSort(true)
		} else {
			setActiveSort(!activeSort)
		}
	}

	//clear sort - behave button and remove state of sort in store to initial state
	function onClickClearSort() {
		setClearSort(false)
		setSortListVisible(false)
		dispatch(selectSort(''))
		dispatch(currentSort('initialState'))
		setActiveSort(false)
		// resetSelectField()
	}

	//open filter options
	function showFilterOptions (e) {
		dispatch(setFilterVisible(!filterVisible));
		if(!clearFilter){
			dispatch(setActiveFilter(!activeFilter))
		}
	};

	//clear all filters and clear filter state to initial
	function onClickClearFilter() {
		dispatch(setClearFilter(!clearFilter));
		dispatch(clearAllFilter());
		dispatch(setActiveFilter(false));
		dispatch(setFilterVisible(false))
		dispatch(resetAllButton('reset'));
	}

	return (
		<>
			<div className={cn(style.filterPanel, className)}>
				<div className={style.filterPanel__filters} >
					<div className={cn(style.filterPanel__sort, style.sort, classActiveSort)}>
						<FilterButton className={cn(style.sort__button, sortIcon)}
							onClick={sortReverse} />
						<FilterButton className={cn(style.sort__dropDownMenu, rotateArrow)}
							onClick ={showSortMenu}>Сортировать по
						{sortListVisible &&
							<Sort className={style.sortList}
								multiselectRef={multiselectRef}
								setDesc={setDesc} />}
						</FilterButton>
						{clearSort &&
							<div className={cn(style.sort__clear, 'icon_close')}
								onClick={onClickClearSort}/>}
					</div>
					<FilterButton className={cn(style.filterPanel__filter, style.filter, classActiveFilter, 'icon_filter')}
						onClick={showFilterOptions}
						children={'Фильтр'}/>
					{clearFilter &&
						<button className={cn(style.filter__clear, 'icon_close')}
							onClick={onClickClearFilter}/>}
				</div>
			</div>
		</>
	);
}

export default FilterPanel;