import style from './style.module.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import MainButton from '../ui/MainButton/MainButton';
import { showErrorNotification } from '../../store/slices/notification';


function GeneralNotification({className, children, isVisible}) {
	const dispatch = useDispatch();

	return (
		<>
			{isVisible &&
				<div className={cn(style.generalNotification, className)}>
					<div className={style.generalNotification__container}>
						<button className={cn(style.generalNotification__close, 'icon_close')}
							onClick={() => dispatch(showErrorNotification(false))} />
						<h4 className={style.generalNotification__title}>Ошибка</h4>
						<p className={style.generalNotification__description}>{children || 'Попробуйте позже'}</p>
						<MainButton className={style.generalNotification__button}
							onClick={() => dispatch(showErrorNotification(false))}>
								OK
						</MainButton>
					</div>
				</div>
			}
		</>
	);
}

export default GeneralNotification;