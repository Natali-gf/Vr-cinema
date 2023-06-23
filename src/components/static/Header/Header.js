import style from './style.module.scss';
import cn from 'classnames';
import Search from '../../ui/Search/Search';

export default function Header ({title, className}) {
	return (
		<div className={cn(style.header, className)}>
			<h1 className={style.header__title}>{title}</h1>
			<Search className={style.header__search}/>
		</div>
	);
}
