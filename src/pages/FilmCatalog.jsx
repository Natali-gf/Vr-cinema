import style from './style.module.scss';
import cn from 'classnames';
import FilmsTable from '../components/tables/FilmsTable';
import FilterPanel from '../components/static/FilterPanel/FilterPanel';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/static/Header/Header';
import { clearAllFilter, selectSort, currentSort, resetAllButton, setFilterVisible, setActiveFilter, showClearBtnFilter, setDescSort, setActiveSort, showClearBtnSort  } from '../store/slices/filterFilm';
import FilterOptions from '../components/static/FilterOptions/FilterOptions';
import FilmFilters from '../components/filters/filmFilters/FilmFilters';
import { showFilmAdd, showFilmEdit, showFilmInfo } from '../store/slices/windowStateSlice';
import FilmForm from '../components/forms/FilmForm';
import PopupWindow from '../components/ui/PopupWindow/PopupWindow';
import MainButton from '../components/ui/MainButton/MainButton';
import ActionNotification from '../components/notifications/ActionNotification';
import GeneralNotification from '../components/notifications/GeneralNotification';


const buttonAdd = 'Добавить фильм';
const buttonEdit = 'Сохранить изменения';
const filterParams = {
	filterName: 'film',
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

function FilmCatalog({hideAddButton, whichFilms, currentId, title, subtitle}) {
	const dispatch = useDispatch();
	const { filmId } = useSelector(state => state.films);
	const filterFilm = useSelector(state => state.filter);
	const {
		filmAddWindow,
		filmEditWindow,
		filmInfoWindow
	} = useSelector(state => state.statePopupWindow);
	const {
		notificationText,
		notificationVisible,
		errorNotificationText,
		errorNotificationVisible
	} = useSelector(state => state.notification);

	filterParams.filterState = filterFilm;

	return (
		<>
			<div className={style.content}>
				<div className={style.content__container}>
					<Header className={style.content__header}
						title={title || 'Каталог фильмов'}
						subtitle={subtitle} />
					<div className={style.content__filterPanel}>
						<FilterPanel className={style.content__filters}
							buttonAdd={buttonAdd}
							filterParams={filterParams} />
						{!hideAddButton && <MainButton className={cn(style.content__addButton, 'icon_add')}
							children={buttonAdd}
							onClick={() => {dispatch(showFilmAdd(!filmAddWindow))}}/>}
						{filterFilm.filterVisible &&
							<FilterOptions className={style.content__options}>
								<FilmFilters />
							</FilterOptions>}
					</div>
					<div className={style.content__tableBlock}
							style={filterFilm.filterVisible ? {height: 'calc(100vh - 409px)'}:{height: 'calc(100vh - 211px)'}}>
						<FilmsTable whichFilms={whichFilms || 'all'} />
					</div>
					{filmAddWindow &&
						<PopupWindow className={style.content__addWindow}
							showPopupWindow={showFilmAdd}
							children={<FilmForm
										buttonName={buttonAdd}
										modeInfo={false}/>}
							/>}
					{filmEditWindow &&
						<PopupWindow className={style.content__addWindow}
							showPopupWindow={showFilmEdit}
							children={<FilmForm
										filmId={filmId}
										buttonName={buttonEdit}
										modeInfo={false}/>}/>}
					{filmInfoWindow &&
						<PopupWindow className={style.content__addWindow}
							showPopupWindow={showFilmInfo}
							children={<FilmForm
										filmId={filmId}
										modeInfo={true}/>}/>}
					<ActionNotification children={notificationText} isVisible={notificationVisible} />
				</div>
			</div>
			<GeneralNotification children={errorNotificationText} isVisible={errorNotificationVisible}/>
		</>
	);
}

export default FilmCatalog;