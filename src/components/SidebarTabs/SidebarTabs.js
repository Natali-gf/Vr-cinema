import style from './style.module.scss';
import SideMenuLink from '../SideMenuLink/SideMenuLink';
import cn from 'classnames';
import PropTypes from 'prop-types';

function SideTabs({className}) {
	const classes = cn(style.tabs, className);
	SideTabs.propTypes = {className: PropTypes.string}
	SideTabs.defaultProps = {className: ''}

	return (
		<div className={classes}>
			<ul className={style.tabs__list}>
				<li className={style.tabs__item}>
					<SideMenuLink
							to='/films'
							className='icon_film_catalog'
					>Каталог фильмов</SideMenuLink>
				</li>
				<li className={style.tabs__item}>
					<SideMenuLink
							to='/cinema'
							className='icon_cinema_catalog'
					>База кинотеатров</SideMenuLink>
				</li>
			</ul>
		</div>
	);
}

export default SideTabs;
