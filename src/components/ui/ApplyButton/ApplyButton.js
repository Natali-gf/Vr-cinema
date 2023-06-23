import style from './style.module.scss';
import cn from 'classnames';

export default function ApplyButton({children, className, onClick, isDisabled}) {
	return (
		<button className={cn(style.applyButton, className)}
				onClick={onClick}
				disabled={isDisabled}
				type='submit'>
			{children}
		</button>
	);
};
