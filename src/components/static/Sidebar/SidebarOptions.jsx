import style from './style.module.scss';
import SideMenuLink from '../../ui/Navlink/Navlink';
import cn from 'classnames';

export default function SidebarOptions({className}) {
	const classes = cn(style.userMenu, className);

	return (
		<div className={classes}>
			<ul className={style.userMenu__list}>
				<li className={style.userMenu__item}>
					<SideMenuLink className='icon_archive'
						to='/handbook'
						children={'Справочник'} />
				</li>
				<li className={style.userMenu__item}>
					<SideMenuLink className='icon_usermenu_settings'
						to='/settings'
						children={'Настройки'} />
				</li>
				<li className={style.userMenu__item}>
					<SideMenuLink className='icon_usermenu_out'
							to='/'
							children={'Выход'} />
				</li>
			</ul>
		</div>
	);
}
