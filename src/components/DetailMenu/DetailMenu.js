import React, { useState } from 'react';
import additionals from '../../assets/icons/additionals.svg'
import detail from '../../assets/icons/detail.svg';
import write from '../../assets/icons/write.svg';
import published_black from '../../assets/icons/published_black.svg';
import unpublished_black from '../../assets/icons/unpublished_black.svg';
import trash from '../../assets/icons/trash.svg';
import style from './style.module.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { showFilmEdit, showFilmInfo, showCinemaEdit, showCinemaInfo, showFranchiseeEdit, showFranchiseeInfo } from '../../store/slices/windowStateSlice';
import { setFilmId } from '../../store/slices/filmSlice';
import { setCinemaId } from '../../store/slices/cinemaSlice';
import { setFranchiseeId } from '../../store/slices/franchiseeSlice';
import { filmFormFields } from '../forms/FilmForm';
import { getCurrentFilmRequest, putFilmRequest } from '../../store/actions/filmActions';
import { setFormFieldsValue } from '../../helpers/helpers';
import { getCurrentCinemaRequest, putCinemaRequest } from '../../store/actions/cinemaAction';
import { cinemaFormFields } from '../forms/CinemaForm';
import { NavLink } from 'react-router-dom';

function DetailMenu(props) {
	const [visibleMenu, setVisibleMenu] = useState(false);
	const dispatch = useDispatch();

	const menuEdit = () => {
		switch (props.typeDetail) {
			case 'film':
				dispatch(showFilmEdit(true));
				dispatch(setFilmId(props.elemId));
				break;
			case 'cinema':
				dispatch(showCinemaEdit(true));
				dispatch(setCinemaId(props.elemId));
				break;
			case 'franchisee':
				dispatch(showFranchiseeEdit(true));
				dispatch(setFranchiseeId(props.elemId));
				break;
			case 'handbook':
				props.chooseOption('edit');
				setVisibleMenu(false);
				break;
		}
	}

	const menuInfo = () => {
		switch (props.typeDetail) {
			case 'film':
				dispatch(showFilmInfo(true));
				dispatch(setFilmId(props.elemId));
				break;
			case 'cinema':
				dispatch(showCinemaInfo(true));
				dispatch(setCinemaId(props.elemId));
				break;
			case 'franchisee':
				dispatch(showFranchiseeInfo(true));
				dispatch(setFranchiseeId(props.elemId));
				break;
		}
	}

	const menuDelete = () => {
		switch (props.typeDetail) {
			case 'handbook':
				props.chooseOption('delete');
				setVisibleMenu(false);
				break;
		}
	}

	const menuStatement = async(state) => {
		switch (props.typeDetail) {
			case 'film':
				await dispatch(getCurrentFilmRequest(props.elemId))
						.then(data => {
							let form = setFormFieldsValue(filmFormFields, null, data.data);
							form.is_published = !data.data.is_published;
							putFilmRequest(dispatch, form, props.elemId, state);
						})
				break;
			case 'cinema':
				await dispatch(getCurrentCinemaRequest(props.elemId))
						.then(data => {
							let form = setFormFieldsValue(cinemaFormFields, null, data.data);
							form.is_active = !data.data.is_active;
							putCinemaRequest(dispatch, form, props.elemId, state);
						})
				break;
		}
	}

	return (
		<>
		<button className={cn(style.detailMenu, props.className)}
			onClick={() => setVisibleMenu(!visibleMenu)}>
			<img className={style.detailMenu__img} src={additionals} alt="detail menu" />
		</button>
			{visibleMenu &&
				<ul className={style.detailMenu__list}>
					{(!props.whichFilms || props.whichFilms === 'all') &&
					<li className={style.detailMenu__item}>
						<img className={style.detailMenu__icon} src={write} alt="icon change" />
						<button className={style.detailMenu__button}
							disabled={props.isDisabledMenu || false}
							onClick={menuEdit}>Редактировать</button>
					</li>}
					{(props.typeDetail === 'franchisee' || props.typeDetail === 'handbook'
						|| props.whichFilms !== 'all') ? null : props.isPublished
						? <li className={style.detailMenu__item}>
							<img className={style.detailMenu__icon} src={unpublished_black} alt="icon archive" />
							<button className={style.detailMenu__button}
								disabled={props.isDisabledMenu || false}
								onClick={() => menuStatement('off')}>
									{props.typeDetail === 'film' ? 'Архивировать' : 'Действующий'}
							</button>
						</li>
						: <li className={style.detailMenu__item}>
							<img className={style.detailMenu__icon} src={published_black} alt="icon archive" />
							<button className={style.detailMenu__button}
								disabled={props.isDisabledMenu || false}
								onClick={() => menuStatement('on')}>
									{props.typeDetail === 'film' ? 'Публиковать' : 'Не действующий'}
							</button>
						</li>
					}
					{props.typeDetail !== 'handbook' &&
						<li className={style.detailMenu__item}>
							<img className={style.detailMenu__icon} src={detail} alt="icon detail" />
							<button className={style.detailMenu__button}
								disabled={props.isDisabledMenu || false}
								onClick={menuInfo}>Подробнее</button>
						</li>}
					{(props.typeDetail === 'franchisee' || props.typeDetail === 'cinema') &&
						<li className={style.detailMenu__item}>
							<div className={cn(style.detailMenu__icon, 'icon_film_catalog')} />
							<NavLink className={style.detailMenu__button}
								to={props.typeDetail === 'franchisee'
									? '/franchisee/franchisee_films'
									: '/cinema/cinema_films'}
									onClick={() => {
										props.typeDetail === 'franchisee'
										? localStorage.setItem('franchiseeId', props.elemId)
										: localStorage.setItem('cinemaId', props.elemId.id);}}
								>Список фильмов</NavLink>
						</li>}
					{props.typeDetail === 'handbook' &&
						<li className={style.detailMenu__item}>
							<img className={style.detailMenu__icon} src={trash} alt="icon delete" />
							<button className={style.detailMenu__button}
								disabled={props.isDisabledMenu || false}
								onClick={menuDelete}>Удалить</button>
						</li>}
				</ul>}
		</>
	);
}

export default DetailMenu;