import style from './style.module.scss';
import published from '../../assets/icons/published.svg'
import unpublished from '../../assets/icons/unpublished.svg'
import loadingImg from '../../assets/icons/loading.svg';
import FilmMenu from '../FilmMenu/FilmMenu';
import { selectAllFilms } from '../../store/slices/filmSlice';
import { fetchFilms } from '../../store/actions/filmActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

const tableHeaders = ['Постер', 'Название', 'Жанр', 'Студия', 'Время', 'Озвучка', 'Цензор', 'Год', 'Публикация', '']

function FilmsTable() {
	const dispatch = useDispatch()
	const {films, loading} = useSelector(selectAllFilms);
	const { searchValue } = useSelector(state => state.search)
	const {	filtered, sorted } = useSelector(state => state.filter);
	let customFilms = films;
	useEffect(() => {
		dispatch(fetchFilms())
    }, []);

	// check filters
	(function(){
		if(filtered != 'initialState'){
				if (sorted != 'initialState')
					{customFilms = sorted.filter((sort) => filtered.some((filter) => filter ===sort)) }
				else { customFilms = filtered }}
		else if(sorted != 'initialState')
				{ customFilms = sorted }
	}());

	return (
		<>
			<table className={cn(style.table)}>
				<thead className={style.table__head}>
					<tr className={cn(style.table__row_head, style.table__films)}>
						{tableHeaders.map((headers, index) => (
							<th className={style.table__column_head} key={index}>
								{headers}
							</th>))}
					</tr>
				</thead>
				{!loading && <tbody className={cn(style.table__body)}>
					{customFilms.filter( item =>
						(item.name.toLowerCase()).includes(searchValue.toLowerCase()))
							.map( (item, index) => (
						<tr className={cn(style.table__row, style.table__films)} key={index + Math.random()}>
							<td className={style.table__column}>
								<img className={style.table__image} src={item.imagine} alt={item.name}/>
							</td>
							<td className={style.table__column}>
								{item.name}
							</td>
							<td className={style.table__column}>
								{item.category.length === 0 ? '-' : item.category}
							</td>
							<td className={style.table__column}>
								{item.copyright_holder.length === 0 ? '-' : item.copyright_holder}
							</td>
							<td className={style.table__column}>
								{item.duration}
							</td>
							<td className={style.table__column}>
								{item.language}
							</td>
							<td className={style.table__column}>
								{item.age}
							</td>
							<td className={style.table__column}>
								{item.year || "-"}
							</td>
							<td className={style.table__column}>
								{item.is_published ?
									(<img src={published} alt="" />) :
									(<img src={unpublished} alt="" />)}
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

export default FilmsTable;