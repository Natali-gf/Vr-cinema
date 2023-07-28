import style from './style.module.scss';
import cn from 'classnames';

export default function MainButton({children, className, onClick, isDisabled, type}) {
	return (
		<button className={cn(style.button, className)}
				onClick={onClick}
				disabled={isDisabled}
				type={type}>
			{children}
		</button>
	);
};
