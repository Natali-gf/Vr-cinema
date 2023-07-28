import { useDispatch } from "react-redux";
import s from './style.module.scss';

export const BtnEdit = ({modeInfo, showInfo, clearData, showEdit}) => {
	const dispatch = useDispatch()
	return (
		<div className={s.editing}>
			{modeInfo &&
				<button className={s.editing__button}
					children={'Редактировать'}
					onClick={() => {
						dispatch(showInfo(false));
						dispatch(clearData(''));
						dispatch(showEdit(true));
					}}
				/>}
		</div>
	)
}