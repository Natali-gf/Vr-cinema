import style from '../style.module.scss';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentFilter, clearCurrentFilter, setFilterVisible, setActiveFilter, showClearBtnFilter } from '../../../store/slices/filterFilm';
import MainButton from '../../ui/MainButton/MainButton';

export default function MovieFilterButton({className}) {
	//filters states (redux)
	const {	genre, studio, yearFrom, yearTo, language, filtered } = useSelector(state => state.filter);
	const {	films } = useSelector(state => state.films);
	const dispatch = useDispatch();

	//filtration
	function getSelectedFilters(){
		if(films.length || filtered != 'initialState'){
			let filteredFilms = films;
			if (genre.length) {
				filteredFilms = filteredFilms.filter((item) => (
					item.category.some((filter) => (
						genre.some((elem) => (
							elem.name === filter))))))}
			if (studio.length) {
				filteredFilms = filteredFilms.filter((item) => (
					item.copyright_holder.some((filter) => (
						studio.some((elem) => (
							elem.name === filter))))))}
			if (yearFrom) {
				filteredFilms = filteredFilms.filter((item) => (
							item.year >= yearFrom.year));console.log(filteredFilms)}
			if (yearTo) {
				filteredFilms = filteredFilms.filter((item) => (
						item.year <= yearTo.year));console.log(filteredFilms)}
			if (language.length) {
				filteredFilms = filteredFilms.filter((item) => (
					item.language.some((filter) => (
						language.some((elem) => (
							elem.name.toLowerCase() === filter.toLowerCase()))))))}
			//update filters state
			dispatch(currentFilter(filteredFilms))
		}
	}

	//button Apply
	const [btnIsDisabled, setBtnIsDisabled] = useState(true)
	//subscribe to filter state changes
	useEffect(() => {
		if (!genre.length &&
			!studio.length &&
			!yearFrom && !yearTo &&
			!language.length){
			setBtnIsDisabled(true);
			dispatch(showClearBtnFilter(false))
			clearCurrentFilter()
			getSelectedFilters()
		} else {
			setBtnIsDisabled(false)
		}
	}, [genre.length,
		studio.length,
		yearFrom, yearTo,
		language.length])

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
