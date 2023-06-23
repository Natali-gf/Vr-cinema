import style from './style.module.scss';
import cn from 'classnames';

export default function FilterButton({children, className, onClick}) {

	return (
		<button className={cn(style.filterButton, className)}
			onClick={onClick}>
			{children}
		</button>
	);
};
