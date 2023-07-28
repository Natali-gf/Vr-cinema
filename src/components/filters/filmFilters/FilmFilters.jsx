import style from '../style.module.scss';
import cn from 'classnames';
import FilterGenre from './FilterGenre';
import FilterStudio from './FilterStudio';
import FilterLanguage from './FilterLanguage';
import FilterYearFrom from './FilterYearFrom';
import FilterYearTo from './FilterYearTo';
import MovieFilterButton from './MovieFilterButton';

export default function FilmFilters({className, setClearFilter}) {
	return (
		<div className={cn(style.options, className)}>
			<div className={cn(style.options__filters, style.filter, style.filter_film)}>
				<ul className={cn(style.filter__list, style.filter__list_film)}>
					<li>
						<h3 className={style.filter__title}>Жанр</h3>
						<FilterGenre className={style.filter__item} setClearFilter={setClearFilter} />
					</li>
					<li>
						<h3 className={style.filter__title}>Студия</h3>
						<FilterStudio className={style.filter__item} setClearFilter={setClearFilter} />
					</li>
					<li>
						<ul className={style.filter__blockYears}>
							<li>
								<h3 className={style.filter__title}>Год выпуска</h3>
								<FilterYearFrom className={style.filter__years} setClearFilter={setClearFilter} />
							</li>
							<li>
								<FilterYearTo className={style.filter__years} setClearFilter={setClearFilter} />
							</li>
						</ul>
					</li>
					<li>
						<h3 className={style.filter__title}>Озвучка</h3>
						<FilterLanguage className={style.filter__item} setClearFilter={setClearFilter} />
					</li>
				</ul>
				<MovieFilterButton className={style.options__button} />
			</div>

		</div>
	);
}
