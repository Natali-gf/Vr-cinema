import ApplyButton from '../ApplyButton/ApplyButton';
import s from './style.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { showAddFilm } from '../../../store/slices/windowStateSlice';
// import { setFormAdd } from '../../../store/slices/formSlice';
import { addFilmRequest } from '../../../store/actions/addFilmAction';
import { addFranchiseeRequest } from '../../../store/actions/addFranchiseeAction';

export default function AddWindow({className, children, showAddwindow, addWindow}) {

	const { addFilmWindow } = useSelector(state => state.stateAddWindow);
	const dispatch = useDispatch();
	const {formAdd} = useSelector(state => state.form)

	function handleClick(e) {
		e.preventDefault()
		// addFranchiseeRequest(formAdd)
		addFilmRequest(formAdd)
		// dispatch(setFormAdd(JSON.stringify(fieldsFilm)));
	}

	return (
		<>
			<div className={cn(s.addWindow, className)}>
				<div className={s.addWindow__container}>
					<button className={cn(s.addWindow__close, 'icon_close')}
						onClick={() => dispatch(showAddwindow(!addWindow))}></button>
					<div className={s.addWindow__form}>
						{children}
					</div>
				</div>
			</div>
		</>
	);
}
