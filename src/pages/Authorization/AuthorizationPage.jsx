import style from './style.module.scss';
import React from 'react';
import GeneralNotification from '../../components/notifications/GeneralNotification';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/ui/Input/Input';
import MainButton from '../../components/ui/MainButton/MainButton';
import { useForm } from 'react-hook-form';
import { authorizationRequest } from '../../store/actions/authorizationAction';

function Authorization() {
	const dispatch = useDispatch();
	const { errorNotificationText, errorNotificationVisible } = useSelector(state => state.notification);

	const {register, handleSubmit, setValue, formState: {errors }, watch } = useForm({ mode: 'all' });
	const [ usernameWatch, passwordWatch ] = watch(['username', 'password']);

	const onSubmit = (data) => {
		authorizationRequest(dispatch, data);
	}

	return (
		<>
		<div className={style.authorization}>
			<div className={style.authorization__container}>

				<form className={style.authorization__formBox}
					onSubmit={handleSubmit(onSubmit)}>
					<h2 className={style.authorization__title}>Авторизация</h2>
					<Input className={style.authorization__input}
						classError={errors.username}
						tabIndex={1}
						type="text"
						labelBefore={'Логин'}
						nameField={'username'}
						setValue={setValue}
						watch={usernameWatch}
						register={register}
						validation={{
							required: 'Обязательное поле!',
							pattern: {value: /^[A-Za-z0-9_\-.@]+$/,
									message: 'Только латинские буквы, цифры и символы @/./+/-/_'},
							maxLength: 150,
						}} />
					<Input className={style.authorization__input}
						classError={errors.password}
						tabIndex={2}
						type={"password"}
						labelBefore={'Пароль'}
						nameField={'password'}
						setValue={setValue}
						watch={passwordWatch}
						register={register}
						validation={{ required: 'Обязательное поле!',
							pattern: {value: /^[A-Za-z0-9_\-.@]+$/,
									message: 'Только латинские буквы, цифры и символы @/./+/-/_'},
							minLength: {value: 8, message: 'Пароль слишком короткий'},
							maxLength: 128 }}  />
					<MainButton className={style.authorization__button}
						children={'Войти'}
						tabIndex={3}
						type={'submit'} />
				</form>
			</div>
		</div>
		<GeneralNotification children={errorNotificationText} isVisible={errorNotificationVisible}/>
		</>
	);
}

export default Authorization;
