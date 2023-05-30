import style from './style.module.scss';
import SideMenuLink from '../SideMenuLink/SideMenuLink';
import cn from 'classnames';
import PropTypes from 'prop-types';

function UserMenu({className}) {
	const classes = cn(style.userMenu, className);
	UserMenu.propTypes = {className: PropTypes.string}
	UserMenu.defaultProps = {className: ''}

	return (
		<div className={classes}>
			<ul className={style.userMenu__list}>
				<li className={style.userMenu__item}>
					<SideMenuLink
							to='/settings'
							className='icon_usermenu_settings'
					>Настройки</SideMenuLink>
				</li>
				<li className={style.userMenu__item}>
					<SideMenuLink
							to='/'
							className='icon_usermenu_out'
					>Выход</SideMenuLink>
				</li>
			</ul>
		</div>
	);
}

export default UserMenu;
