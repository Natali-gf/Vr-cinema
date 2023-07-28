import React, { useState } from 'react';
import additionals from '../../assets/icons/additionals.svg'
import detail from '../../assets/icons/detail.svg';
import write from '../../assets/icons/write.svg';
import published_black from '../../assets/icons/published_black.svg';
import unpublished_black from '../../assets/icons/unpublished_black.svg';
import trash from '../../assets/icons/trash.svg';
import style from './style.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { showFilmEdit, showFilmInfo, showCinemaEdit, showCinemaInfo, showFranchiseeEdit, showFranchiseeInfo } from '../../store/slices/windowStateSlice';
import { setFilmId } from '../../store/slices/filmSlice';
import { setCinemaId } from '../../store/slices/cinemaSlice';
import { setFranchiseeId } from '../../store/slices/franchiseeSlice';
import { useForm } from 'react-hook-form';
import FilmForm, { filmFormFields } from '../forms/FilmForm';
import { getCurrentFilmRequest, putFilmRequest } from '../../store/actions/filmActions';
import { setFormFieldsValue } from '../../helpers/helpers';
import { getCurrentCinemaRequest, putCinemaRequest } from '../../store/actions/cinemaAction';
import { cinemaFormFields } from '../forms/CinemaForm';

function DetailMenu({className, isPublished, elemId, typeDetail, chooseOption, isDisabledMenu}) {
	const [visibleMenu, setVisibleMenu] = useState(false);
	const dispatch = useDispatch();

	const menuEdit = () => {
		switch (typeDetail) {
			case 'film':
				dispatch(showFilmEdit(true));
				dispatch(setFilmId(elemId));
				break;
			case 'cinema':
				dispatch(showCinemaEdit(true));
				dispatch(setCinemaId(elemId));
				break;
			case 'franchisee':
				dispatch(showFranchiseeEdit(true));
				dispatch(setFranchiseeId(elemId));
				break;
			case 'handbook':
				chooseOption('edit');
				setVisibleMenu(false);
				break;
		}
	}

	const menuInfo = () => {
		switch (typeDetail) {
			case 'film':
				dispatch(showFilmInfo(true));
				dispatch(setFilmId(elemId));
				break;
			case 'cinema':
				dispatch(showCinemaInfo(true));
				dispatch(setCinemaId(elemId));
				break;
			case 'franchisee':
				dispatch(showFranchiseeInfo(true));
				dispatch(setFranchiseeId(elemId));
				break;
		}
	}

	const menuDelete = () => {
		switch (typeDetail) {
			case 'handbook':
				chooseOption('delete');
				setVisibleMenu(false);
				break;
		}
	}

	const menuStatement = async(state) => {
		switch (typeDetail) {
			case 'film':
				await dispatch(getCurrentFilmRequest(elemId))
						.then(data => {
							let form = setFormFieldsValue(filmFormFields, null, data.data);
							form.is_published = !data.data.is_published;
							putFilmRequest(dispatch, form, elemId, state);
						})
				break;
			case 'cinema':
				await dispatch(getCurrentCinemaRequest(elemId))
						.then(data => {
							console.log(data)
							let form = setFormFieldsValue(cinemaFormFields, null, data.data);
							form.is_active = !data.data.is_active;
							putCinemaRequest(dispatch, form, elemId, state);
						})
				break;
		}
	}

	return (
		<>
		<button className={cn(style.detailMenu, className)}
			onClick={() => setVisibleMenu(!visibleMenu)}>
			<img className={style.detailMenu__img} src={additionals} alt="detail menu" />
		</button>
			{visibleMenu &&
				<ul className={style.detailMenu__list}>
					<li className={style.detailMenu__item}>
						<img className={style.detailMenu__icon} src={write} alt="icon change" />
						<button className={style.detailMenu__button}
							disabled={isDisabledMenu || false}
							onClick={menuEdit}>Редактировать</button>
					</li>
					{(typeDetail === 'franchisee' || typeDetail === 'handbook') ? null : isPublished ?
						<li className={style.detailMenu__item}>
							<img className={style.detailMenu__icon} src={unpublished_black} alt="icon archive" />
							<button className={style.detailMenu__button}
								disabled={isDisabledMenu || false}
								onClick={() => menuStatement('off')}>
									{typeDetail === 'film' ? 'Архивировать' : 'Не действующий'}
							</button>

						</li> :
						<li className={style.detailMenu__item}>
							<img className={style.detailMenu__icon} src={published_black} alt="icon archive" />
							<button className={style.detailMenu__button}
								disabled={isDisabledMenu || false}
								onClick={() => menuStatement('on')}>
									{typeDetail === 'film' ? 'Архивировать' : 'Не действующий'}
							</button>
						</li>
					}
					{typeDetail !== 'handbook' &&
						<li className={style.detailMenu__item}>
							<img className={style.detailMenu__icon} src={detail} alt="icon detail" />
							<button className={style.detailMenu__button}
								disabled={isDisabledMenu || false}
								onClick={menuInfo}>Подробнее</button>
						</li>}
					{typeDetail === 'handbook' &&
						<li className={style.detailMenu__item}>
							<img className={style.detailMenu__icon} src={trash} alt="icon delete" />
							<button className={style.detailMenu__button}
								disabled={isDisabledMenu || false}
								onClick={menuDelete}>Удалить</button>
						</li>}
				</ul>}
		</>
	);
}

export default DetailMenu;