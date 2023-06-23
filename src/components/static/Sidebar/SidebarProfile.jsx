import style from './style.module.scss';
import { userData } from '../../../data/temporaryData';
import React from 'react';
import cn from 'classnames';

export default function Profile({ className }) {
	return (
		<div className={cn(style.user, className)}>
			<img className={style.user__photo} src={userData.photo} alt={userData.name} />
			<div>
				<h4 className={style.user__name}>{userData.name}</h4>
				<p className={style.user__role}>{userData.role}</p>
			</div>
		</div>
	);
}

