import style from './style.module.scss';
import publishedIcon from '../../assets/icons/published.svg'
import unpublishedIcon from '../../assets/icons/unpublished.svg'
import loadingImg from '../../assets/icons/loading.svg';
import { useSelector } from 'react-redux';
import FilmMenu from '../FilmMenu/FilmMenu';

function FilmsTable({loading, films, searchValue, filterVisible}) {
	// actual filters state
	const {	filtered, sorted } = useSelector(state => state.filter);

	// check filters
	(function(){
		if(filtered != 'initialState'){
				if (sorted != 'initialState')
					{ let customFilms = sorted;
						films = customFilms.filter((sort) => filtered.some((filter) => filter ===sort)) }
				else { films=filtered }}
		else if(sorted != 'initialState')
				{ films = sorted }}());

	return (
		<div className={style.table_container} style={filterVisible ? {height: 'calc(100vh - 450px)'}:{height: 'calc(100vh - 212px)'}}>
			<table className={`${style.table} ${style.films__table}`}>
				<thead className={style.table__head}>
					<tr className={style.table__row}>
						<th className={style.table__column}>Постер</th>
						<th className={style.table__column}>Название</th>
						<th className={style.table__column}>Жанр</th>
						<th className={style.table__column}>Студия</th>
						<th className={style.table__column}>Время</th>
						<th className={style.table__column}>Озвучка</th>
						<th className={style.table__column}>Цензор</th>
						<th className={style.table__column}>Год</th>
						<th className={style.table__column}>Цена</th>
						<th className={style.table__column}>Прокат</th>
						<th className={style.table__column}></th>
					</tr>
				</thead>
				{!loading && (
					<tbody className={style.table__body} style={filterVisible ? {height: 'calc(100vh - 476px)'}:{height: 'calc(100vh - 280px)'}}>
						{ films.filter( item => (item.name.toLowerCase()).includes(searchValue.toLowerCase())).map( item => (
							<tr className={style.table__row} key={item.id + Math.random()}>
								<td className={style.table__column}>
									<img className={style.table__image} src={item.imagine} alt={item.name} />
								</td>
								<td className={style.table__column}>{item.name}</td>
								<td className={style.table__column}>{item.category}</td>
								<td className={style.table__column}>{item.copyright_holder}</td>
								<td className={style.table__column}>{item.duration}</td>
								<td className={style.table__column}>{item.language}</td>
								<td className={style.table__column}>{item.age}</td>
								<td className={style.table__column}>{item.year || "-"}</td>
								<td className={style.table__column}>{item.price || "-"} ₽</td>
								<td className={style.table__column}>
									{item.is_published ? (<img src={publishedIcon} alt="" />)
									: (<img src={unpublishedIcon} alt="" />)}
								</td>
								<td className={style.table__column}>
									<FilmMenu/>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</table>
			{loading && (<img src={loadingImg} alt="Загрузка" className={style.loading}/>)}
		</div>
	);
}

export default FilmsTable;