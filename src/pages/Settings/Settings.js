import s from './style.module.scss';
import style from '../../components/forms/style.module.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Input from '../../components/ui/Input/Input';
import MainButton from '../../components/ui/MainButton/MainButton';
import { useForm } from 'react-hook-form';
import { userSetLoginRequest, userSetNameRequest, userSetPasswordRequest } from '../../store/actions/userAction';
import ActionNotification from '../../components/notifications/ActionNotification';
import GeneralNotification from '../../components/notifications/GeneralNotification';
import { fetchErrorMessage } from '../../store/slices/userSlice';

function Settings () {
	const dispatch = useDispatch();
	const {	userId, errorView } = useSelector(state => state.user);
	const {
		notificationText,
		notificationVisible,
		errorNotificationText,
		errorNotificationVisible
	} = useSelector(state => state.notification);

	const changeLogin = useForm({ mode: 'all' });
	const changePassword = useForm({ mode: 'all' });
	const changeName = useForm({ mode: 'all' });

	const [ usernameWatch, passwordWatch ] = changeLogin.watch(['new_username', 'current_password']);
	const [ currentPasswordWatch, newPasswordWatch ] = changePassword.watch(['current_password', 'new_password']);
	const [ nameWatch ] = changeName.watch(['new_name']);

	React.useEffect(() =>{
		if (errorView){
			dispatch(fetchErrorMessage(''));
		}
	}, [changeLogin.formState.isValidating ||
		changePassword.formState.isValidating ||
		changeName.formState.isValidating]);

	function onSubmitChangeLogin(data, e) {
		e.preventDefault();
		userSetLoginRequest(dispatch, data)
			.then(() => e.target.reset());
	}

	function onSubmitChangePassword(data, e) {
		e.preventDefault();
		userSetPasswordRequest(dispatch, data)
			.then(() => e.target.reset());
	}

	function onSubmitChangeName(data, e) {
		e.preventDefault();
		data.is_admin = true;
		userSetNameRequest(dispatch, data, userId)
			.then(() => e.target.reset());
	}

	return (
		<div className={cn(s.content)}>
			{/* <div className={s.content__settings}>
				<h3 className={s.content__title}>Изменить фото</h3>
				<form className={cn(s.content__form, s.form)}>
					<Input className={s.form__input}
						type={'file'}
						accept={'image*'} />
					<MainButton className={s.form__button}
						children={'Отправить'}
						type={'submit'} />
				</form>
			</div> */}

			<div className={s.content__settings}>
				<h3 className={s.content__title}>Изменить логин</h3>
				<form className={cn(s.content__form, s.form)}
					onSubmit={changeLogin.handleSubmit(onSubmitChangeLogin)}
					name={'changeLogin'}>
					<Input className={s.form__input}
						labelBefore={'Новый логин'}
						tabIndex={1}
						classError={changeLogin.formState.errors.new_username || errorView.new_username}
						nameField={'new_username'}
						placeholder={''}
						register={changeLogin.register}
						setValue={changeLogin.setValue}
						watch={usernameWatch}
						validation={{
							required: 'Обязательное поле!',
							pattern: {value: /^[A-Za-z0-9_\-.@]+$/,
									message: 'Только латинские буквы, цифры и символы @/./+/-/_'},
							maxLength: 50,
						}} />
					{(changeLogin.formState.errors.new_username || errorView.new_username) &&
						<div className={cn(style.form__error_message, s.form__error)}>
							{!changeLogin.formState.errors.new_username ?
								errorView.new_username : changeLogin.formState.errors.new_username.message}
						</div>}
					<Input className={s.form__input}
						labelBefore={'Пароль'}
						tabIndex={2}
						classError={changeLogin.formState.errors.current_password}
						type={'password'}
						nameField={'current_password'}
						placeholder={''}
						register={changeLogin.register}
						setValue={changeLogin.setValue}
						watch={passwordWatch}
						validation={{
							required: 'Обязательное поле!',
							pattern: {value: /^[A-Za-z0-9_\-.@]+$/,
									message: 'Только латинские буквы, цифры и символы @/./+/-/_'},
							maxLength: 50,
						}} />
					{(changeLogin.formState.errors.current_password || errorView.current_password) &&
						<div className={cn(style.form__error_message, s.form__error)}>
							{!changeLogin.formState.errors.current_password ?
								errorView.current_password : changeLogin.formState.errors.current_password.message}
						</div>}
					<MainButton className={s.form__button}
						children={'Отправить'}
						tabIndex={3}
						type={'submit'} />
				</form>
			</div>
			<div className={s.content__settings}>
				<h3 className={s.content__title}>Изменить пароль</h3>
				<form className={cn(s.content__form, s.form)}
					onSubmit={changePassword.handleSubmit(onSubmitChangePassword)}
					name={'changePassword'}>
					<Input className={s.form__input}
						labelBefore={'Текущий пароль'}
						tabIndex={4}
						classError={changePassword.formState.errors.current_password}
						type={'password'}
						nameField={'current_password'}
						placeholder={''}
						register={changePassword.register}
						setValue={changePassword.setValue}
						watch={currentPasswordWatch}
						validation={{
							required: 'Обязательное поле!',
							pattern: {value: /^[A-Za-z0-9_\-.@]+$/,
									message: 'Только латинские буквы, цифры и символы @/./+/-/_'},
							maxLength: 50,
						}}  />
					{(changePassword.formState.errors.current_password || errorView.current_password) &&
						<div className={cn(style.form__error_message, s.form__error)}>
							{!changePassword.formState.errors.current_password ?
								errorView.current_password : changePassword.formState.errors.current_password.message}
						</div>}
					<Input className={s.form__input}
						labelBefore={'Новый пароль'}
						tabIndex={5}
						classError={changePassword.formState.errors.new_password}
						type={'password'}
						nameField={'new_password'}
						placeholder={''}
						register={changePassword.register}
						setValue={changePassword.setValue}
						watch={newPasswordWatch}
						validation={{
							required: 'Обязательное поле!',
							pattern: {value: /^[A-Za-z0-9_\-.@]+$/,
									message: 'Только латинские буквы, цифры и символы @/./+/-/_'},
							maxLength: 50,
						}}  />
					{(changePassword.formState.errors.new_password || errorView.new_password) &&
						<div className={cn(style.form__error_message, s.form__error)}>
							{!changePassword.formState.errors.new_password ?
								errorView.new_password : changePassword.formState.errors.new_password.message}
						</div>}
					<MainButton className={s.form__button}
						children={'Отправить'}
						tabIndex={6}
						type={'submit'} />
				</form>
			</div>
			<div className={s.content__settings}>
				<h3 className={s.content__title}>Изменить имя</h3>
				<form className={cn(s.content__form, s.form)}
					onSubmit={changeName.handleSubmit(onSubmitChangeName)}>
					<Input className={s.form__input}
						labelBefore={'Новое имя'}
						tabIndex={7}
						classError={changeName.formState.errors.name}
						nameField={'name'}
						placeholder={''}
						register={changeName.register}
						setValue={changeName.setValue}
						watch={nameWatch} />
					{(changeName.formState.errors.name || errorView.name) &&
						<div className={cn(style.form__error_message, s.form__error)}>
							{!changeName.formState.errors.name ?
								errorView.name : changeName.formState.errors.name.message}
						</div>}
					<MainButton className={s.form__button}
						children={'Отправить'}
						tabIndex={8}
						type={'submit'} />
				</form>
			</div>
			<ActionNotification children={notificationText} isVisible={notificationVisible} />
			<GeneralNotification children={errorNotificationText} isVisible={errorNotificationVisible}/>
		</div>
	);
}

export default Settings;