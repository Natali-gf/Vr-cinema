import style from './style.module.scss';
import loadingImg from '../../assets/icons/loading.svg';
import FilmMenu from '../FilmMenu/FilmMenu';
import { fetchCinema } from '../../store/actions/cinemaAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

const tableHeaders = ['Название', 'Город', 'Адрес', 'Владелец', 'Тип кинотеатра', 'Рабочие дни', '']

function CinemaTable({className}) {
	const dispatch = useDispatch();
	const {cinema, loading} = useSelector(state => state.cinema);
	const { searchValue } = useSelector(state => state.search);
	const { filterVisible } = useSelector(state => state.filter);

	useEffect(() => {
			dispatch(fetchCinema())
    }, []);

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
				{!loading && <tbody className={cn(style.table__body)}>
					{cinema.filter( item =>
						(item.name.toLowerCase()).includes(searchValue.toLowerCase()))
							.map( (item, index) => (
						<tr className={cn(style.table__row, style.table__cinema)} key={index + Math.random()}>
							<td className={style.table__column}>
								{item.name}
							</td>
							<td className={style.table__column}>
								{item.city}
							</td>
							<td className={style.table__column}>
								{item.address}
							</td>
							<td className={style.table__column}>
								{item.franchisee}
							</td>
							<td className={style.table__column}>
								{item.type_cinema}
							</td>
							<td className={style.table__column}>
								{item.working_days}
							</td>
							<td className={style.table__column}>
								<FilmMenu className={style.table__menu}/>
							</td>
						</tr>
					))}
				</tbody>}
			</table>
			{loading &&
				<img className={style.loading} src={loadingImg} alt={'Загрузка'} />}
		</>
	);
}

export default CinemaTable;