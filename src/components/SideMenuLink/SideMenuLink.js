import style from './style.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SideMenuLink = ({ children, to, className }) => {

	const activeClass = ({isActive}) => (isActive && to !='/' ?
								`${style.sideMenu_active} ${style.sideMenu} ${className}`:
									`${style.sideMenu} ${className}`);

	return (
			<NavLink
				to={to}
				className={activeClass}>
				{children}
			</NavLink>
	);
};

SideMenuLink.propTypes = {
	children: PropTypes.node,
	to: PropTypes.string,
	className: PropTypes.string,
	active: PropTypes.func,
};

SideMenuLink.defaultProps = {
	children: 'default',
	to: '/',
	className: '',
	active: () => {},
};

export default SideMenuLink;
