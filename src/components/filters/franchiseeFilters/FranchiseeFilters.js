import style from '../style.module.scss';
import cn from 'classnames';
import FilterOwnership from './FilterTypeFranchisee';
import FranchiseeFilterButton from './FranchiseeFilterButton';

export default function FranchiseeFilters({className, setClearFilter}) {
	return (
		<div className={cn(style.options, className)}>
			<div className={cn(style.options__filters, style.filter, style.filter_franchisee)}>
				<ul className={cn(style.filter__list, style.filter__list_franchisee)}>
					<li>
						<h3 className={style.filter__title}>Тип</h3>
						<FilterOwnership className={style.filter__item} setClearFilter={setClearFilter} />
					</li>
				</ul>
				<FranchiseeFilterButton className={style.options__button} />
			</div>
		</div>
	);
}
