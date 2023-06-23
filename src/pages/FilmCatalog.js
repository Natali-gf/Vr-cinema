import style from './style.module.scss';
import FilmsTable from '../components/tables/FilmsTable';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import AddWindow from '../components/ui/AddWindow/AddWindow';
import AddFilmForm from '../components/addForms/AddFilmForm';
import { useDispatch, useSelector } from 'react-redux';
// import { showAddFilm } from '../store/slices/windowStateSlice';
// import Content from '../components/static/Content/Content';
import Header from '../components/static/Header/Header';
import FilterOptions from '../components/static/FilterOptions/FilterOptions';
import AddButton from '../components/ui/AddButton/AddButton'
import FilmFilters from '../components/filters/filmFilters/FilmFilters';
import { showAddFilm } from '../store/slices/windowStateSlice';
const buttonAdd = 'Добавить фильм';

function FilmCatalog() {
	const { addFilmWindow } = useSelector(state => state.stateAddWindow);
	const { filterVisible } = useSelector(state => state.filter);
	const dispatch = useDispatch();

// console.log(filterVisible);
	return (
		<div className={style.content}>
			<div className={style.content__container}>
				<Header className={style.content__header}
					title={'Каталог фильмов'} />
				<div className={style.content__filterPanel}>
					<FilterPanel className={style.content__filters}
					buttonAdd={buttonAdd} />
					<AddButton className={style.content__addButton}
						children={buttonAdd}
						onClick={() => {dispatch(showAddFilm(!addFilmWindow))}}/>
					{filterVisible &&
						<FilterOptions className={style.content__options}>
							<FilmFilters />
						</FilterOptions>}
				</div>
				<div className={style.content__tableBlock}
						style={filterVisible ? {height: 'calc(100vh - 408px)'}:{height: 'calc(100vh - 210px)'}}>
					<FilmsTable />
				</div>
				{addFilmWindow &&
					<AddWindow className={style.content__addWindow}
						showAddwindow={showAddFilm}
						addWindow={addFilmWindow}
						children={<AddFilmForm/>}/>}
			</div>
		</div>
	);
}

export default FilmCatalog;