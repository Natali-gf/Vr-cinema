import style from './style.module.scss';
import cn from 'classnames';

export default function MainButton({children, className, onClick, isDisabled, type, tabIndex}) {
	
	return (
		<button className={cn(style.button, className)}
				onClick={onClick}
				disabled={isDisabled}
				tabIndex={tabIndex}
				type={type}>
			{children}
		</button>
	);
};
