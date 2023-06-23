import style from './style.module.scss';
import logo from '../../../assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import cn from 'classnames';

export default function SidebarMenu({className}) {
	return (
		<div className={cn(style.sidebarMenu, className)}>
			<Link to='/' className={style.sidebarMenu__logo}>
				<img src={logo} alt='Logo'/>
			</Link>
			{/* <div className={cn(style.sidebarMenu__menu, 'icon_sidebar_menu')}/> */}
		</div>
	);
}
