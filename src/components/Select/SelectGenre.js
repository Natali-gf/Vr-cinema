import Multiselect from 'multiselect-react-dropdown';
import './style.scss';
import style from './style.module.scss';
// import './select.scss';
// import Select, { components }  from 'react-select'
// import { filterGenre } from './filtersData';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenre, clearGenre, clearCurrentFilter, resetAll } from '../../store/slices/filterSlice';
import { filtersData } from './filtersData';
import { useState, useRef, useEffect } from 'react';

// игнорировать, нужен будет для react-select
// const Option = (props) => {
// 	return (
// 		<div>
// 			<components.Option {...props}
// 			className={style.checkbox__item}>
// 			<input
// 				className={style.checkbox__input}
// 				type="checkbox"
// 				checked={props.isSelected}
// 				onChange={() => null}
// 			/>{" "}
// 			<label className={style.checkbox__label}>{props.label}</label>
// 			</components.Option>
// 		</div>
// 	);
// };

function SelectGenre({className, setBtnNotDisabled, setClearFilter}) {
	//state from store
	const {	genre, studio, yearFrom, yearTo, language, buttonReset } = useSelector(state => state.filter);
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
		dispatch(clearGenre())
		if (studio.length === 0 &&
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
		<div className={cn(style.filter__wrapper)}>
			<h3 className={style.filter__title}>Жанр</h3>
			<div className={cn(style.selectWrapper, className)}>
				<div className={style.filter__container}>
					<div className={cn(style.selectMenu, rotateArrow)}
						onClick={handleClick}>
						<div className={style.selectMenu__box}>
							{genre.length ?
								genre.map((item, index) => {
									return <span className={style.selectMenu__item} key={index}>{item}</span>}) : 'Выберите...'}
						</div>
					</div>
					{buttonVisible && <button onClick={clear} className={cn(style.selectMenu__clear, 'icon_close')}/>}
				</div>
				<Multiselect
					className={cn(showList, 'customSelect', 'icon_arrow_down_after')}
					isObject={false}
					onSelect={(e) => {dispatch(selectGenre(e));
										settoggleList(!toggleList);
										setBtnNotDisabled(false);
										setButtonVisible(true)}}
					onRemove={(e) => {dispatch(selectGenre(e))
										if(genre.length === 1){setButtonVisible(false)}}}
					options={filtersData.genre}
					avoidHighlightFirstOption={true}
					hideSelectedList={true}
					closeOnSelect={true}
					ref={multiselectRef}
					showCheckbox/>

			{/* //заделка на переделку */}
				{/* <Select
					classNamePrefix={'customSelect'}
					className={'customSelect'}
					isMulti
					options={filterGenre}
					onChange={(e) => dispatch(selectGenre(e))}
					hideSelectedOptions={false}
					isSearchable={false}
					placeholder={'Выберите...'}
					menuIsOpen={true}
					components={{Option}}
				/> */}
			</div>
		</div>
	)
}

export default SelectGenre;