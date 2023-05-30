import Multiselect from 'multiselect-react-dropdown';
import './style.scss';
// import './select.scss';
import style from './style.module.scss';
import { filtersData } from './filtersData';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { clearStudio, selectStudio, clearCurrentFilter, resetAll } from '../../store/slices/filterSlice';
import { useState, useRef, useEffect } from 'react';

function SelectStudio({className, setBtnNotDisabled, setClearFilter}) {
	//state from store
	const {	studio, genre, yearFrom, yearTo, language, buttonReset } = useSelector(state => state.filter);
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
		dispatch(clearStudio())
		if (genre.length === 0 &&
			yearFrom.length === 0 &&
			yearTo.length === 0 &&
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
		<div className={style.filter__wrapper}>
			<h3 className={style.filter__title}>Студия</h3>
			<div className={cn(style.selectWrapper, className)}>
				<div className={style.filter__container}>
					<div className={cn(style.selectMenu, rotateArrow)}
						onClick={handleClick}>
						<div className={style.selectMenu__box}>
							{studio.length ?
								studio.map((item, index) => {
									return <span className={style.selectMenu__item} key={index}>{item}</span>}) : 'Выберите...'}
						</div>
					</div>
					{buttonVisible && <button onClick={clear} className={cn(style.selectMenu__clear, 'icon_close')}/>}
				</div>
				<Multiselect
					className={cn(showList, 'customSelect', 'icon_arrow_down_after')}
					isObject={false}
					onSelect={(e) => {dispatch(selectStudio(e));
										settoggleList(!toggleList);
										setBtnNotDisabled(false);
										setButtonVisible(true)}}
					onRemove={(e) => {dispatch(selectStudio(e));
										if(studio.length === 1){setButtonVisible(false)}}}
					options={filtersData.studio}
					avoidHighlightFirstOption={true}
					hideSelectedList={true}
					ref={multiselectRef}
					showCheckbox/>
			</div>
		</div>
	)
}

export default SelectStudio;