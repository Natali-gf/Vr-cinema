import style from '../style.module.scss';
import cn from 'classnames';
import FilterTypeCinema from './FilterTypeCinema';
import CinemaFilterButton from './CinemaFilterButton';
import FilterCity from './FilterCity';
import FilterOwner from './FilterOwner';

export default function CinemaFilters({className, setClearFilter}) {
	return (
		<div className={cn(style.options, className)}>
			<div className={cn(style.options__filters, style.filter, style.filter_cinema)}>
				<ul className={cn(style.filter__list, style.filter__list_cinema)}>
					<li>
						<h3 className={style.filter__title}>Город</h3>
						<FilterCity className={style.filter__item} setClearFilter={setClearFilter} />
					</li>
					<li>
						<h3 className={style.filter__title}>Владелец</h3>
						<FilterOwner className={style.filter__item} setClearFilter={setClearFilter} />
					</li>
					<li>
						<h3 className={style.filter__title}>Тип кинотеатра</h3>
						<FilterTypeCinema className={style.filter__item} setClearFilter={setClearFilter} />
					</li>
				</ul>
				<CinemaFilterButton className={style.options__button} />
			</div>
		</div>
	);
}
