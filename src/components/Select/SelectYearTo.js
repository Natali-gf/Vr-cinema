import Multiselect from 'multiselect-react-dropdown';
import style from './style.module.scss';
import { filtersData, yearFrom } from './filtersData';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectYearTo, clearYearTo, clearCurrentFilter, resetAll } from '../../store/slices/filterSlice';
import { useState, useRef, useEffect } from 'react';

function SelectYearTo({className, setBtnNotDisabled, setClearFilter}) {
	//state from store
	const {	yearTo, genre, studio, yearFrom, language, buttonReset } = useSelector(state => state.filter);
	const dispatch = useDispatch();

	//local state dropdownmenu
	const [toggleList, settoggleList] = useState(true);
	function handleClick(e) {
		settoggleList(!toggleList);
	}

	//state for visible/unvisible button clear
	const [buttonVisible, setButtonVisible] = useState(false)

	// class style
	const showList = cn('', toggleList ? 'hidden' : '');
	const rotateArrow = cn(toggleList ? 'icon_arrow_down_after' : 'icon_arrow_down')

	//clear current filter choice
	const multiselectRef = useRef();
	const resetSelectFilters = () => {
		multiselectRef.current.resetSelectedValues();
	};

	function clear(){
		resetSelectFilters()
		setButtonVisible(false)
		dispatch(clearYearTo())
		if (genre.length === 0 &&
			studio.length === 0 &&
			yearFrom.length === 0 &&
			language.length === 0){
				dispatch(clearCurrentFilter())
				setClearFilter(true)
		}
	}
	//reset selecteds if all cleared
	useEffect(() => {
		if (buttonReset === 'reset'){
			clear()
			dispatch(resetAll(''))}
	}, [buttonReset])

	return(
		<div className={cn(style.selectWrapper, className)}>
			<div className={style.filter__container}>
				<div className={cn(style.selectMenu, rotateArrow)}
					onClick={handleClick}>
					<div className={style.selectMenu__box}>
						{yearTo != '' ?
							<span className={style.selectMenu__item}>{yearTo}</span> : 'По...'}
					</div>
				</div>
				{buttonVisible && <button onClick={clear} className={cn(style.selectMenu__clear, 'icon_close')}/>}
			</div>
			<Multiselect
				className={cn(showList, 'customSingleSelect', 'icon_arrow_down_after')}
				isObject={false}
				onSelect={(e) => {dispatch(selectYearTo(e))
									settoggleList(!toggleList);
									setBtnNotDisabled(false);
									setButtonVisible(true)}}
				options={filtersData.year}
				avoidHighlightFirstOption={true}
				hidePlaceholder={true}
				ref={multiselectRef}
				singleSelect/>
		</div>
	)
}

export default SelectYearTo;