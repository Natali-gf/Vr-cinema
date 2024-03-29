import style from './style.module.scss';
import FilterButton from '../../ui/FilterButton/FilterButton';
import React, { useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import FilmSort from '../../filters/filmFilters/Sort';
import CinemaSort from '../../filters/cinemaFilters/Sort';
import FranchiseeSort from '../../filters/franchiseeFilters/Sort';

function FilterPanel({className, filterParams}) {
	const dispatch = useDispatch();
	const [sortListVisible, setSortListVisible] = useState(false);

	//style
	const classActiveSort = cn(filterParams.filterState.activeSort ? style.sort_active : '');
	const rotateArrow = cn(sortListVisible ? 'icon_arrow_down' : 'icon_arrow_down_after');
	const sortIcon = cn(filterParams.filterState.ascSort ? 'icon_sort' : 'icon_sort_after');
	const classActiveFilter = cn(filterParams.filterState.activeFilter ? style.active : '');

	//sort button
	const sortReverse = () => {
		if(filterParams.filterState.sort != ''){
			let reverse = filterParams.filterState.sorted.toReversed()
			dispatch(filterParams.currentSort(reverse))
			dispatch(filterParams.setDescSort(!filterParams.filterState.ascSort))
		}
	}

	//sort menu
	function showSortMenu(e) {
		setSortListVisible(!sortListVisible);
		if (e.target?.value === 0 || filterParams.filterState.sort != '') {
			dispatch(filterParams.setActiveSort(true))
			if(e.target?.value === 0){
				dispatch(filterParams.setDescSort(true))
				dispatch(filterParams.showClearBtnSort(true))
			}
		} else {
			dispatch(filterParams.setActiveSort(!filterParams.filterState.activeSort))
		}
	}

	React.useEffect(() => {
		return () => {
			if(filterParams.filterState.activeSort && filterParams.filterState.sort == ''){
				dispatch(filterParams.setActiveSort(false))
			}
		}
    }, []);

	//clear sort - behave button and remove state of sort in store to initial state
	function onClickClearSort() {
		dispatch(filterParams.showClearBtnSort(false))
		setSortListVisible(false)
		dispatch(filterParams.selectSort(''))
		dispatch(filterParams.currentSort('initialState'))
		dispatch(filterParams.setActiveSort(false))
		dispatch(filterParams.setDescSort(true));
	}

	//open filter options
	function showFilterOptions (e) {
		dispatch(filterParams.setFilterVisible(!filterParams.filterState.filterVisible));
		if(!filterParams.filterState.clearFilter){
			dispatch(filterParams.setActiveFilter(!filterParams.filterState.activeFilter))
		}
	};

	//clear all filters and clear filter state to initial
	function onClickClearFilter() {
		dispatch(filterParams.showClearBtnFilter(!filterParams.filterState.clearFilter));
		dispatch(filterParams.clearAllFilter());
		dispatch(filterParams.setActiveFilter(false));
		dispatch(filterParams.setFilterVisible(false))
		dispatch(filterParams.resetAllButton('reset'));
	}

	const Sort = () => {
		return (
			<>
			{filterParams.filterName === 'film' &&
				<FilmSort className={style.sortList}
				setDesc={filterParams.setDescSort}/>}
			{filterParams.filterName === 'cinema' &&
				<CinemaSort className={style.sortList}
				setDesc={filterParams.setDescSort}/>}
			{filterParams.filterName === 'franchisee' &&
				<FranchiseeSort className={style.sortList}
				setDesc={filterParams.setDescSort}/>}
			</>
		)
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
							<Sort />}
						</FilterButton>
						{filterParams.filterState.clearBtnSort &&
							<div className={cn(style.sort__clear, 'icon_close')}
								onClick={onClickClearSort}/>}
					</div>
					<FilterButton className={cn(style.filterPanel__filter, style.filter, classActiveFilter, 'icon_filter')}
						onClick={showFilterOptions}
						children={'Фильтр'}/>
					{filterParams.filterState.clearFilter &&
						<button className={cn(style.filter__clear, 'icon_close')}
							onClick={onClickClearFilter}/>}
				</div>
			</div>
		</>
	);
}

export default FilterPanel;