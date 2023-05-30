import style from './style.module.scss';
import PropTypes from "prop-types";
import cn from 'classnames';

function FilterButton({children, className, onClick, active, value}) {
	const classes = cn(style.filterButton, className, {active})

	return (
		<>
			<div className={classes} onClick={onClick} value={value}>
				{children}
			</div>
		</>
	);
};

FilterButton.propTypes = {
	onClick: PropTypes.func,
	active: PropTypes.bool
};
FilterButton.defaultPropTypes = {
	onClick: () => {},
	active: false
};

export default FilterButton;