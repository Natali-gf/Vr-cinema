import style from './style.module.scss';
import SideMenuLink from '../../ui/Navlink/Navlink';
import cn from 'classnames';

export default function SideTabs({className}) {
	return (
		<div className={cn(style.tabs, className)}>
			<ul className={style.tabs__list}>
				<li className={style.tabs__item}>
					<SideMenuLink className='icon_film_catalog'
						to='/films'
						children={'Каталог фильмов'} />
				</li>
				<li className={style.tabs__item}>
					<SideMenuLink className='icon_cinema_catalog'
						to='/cinema'
						children={'База кинотеатров'} />
				</li>
				<li className={style.tabs__item}>
					<SideMenuLink className='icon_franchisee'
						to='/franchisee'
						children={'База франчайзи'} />
				</li>
			</ul>
		</div>
	);
}
