import style from '../style.module.scss';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentFilter, clearCurrentFilter, setFilterVisible, setActiveFilter, showClearBtnFilter } from '../../../store/slices/filterFranchisee';
import MainButton from '../../ui/MainButton/MainButton';

export default function FranchiseeFilterButton() {
	//filters states (redux)
	const {	typeFranchisee, filtered } = useSelector(state => state.filterFranchisee);
	const {	franchisee } = useSelector(state => state.franchisee);
	const dispatch = useDispatch();

	//filtration
	function getSelectedFilters(){
		if(franchisee.length || filtered != 'initialState'){
			let filteredFranchisee = franchisee;
			if (typeFranchisee.length) {
				filteredFranchisee = filteredFranchisee.filter((item) => (
					typeFranchisee.some((elem) => (
						elem.label === item.ownership))))}

			//update filters state
			dispatch(currentFilter(filteredFranchisee))
		}
	}

	//button Apply
	const [btnIsDisabled, setBtnIsDisabled] = useState(true)
	//subscribe to filter state changes
	useEffect(() => {
		if (!typeFranchisee.length){
			setBtnIsDisabled(true);
			dispatch(showClearBtnFilter(false));
			clearCurrentFilter();
			getSelectedFilters();
		} else {
			setBtnIsDisabled(false)
		}
	}, [typeFranchisee.length])

	//click on button Apply
	function handleApplyClick (e){
		e.preventDefault();
		dispatch(setFilterVisible(false));
		getSelectedFilters();
		dispatch(showClearBtnFilter(true));
		dispatch(setActiveFilter(true));
	}

	return (
		<MainButton className={style.options__button}
			isDisabled={btnIsDisabled}
			onClick={handleApplyClick}>
			Применить
		</MainButton>
	);
}
