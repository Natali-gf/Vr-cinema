import style from './style.module.scss';
import published from '../../assets/icons/published.svg';
import unpublished from '../../assets/icons/unpublished.svg';
import loadingImg from '../../assets/icons/loading.svg';
import noPoster from '../../assets/images/no_poster.png';
import DetailMenu from '../DetailMenu/DetailMenu';
import { getCinemaFilmRequest, getFilmRequest, getFranchiseeFilmRequest } from '../../store/actions/filmActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { setSearchValue } from '../../store/slices/searchSlice';

const tableHeaders = ['', 'Постер', 'Название', 'Жанр', 'Студия', 'Время', 'Озвучка', 'Цензор', 'Год', 'Публикация', '']

function FilmsTable({whichFilms}) {
	const dispatch = useDispatch()
	const { films, loadingPage, loadingWindow } = useSelector(state => state.films);
	const { searchValue } = useSelector(state => state.search)
	const filter = useSelector(state => state.filter);

	let customFilms = films;

	useEffect(() => {
		switch (whichFilms) {
			case 'all':
				dispatch(getFilmRequest(filter));
				break;
			case 'cinema':
				dispatch(getCinemaFilmRequest(localStorage.cinemaId, filter));
				break;
			case 'franchisee':
				dispatch(getFranchiseeFilmRequest(localStorage.franchiseeId, filter));
				break;
		}

		return () => {
			dispatch(setSearchValue(''))
		}
    }, []);

	// check filters
	(function(){
		if(filter.filtered != 'initialState'){
				if (filter.sorted != 'initialState')
					{customFilms = filter.sorted.filter((sort) => filter.filtered.some((filter) => filter ===sort)) }
				else { customFilms = filter.filtered }}
		else if(filter.sorted != 'initialState')
				{ customFilms = filter.sorted }
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
				{!loadingPage && <tbody className={cn(style.table__body)}
					style={filter.filterVisible ? {height: 'calc(100vh - 477px)'}:{height: 'calc(100vh - 279px)'}}>
					{customFilms
						.filter( item => (item.name?.toLowerCase()).includes(searchValue.toLowerCase()))
							.map( (item, index) => (
					<tr className={cn(style.table__row, style.table__films)} key={index + Math.random()}>
						<td className={style.table__column}/>
						<td className={style.table__column}>
							<img className={style.table__image} src={item.imagine ? item.imagine.image : noPoster} alt={item.name}/>
						</td>
						<td className={style.table__column}>
							{item.name}
						</td>
						<td className={style.table__column}>
							{item.category.length > 1 ?
								item.category.map((el, i)=> el + (i < item.category.length - 1 ? ', ' : '')) :
								item.category}
						</td>
						<td className={style.table__column}>
							{item.copyright_holder.length > 1 ?
								item.copyright_holder.map((el, i)=> el + (i < item.copyright_holder.length - 1 ? ', ' : '')) :
								item.copyright_holder}
						</td>
						<td className={style.table__column}>
							{item.duration}
						</td>
						<td className={style.table__column}>
							{item.language.length > 1 ?
								item.language.map((el, i)=> el + (i < item.language.length - 1 ? ', ' : '')) :
								item.language}
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
							<DetailMenu className={style.table__menu}
								isPublished={item.is_published}
								elemId={item.id}
								typeDetail={'film'}
								whichFilms={whichFilms}/>
						</td>
					</tr>))}
				</tbody>}
			</table>
			{(loadingPage || loadingWindow) &&
				<img className={style.loading} src={loadingImg} alt={'Загрузка'} />}
		</>
	);
}

export default FilmsTable;