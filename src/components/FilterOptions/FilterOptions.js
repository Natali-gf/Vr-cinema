import style from './style.module.scss';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import SelectGenre from '../Select/SelectGenre';
import SelectStudio from '../Select/SelectStudio';
import SelectYearFrom from '../Select/SelectYearFrom';
import SelectYearTo from '../Select/SelectYearTo';
import SelectLang from '../Select/SelectLang';
import { useSelector, useDispatch } from 'react-redux';
import { currentFilter } from '../../store/slices/filterSlice';

export default function FilterOptions({className, setFilterVisible, toggleDropdown, setToggleDropdown, setClearFilter, setActiveFilter, films}) {
	//filters states (redux)
	const {	genre, studio, yearFrom, yearTo, language } = useSelector(state => state.filter);
	const dispatch = useDispatch();

	//filters
	function getSelectedFilters(){
			let filteredFilms = films;
		if (genre != '') {
			filteredFilms = filteredFilms.filter((item) => (
				item.category.some((filter) => (
					genre.some((elem) => (
						elem === filter))))))}
		if (studio != '') {
			filteredFilms = filteredFilms.filter((item) => (
				item.copyright_holder.some((filter) => (
					studio.some((elem) => (
						elem === filter))))))}
		if (yearFrom != '') {
			filteredFilms = filteredFilms.filter((item) => (
				yearFrom.some((filter) => (
					item.year >= filter))))}
		if (yearTo != '') {
			filteredFilms = filteredFilms.filter((item) => (
				yearTo.some((filter) => (
					item.year <= filter))))}
		if (language != '') {
			filteredFilms = filteredFilms.filter((item) => (
				item.language.some((filter) => (
					language.some((elem) => (
						elem.toLowerCase() === filter.toLowerCase()))))))}
		//update filters state
		dispatch(currentFilter(filteredFilms))
	}

	//button Apply
	const [btnDisabled, setBtnNotDisabled] = useState(true)
	//subscribe to filter state changes
	useEffect(() => {
		if (genre.length === 0 &&
			studio.length === 0 &&
			yearFrom.length === 0 &&
			yearTo.length === 0 &&
			language.length === 0){
			setBtnNotDisabled(true)
		}
	}, [genre.length === 0 &&
		studio.length === 0 &&
		yearFrom.length === 0 &&
		yearTo.length === 0 &&
		language.length === 0])
	//click on button Apply
	function handleApplyClick (e){
		e.preventDefault();
		setToggleDropdown(!toggleDropdown)
		setFilterVisible(false)
		getSelectedFilters()
		setClearFilter(false)
		setActiveFilter(true)
	}

	return (
		<div className={cn(style.filter, className)}>

			<ul className={style.filter__list}>
				<li>
					<SelectGenre className={style.filter__item} setBtnNotDisabled={setBtnNotDisabled} setClearFilter={setClearFilter}/>
				</li>
				<li>
					<SelectStudio className={style.filter__item} setBtnNotDisabled={setBtnNotDisabled} setClearFilter={setClearFilter}/>
				</li>
				<li >
					<ul className={style.filter__blockYears}>
						<li>
							<SelectYearFrom className={style.filter__years} setBtnNotDisabled={setBtnNotDisabled} setClearFilter={setClearFilter}/>
						</li>
						<li>
							<SelectYearTo className={style.filter__years} setBtnNotDisabled={setBtnNotDisabled} setClearFilter={setClearFilter}/>
						</li>
					</ul>
				</li>
				<li>
					<SelectLang className={style.filter__item} setBtnNotDisabled={setBtnNotDisabled} setClearFilter={setClearFilter}/>
				</li>
				<li>
					<button className={style.filter__button}
						disabled={btnDisabled}
						onClick={handleApplyClick}>
							Применить
					</button>
				</li>
			</ul>
		</div>
	);
}
