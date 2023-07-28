import style from './style.module.scss';
import cn from 'classnames';
import React from 'react';
import Header from '../components/static/Header/Header';
import FilterPanel from '../components/static/FilterPanel/FilterPanel';
import FilterOptions from '../components/static/FilterOptions/FilterOptions';
import CinemaTable from '../components/tables/CinemaTable';
import { useDispatch, useSelector } from 'react-redux';
import { showCinemaAdd, showCinemaEdit, showCinemaInfo } from '../store/slices/windowStateSlice';
import { clearAllFilter, selectSort, currentSort, resetAllButton, setFilterVisible, setActiveFilter, showClearBtnFilter, setDescSort, setActiveSort, showClearBtnSort } from '../store/slices/filterCinema';
import CinemaForm from '../components/forms/CinemaForm';
import PopupWindow from '../components/ui/PopupWindow/PopupWindow';
import MainButton from '../components/ui/MainButton/MainButton';
import CinemaFilters from '../components/filters/cinemaFilters/CinemaFilters';
import ActionNotification from '../components/notifications/ActionNotification';


const buttonAdd = 'Добавить кинотеатр';
const buttonEdit = 'Сохранить изменения';
const filterParams = {
	currentSort: currentSort,
	setDescSort: setDescSort,
	setActiveSort: setActiveSort,
	showClearBtnSort: showClearBtnSort,
	selectSort: selectSort,
	setFilterVisible: setFilterVisible,
	setActiveFilter: setActiveFilter,
	resetAllButton: resetAllButton,
	showClearBtnFilter: showClearBtnFilter,
	clearAllFilter: clearAllFilter,
}

function CinemaCatalog() {
	const { cinemaAddWindow, cinemaEditWindow, cinemaInfoWindow } = useSelector(state => state.statePopupWindow);
	const { cinemaId } = useSelector(state => state.cinema);
	const filterCinema = useSelector(state => state.filterCinema);
	const { notificationText, notificationVisible } = useSelector(state => state.notification);
	const dispatch = useDispatch();
	filterParams.filterState = filterCinema;

	return (
		<div className={style.content}>
			<div className={style.content__container}>
				<Header className={style.content__header}
					title={'База кинотеатров'} />
				<div className={style.content__filterPanel}>
					<FilterPanel className={style.content__filters}
						buttonAdd={buttonAdd}
						filterParams={filterParams} />
					<MainButton className={cn(style.content__addButton, 'icon_add')}
						children={buttonAdd}
						onClick={() => {dispatch(showCinemaAdd(!cinemaAddWindow))}} />
					{filterCinema.filterVisible &&
						<FilterOptions className={style.content__options}>
							<CinemaFilters />
						</FilterOptions>}
				</div>
				<div className={style.content__tableBlock}
						style={filterCinema.filterVisible ? {height: 'calc(100vh - 409px)'}:{height: 'calc(100vh - 211px)'}}>
					<CinemaTable />
				</div>
				{cinemaAddWindow &&
					<PopupWindow className={style.content__addWindow}
						showPopupWindow={showCinemaAdd}
						children={<CinemaForm
									buttonName={buttonAdd}
									modeInfo={false}/>}/>}
				{cinemaEditWindow &&
					<PopupWindow className={style.content__addWindow}
						showPopupWindow={showCinemaEdit}
						children={<CinemaForm
									cinemaId={cinemaId}
									buttonName={buttonEdit}
									modeInfo={false}/>}/>}
				{cinemaInfoWindow &&
					<PopupWindow className={style.content__addWindow}
						showPopupWindow={showCinemaInfo}
						children={<CinemaForm
									cinemaId={cinemaId}
									modeInfo={true}/>}/>}
				<ActionNotification children={notificationText} isVisible={notificationVisible} />
			</div>
		</div>
	);
}

export default CinemaCatalog;
