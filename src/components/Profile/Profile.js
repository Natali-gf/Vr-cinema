import style from './style.module.scss';
import { userData } from '../../temporaryData/temporaryData';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Profile = ({ className }) => {

	const classes = cn(style.user, className);

	return (
		<div className={classes}>
			<img className={style.user__photo} src={userData.photo} alt={userData.name} />
			<div>
				<h4 className={style.user__name}>{userData.name}</h4>
				<p className={style.user__role}>{userData.role}</p>
			</div>
		</div>
	);
}

	Profile.propTypes = {className: PropTypes.string}
	Profile.defaultProps = {className: ''}

export default Profile;
