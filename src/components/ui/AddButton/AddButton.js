import style from './style.module.scss';
import cn from 'classnames'

export default function AddFilm({className, children, onClick}) {
	return (
		<button className={cn(style.addButton, 'icon_add', className)}
				onClick={onClick}>
			{children}
		</button>
	);
}
