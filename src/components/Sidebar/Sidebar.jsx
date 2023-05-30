import style from './style.module.scss';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import Profile from '../Profile/Profile';
import SideTabs from '../SidebarTabs/SidebarTabs';
import UserMenu from '../UserMenu/UserMenuLink';
import cn from 'classnames';

function Sidebar(className) {
	const classes = cn(style.sidebar, className)
	return (
		<div className={classes}>
			<div className={style.sidebar__container}>
				<SidebarMenu className={style.sidebar__menu} />
				<Profile className={style.sidebar__user} />
				<SideTabs className={style.sidebar__tabs} />
				<UserMenu className={style.sidebar__userMenu} />
			</div>
		</div>
	);
}

export default Sidebar;

