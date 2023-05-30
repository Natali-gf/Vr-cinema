import style from './style.module.scss';
import AddFilm from '../AddFilm/AddFilm';
import FilterButton from '../FilterButton/FilterButton';
import FilterOptions from '../FilterOptions/FilterOptions';
import { useState, useRef } from 'react';
import cn from 'classnames';
import SelectSort from '../Select/SelectSort';
import { useSelector, useDispatch } from 'react-redux';
import { currentSort, selectSort, clearAllFilter, resetAll } from "../../store/slices/filterSlice";

function FilterPanel({filterVisible, setFilterVisible, films}) {
	//sort state from store
	const { sorted, sort } = useSelector(state => state.filter);
	const dispatch = useDispatch();
	// local states for style
	const [toggleDropdown, setToggleDropdown] = useState(true);
	const [toggleSortList, settoggleSortList] = useState(true);
	const [asc, setDesc] = useState(true);
	const [activeSort, setActiveSort] = useState(false);
	const [activeFilter, setActiveFilter] = useState(false);
	const [clearSort, setClearSort] = useState(true);
	const [clearFilter, setClearFilter] = useState(true);

	//style
	const filterOptions = cn(toggleDropdown ? 'hidden' : '');
	const showSort = cn(style.sortList, toggleSortList ? 'hidden' : '');
	const classActive = cn(activeSort ? style.sort_active : '');
	const rotateArrow = cn(activeSort ? 'icon_arrow_down' : 'icon_arrow_down_after');
	const sortIcon = cn(asc ? 'icon_sort' : 'icon_sort_after');
	const clearSortButton = cn(clearSort ? 'hidden' : '');
	const clearfilterButton = cn(clearFilter ? 'hidden' : '');
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
		settoggleSortList(!toggleSortList);
		if (e.target.value === 0 || sort != '') {
			setActiveSort(true)
			setClearSort(false)
		} else {
			setActiveSort(!activeSort)
		}
	}

	//clear sort - behave button and remove state of sort in store to initial state
	function onClickClearSort() {
		setClearSort(true)
		settoggleSortList(true)
		dispatch(selectSort(''))
		dispatch(currentSort('initialState'))
		setActiveSort(false)
		resetSelectField()
	}

	//open filter options
	function showFilterOptions (e) {
		setToggleDropdown(!toggleDropdown);
		// setActiveFilter(!activeFilter)
		if(clearFilter){
			setActiveFilter(!activeFilter)
		}
			const nameButton = e.target.value
			if (nameButton === "фильтр") {
				setFilterVisible(!filterVisible)
			}
	};

	//clear all filters and clear filter state to initial
	function onClickClearFilter() {
		setClearFilter(!clearFilter);
		dispatch(clearAllFilter());
		setActiveFilter(false);
		setToggleDropdown(true);
		dispatch(resetAll('reset'));
	}

	return (
		<>
			<div className={style.filterPanel}>
				<div className={style.filterPanel__container} >
					<div className={style.filterPanel__filters} >
						<div className={cn(style.filterPanel__sort, style.sort, classActive)}>
							<FilterButton className={cn(style.sort__button, sortIcon)}
								onClick={sortReverse} />
							<FilterButton className={cn(style.sort__dropDownMenu, rotateArrow)}
								onClick ={showSortMenu}>Сортировать по
								<SelectSort	className={showSort}
									multiselectRef={multiselectRef}
									films={films}/>
							</FilterButton>
							<div className={cn(style.sort__clear, 'icon_close', clearSortButton)}
								onClick={onClickClearSort}/>
						</div>
						<FilterButton className={cn(style.filter, filterOptions, classActiveFilter, 'icon_filter')}
							onClick={showFilterOptions}
							children={'Фильтр'}
							value='фильтр'/>
						<button className={cn(style.filter__clear, 'icon_close', clearfilterButton)} onClick={onClickClearFilter}/>
					</div>
					<AddFilm className={style.filterPanel__addFilm} />
				</div>
			</div>
			<FilterOptions className={filterOptions} setFilterVisible={setFilterVisible} toggleDropdown={toggleDropdown} setToggleDropdown={setToggleDropdown} setClearFilter={setClearFilter} setActiveFilter={setActiveFilter} films={films}/>
		</>
	);
}

export default FilterPanel;