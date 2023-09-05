import style from '../style.module.scss';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentFilter, clearCurrentFilter, setFilterVisible, setActiveFilter, showClearBtnFilter } from '../../../store/slices/filterCinema';
import MainButton from '../../ui/MainButton/MainButton';

export default function CinemaFilterButton() {
	//filters states (redux)
	const {	city, owner, typeCinema, filtered } = useSelector(state => state.filterCinema);
	const {	cinema } = useSelector(state => state.cinema);
	const dispatch = useDispatch();

	//filtration
	function getSelectedFilters(){
		if(cinema.length || filtered != 'initialState'){
			let filteredCinema = cinema;
			if (city.length) {
				filteredCinema = filteredCinema.filter((item) => (
					city.some((elem) => (
						elem.name === item.city))))}
			if (owner.length) {
				filteredCinema = filteredCinema.filter((item) => (
					owner.some((elem) => (
						elem.name === item.franchisee))))}
			if (typeCinema.length) {
				filteredCinema = filteredCinema.filter((item) => (
					typeCinema.some((elem) => (
						elem.name === item.type_cinema))))}
			//update filters state
			dispatch(currentFilter(filteredCinema))
		}
	}

	//button Apply
	const [btnIsDisabled, setBtnIsDisabled] = useState(true)
	//subscribe to filter state changes
	useEffect(() => {
		if (!city.length &&
			!owner.length &&
			!typeCinema.length){
			setBtnIsDisabled(true);
			dispatch(showClearBtnFilter(false));
			clearCurrentFilter();
			getSelectedFilters();
		} else {
			setBtnIsDisabled(false)
		}
	}, [city.length,
		owner.length,
		typeCinema.length])

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
