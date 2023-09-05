import style from './style.module.scss';
import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataRequest } from '../../../store/actions/userAction';
import noPhoto from '../../../assets/images/no_photo.svg';

export default function Profile({ className }) {
	const dispatch = useDispatch();
	const { userName } = useSelector(state => state.user)

	React.useEffect(() => {
		dispatch(getUserDataRequest())
	}, [])

	return (
		<div className={cn(style.user, className)}>
			<img className={style.user__photo} src={noPhoto} alt={userName} />
			<div>
				<h4 className={style.user__name}>{userName}</h4>
				<p className={style.user__role}>Администратор</p>
			</div>
		</div>
	);
}

