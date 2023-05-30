import style from './style.module.scss';
import cn from 'classnames'

function AddFilm() {
	return (
		<button className={cn(style.addFilm, 'icon_add')}>
			Добавить фильм
		</button>
	);
}

export default AddFilm;