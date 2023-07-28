import style from './style.module.scss';
import SidebarMenu from './SidebarMenu';
import Profile from './SidebarProfile';
import SideTabs from './SidebarTabs';
import cn from 'classnames';
import SidebarOptions from './SidebarOptions';

export default function Sidebar(className) {
	return (
		<div className={cn(style.sidebar, className)}>
			<div className={style.sidebar__container}>
				<SidebarMenu className={style.sidebar__menu} />
				<Profile className={style.sidebar__user} />
				<SideTabs className={style.sidebar__tabs} />
				<SidebarOptions className={style.sidebar__options} />
			</div>
		</div>
	);
}
