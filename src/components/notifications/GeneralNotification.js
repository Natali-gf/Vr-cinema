import style from './style.module.scss';
import loadingImg from '../../assets/icons/loading.svg';
import published from '../../assets/icons/published.svg';
import unpublished from '../../assets/icons/unpublished.svg';
import DetailMenu from '../DetailMenu/DetailMenu';
import { getCinemaRequest } from '../../store/actions/cinemaAction';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';


function ActionNotification({className, children, isVisible}) {

	return (
		<>
			{isVisible &&
				<div className={cn(style.notification, className)}>
					{children}
				</div>
			}
		</>
	);
}

export default ActionNotification;