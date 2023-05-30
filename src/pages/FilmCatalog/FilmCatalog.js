import style from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllFilms } from '../../store/slices/filmSlice';
import { fetchFilms } from '../../store/actions/filmActions';
import FilmsTable from '../../components/FilmsTable/FilmsTable';
import { Search } from '../../components/Search/Search';
import FilterPanel from '../../components/FilterPanel/FilterPanel';

function FilmCatalog() {
	const dispatch = useDispatch()
	const {films, loading} = useSelector(selectAllFilms)
	const [searchValue, setSearchValue] = useState('')
	const [filterVisible, setFilterVisible] = useState(false)

	useEffect(() => {
			dispatch(fetchFilms())
    }, []);

	return (
		<div className={style.films}>
			<div className={style.films__container}>
				<div className={style.films__header}>
					<h2 className={style.films__title}>Каталог фильмов</h2>
					<Search searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
				<FilterPanel films={films} filterVisible={filterVisible} setFilterVisible={setFilterVisible}/>
				<FilmsTable films={films} loading={loading} filterVisible={filterVisible}
					searchValue={searchValue}/>
			</div>
		</div>
	);
}

export default FilmCatalog;