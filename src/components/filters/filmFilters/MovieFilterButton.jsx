import style from '../style.module.scss';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentFilter, clearCurrentFilter, setFilterVisible, setActiveFilter, showClearBtnFilter } from '../../../store/slices/filterFilm';
import MainButton from '../../ui/MainButton/MainButton';
// import { filmFiltration } from '../../../helpers/helpers';

//filtration
export function filmFiltration(films, filtered, genre, studio, yearFrom, yearTo, language){
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
						item.year >= yearFrom.year))}
		if (yearTo) {
			filteredFilms = filteredFilms.filter((item) => (
					item.year <= yearTo.year))}
		if (language.length) {
			filteredFilms = filteredFilms.filter((item) => (
				item.language.some((filter) => (
					language.some((elem) => (
						elem.name.toLowerCase() === filter.toLowerCase()))))))}
						
		return filteredFilms;
	}
}

export default function MovieFilterButton({className}) {
	//filters states (redux)
	const {	genre, studio, yearFrom, yearTo, language, filtered } = useSelector(state => state.filter);
	const {	films } = useSelector(state => state.films);
	const dispatch = useDispatch();

	//button Apply
	const [btnIsDisabled, setBtnIsDisabled] = useState(true)
	//subscribe to filter state changes
	useEffect(() => {
		if (!genre.length &&
			!studio.length &&
			!yearFrom && !yearTo &&
			!language.length){
			setBtnIsDisabled(true);
			dispatch(showClearBtnFilter(false));
			clearCurrentFilter();
			dispatch(currentFilter(filmFiltration(films, filtered, genre, studio, yearFrom, yearTo, language)));
		} else {
			setBtnIsDisabled(false);
		}
	}, [genre.length,
		studio.length,
		yearFrom, yearTo,
		language.length])

	//click on button Apply
	function handleApplyClick (e){
		e.preventDefault();
		dispatch(setFilterVisible(false));
		dispatch(currentFilter(filmFiltration(films, filtered, genre, studio, yearFrom, yearTo, language)));
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
