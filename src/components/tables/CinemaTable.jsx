import style from './style.module.scss';
import loadingImg from '../../assets/icons/loading.svg';
import published from '../../assets/icons/published.svg';
import unpublished from '../../assets/icons/unpublished.svg';
import DetailMenu from '../DetailMenu/DetailMenu';
import { getCinemaRequest } from '../../store/actions/cinemaAction';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { setSearchValue } from '../../store/slices/searchSlice';

const tableHeaders = ['', 'Тип', 'Город', 'Адрес', 'Франчайзи', 'Название', '']

function CinemaTable() {
	const dispatch = useDispatch();
	const { cinema, loadingPage, loadingWindow } = useSelector(state => state.cinema);
	const { searchValue } = useSelector(state => state.search);
	const {	filtered, sorted, filterVisible } = useSelector(state => state.filterCinema);
	let customCinema = cinema;

	useEffect(() => {
		dispatch(getCinemaRequest())
		return () => {
			dispatch(setSearchValue(''))
		}
    }, []);

	// check filters
	(function(){
		if(filtered != 'initialState'){
				if (sorted != 'initialState')
					{customCinema = sorted.filter((sort) => filtered.some((filter) => filter ===sort)) }
				else { customCinema = filtered }}
		else if(sorted != 'initialState')
				{ customCinema = sorted }
	}());

	return (
		<>
			<table className={cn(style.table, style.cinema__table)}>
				<thead className={style.table__head}>
					<tr className={cn(style.table__row_head, style.table__cinema)}>
						{tableHeaders.map((headers, index) => (
							<th className={style.table__column_head} key={index}>
								{headers}
							</th>))}
					</tr>
				</thead>
				{!loadingPage &&
					<tbody className={cn(style.table__body)}
						style={filterVisible ? {height: 'calc(100vh - 477px)'}:{height: 'calc(100vh - 279px)'}}>
					{customCinema.filter( item =>
						(item.name.toLowerCase()).includes(searchValue.toLowerCase()))
							.map( (item, index) => (
						<tr className={cn(style.table__row, style.table__cinema)} key={index + Math.random()}>
							<td className={style.table__column}/>
							<td className={style.table__column}>
								{item.type_cinema}
							</td>
							<td className={style.table__column}>
								{item.city}
							</td>
							<td className={style.table__column}>
								{item.address}
							</td>
							<td className={style.table__column}>
								{item.franchisee.name}
							</td>
							<td className={style.table__column}>
								{item.name}
							</td>
							<td className={style.table__column}>
								<DetailMenu className={style.table__menu}
									isPublished={item.is_active}
									elemId={item}
									typeDetail={'cinema'} />
							</td>
						</tr>
					))}
				</tbody>}
			</table>
			{(loadingPage || loadingWindow) &&
				<img className={style.loading} src={loadingImg} alt={'Загрузка'} />}
		</>
	);
}

export default CinemaTable;