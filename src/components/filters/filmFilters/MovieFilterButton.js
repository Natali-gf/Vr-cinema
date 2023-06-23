import style from './style.module.scss';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentFilter, clearCurrentFilter, setFilterVisible, setActiveFilter, setClearFilter } from '../../../store/slices/filterFilm';
import ApplyButton from '../../ui/ApplyButton/ApplyButton';
import useFiltration from './useFiltration';

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
			if (yearFrom.length) {
				filteredFilms = filteredFilms.filter((item) => (
						yearFrom.some((elem) => (
							item.year >= elem.year))));console.log(filteredFilms)}
			if (yearTo.length) {
				filteredFilms = filteredFilms.filter((item) => (
					yearTo.some((elem) => (
						item.year <= elem.year))));console.log(filteredFilms)}
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
			!yearFrom.length &&
			!yearTo.length &&
			!language.length){
			setBtnIsDisabled(true);
			dispatch(setClearFilter(false))
			clearCurrentFilter()
			getSelectedFilters()
		} else {
			setBtnIsDisabled(false)
		}
	}, [genre.length,
		studio.length,
		yearFrom.length,
		yearTo.length,
		language.length])

	//click on button Apply
	function handleApplyClick (e){
		e.preventDefault();
		dispatch(setFilterVisible(false));
		getSelectedFilters();
		dispatch(setClearFilter(true));
		dispatch(setActiveFilter(true));
	}

	return (
		<ApplyButton className={style.options__button}
			isDisabled={btnIsDisabled}
			onClick={handleApplyClick}>
			Применить
		</ApplyButton>
	);
}
