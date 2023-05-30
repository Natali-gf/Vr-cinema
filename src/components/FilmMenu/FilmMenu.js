import { useState } from 'react';
import additionals from '../../assets/icons/additionals.svg'
import write from '../../assets/icons/write.svg';
import archive from '../../assets/icons/archive.svg';
import trash from '../../assets/icons/trash.svg';
import style from './style.module.scss';

function FilmMenu() {
	// toggle film menu
	const [visibleMenu, setVisibleMenu] = useState(false);

	return (
		<>
			<button onClick={() => setVisibleMenu(!visibleMenu)}>
				<img src={additionals} alt="" />
				{visibleMenu && <div className={style.filmMenu}>
					<ul className={style.filmMenu__list}>
						<li className={style.filmMenu__item}>
							<img className={style.filmMenu__icon} src={write} alt="icon change" />
							Редактировать
						</li>
						<li className={style.filmMenu__item}>
							<img className={style.filmMenu__icon} src={archive} alt="icon archive" />
							Архивировать
						</li>
						<li className={style.filmMenu__item}>
							<img className={style.filmMenu__icon} src={trash} alt="icon delete" />
							Удалить
						</li>
					</ul>
				</div>}
			</button>
		</>
	);
}

export default FilmMenu;