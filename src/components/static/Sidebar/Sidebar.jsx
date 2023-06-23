import style from './style.module.scss';
import SidebarMenu from './SidebarMenu';
import Profile from './SidebarProfile';
import SideTabs from './SidebarTabs';
import UserMenu from '../../UserMenu/UserMenuLink';
import cn from 'classnames';

export default function Sidebar(className) {
	return (
		<div className={cn(style.sidebar, className)}>
			<div className={style.sidebar__container}>
				<SidebarMenu className={style.sidebar__menu} />
				<Profile className={style.sidebar__user} />
				<SideTabs className={style.sidebar__tabs} />
				<UserMenu className={style.sidebar__settings} />
			</div>
		</div>
	);
}
