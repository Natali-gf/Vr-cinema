import style from './style.module.scss';
import Navlink from '../../ui/Navlink/Navlink';
import cn from 'classnames';
import { logoutRequest } from '../../../store/actions/authorizationAction';

export default function SidebarOptions({className}) {
	const classes = cn(style.userMenu, className);

	return (
		<div className={classes}>
			<ul className={style.userMenu__list}>
				<li className={style.userMenu__item}>
					<Navlink className='icon_archive'
						to='/handbook'
						children={'Справочник'} />
				</li>
				<li className={style.userMenu__item}>
					<Navlink className='icon_usermenu_settings'
						to='/user_settings'
						children={'Настройки'} />
				</li>
				<li className={style.userMenu__item}>
					<Navlink className='icon_usermenu_out'
						onClick={() => logoutRequest()}
						to='/'
						children={'Выход'} />
				</li>
			</ul>
		</div>
	);
}
