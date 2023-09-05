import style from './style.module.scss';
import cn from 'classnames';
import Search from '../../ui/Search/Search';

export default function Header ({title, subtitle, className}) {
	return (
		<div className={cn(style.header, className)}>
			<div className={style.header__titlesBlock}>
				<h1 className={style.header__title}>{title}</h1>
				{subtitle &&
				<h2 className={style.header__subtitle}>{subtitle}</h2>}
			</div>
			<Search className={style.header__search}/>
		</div>
	);
}
