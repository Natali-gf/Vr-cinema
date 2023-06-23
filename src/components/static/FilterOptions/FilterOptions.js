import style from './style.module.scss';
import cn from 'classnames';

export default function FilterOptions({className, children}) {
	return (
		<div className={cn(style.options, className)}>
			{children}
		</div>
	);
}
