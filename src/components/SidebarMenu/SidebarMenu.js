import style from './style.module.scss';
import logo from '../../assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';

function SidebarMenu({className}) {
	const classes = cn(style.sidebarMenu, className);
	SidebarMenu.propTypes = {className: PropTypes.string}
	SidebarMenu.defaultProps = {className: ''}

	return (
		<div className={classes}>
			<Link to='/' className={style.sidebarMenu__logo}><img src={logo} alt='Logo'></img></Link>
			<div className={cn(style.sidebarMenu__menu, 'icon_sidebar_menu')}/>
		</div>
	);
}

export default SidebarMenu;
