import s from './style.module.scss';
import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function PopupWindow({className, children, showPopupWindow}) {
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(showPopupWindow(false))
		}
	}, []);

	return (
		<>
			<div className={cn(s.window, className)}>
				<div className={s.window__container}>
					<button className={cn(s.window__close, 'icon_close')}
						onClick={() => dispatch(showPopupWindow(false))}></button>
					<div className={s.window__form}>
						{children}
					</div>
				</div>
			</div>
		</>
	);
}
