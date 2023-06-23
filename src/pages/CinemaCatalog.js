import style from './style.module.scss';
import React from 'react';
import Header from '../components/static/Header/Header';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import FilterOptions from '../components/static/FilterOptions/FilterOptions';
import AddWindow from '../components/ui/AddWindow/AddWindow';
import AddCinemaForm from '../components/addForms/AddCinemaForm';
import CinemaTable from '../components/tables/CinemaTable';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../components/ui/AddButton/AddButton';
import { showAddCinema } from '../store/slices/windowStateSlice';

const buttonAdd = 'Добавить кинотеатр';

function CinemaCatalog() {
	const { addCinemaWindow } = useSelector(state => state.stateAddWindow);
	const { filterVisible } = useSelector(state => state.filter);
	const dispatch = useDispatch();

	return (
		<div className={style.content}>
			<div className={style.content__container}>
				<Header className={style.content__header}
					title={'База кинотеатров'} />
				<div className={style.content__filterPanel}>
					<FilterPanel className={style.content__filters}
					buttonAdd={buttonAdd} />
					<AddButton className={style.content__addButton}
						children={buttonAdd}
						onClick={() => {dispatch(showAddCinema(!addCinemaWindow))}} />
					{filterVisible &&
						<FilterOptions className={style.content__options}>
							{/* <FilmFilters /> */}
						</FilterOptions>}
				</div>
				<div className={style.content__tableBlock}
						style={filterVisible ? {height: 'calc(100vh - 408px)'}:{height: 'calc(100vh - 210px)'}}>
					<CinemaTable />
				</div>
				{addCinemaWindow &&
					<AddWindow className={style.content__addWindow}
						showAddwindow={showAddCinema}
						addWindow={addCinemaWindow}
						children={<AddCinemaForm/>}/>}
			</div>
		</div>
	);
}

export default CinemaCatalog;
