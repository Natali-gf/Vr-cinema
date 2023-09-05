import style from './style.module.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export default function SideMenuLink ({ children, to, className, onClick }) {
	const activeClass = ({isActive}) => (isActive && to !='/' ?
					cn(style.navlink_active, style.navlink, className) :
					cn(style.navlink, className));

	return (
		<NavLink className={activeClass}
			to={to}
			onClick={onClick}>
			{children}
		</NavLink>
	);
};
