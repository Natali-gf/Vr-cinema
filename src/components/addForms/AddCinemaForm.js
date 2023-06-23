import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { cinemaType } from '../../data/constans';
import SingleSelect from '../ui/SingleSelect/SingleSelect';
import ApplyButton from '../ui/ApplyButton/ApplyButton';
import { addCinemaRequest } from '../../store/actions/addCinemaAction';
import { useForm } from 'react-hook-form';
import { btnClearField } from '../../helpers/helpers';

function AddCinemaForm({}) {
	const dispatch = useDispatch();
	const { errorMessage } = useSelector(state => state.addCinema);

	const { register, handleSubmit, setValue, setError, formState: {errors}, resetField, getValues} = useForm({
		mode: 'onTouched',
	})

	const onSubmit = (data) => {
		addCinemaRequest(dispatch, data)
	}

	React.useEffect(() => {
		register('ownership', { required: true })
	}, []);

	const BtnClearField = ({nameField}) => {
		return (
			<>
				{!!getValues(nameField) &&
					<button className={cn(s.form__clear, 'icon_close')}
						onClick={(e) => btnClearField(e, nameField, resetField)}/>}
			</>
		)
	}

	return(
		<>
			<form className={s.form}
				onSubmit={handleSubmit(onSubmit)}>
	{/* type_cinema */}
				<SingleSelect className={cn(s.form__select, {[s.form__error]: errors.type_cinema})}
					optionList={cinemaType}
					placeholder={'Тип кинотеатра'}
					name='type_cinema'
					onChange={(e) => {
						if (!e.value) {
							setError('type_cinema', 'Обязательное поле!')
						} else {
							setValue('type_cinema', e.value)
						}}}/>
				{errors.type_cinema &&
					<div className={s.form__error_message}>
						Обязательное поле!
					</div>}
	{/* name */}
				<div className={s.form__item}>
					<input className={s.form__input}
						placeholder='Название кинотеатра'
						autoComplete='off'
						{...register('name', { required: 'Обязательное поле!', maxLength: 64, })}/>
					<BtnClearField nameField={'name'}/>
				</div>
				{(errors.name || errorMessage.name) &&
					<div className={s.form__error_message}>
						{!errors.name ?
							errorMessage.name : errors.name.message}
					</div>}
	{/* franchisee */}
				<div className={cn(s.form__item, {[s.form__error]: errors.franchisee})}>
					<input className={s.form__input}
						type='text'
						placeholder='Владелец'
						{...register('franchisee', {
							required: 'Обязательное поле!',
							maxLength: 64 })}/>
					<BtnClearField nameField={'franchisee'}/>
				</div>
				{(errors.franchisee || errorMessage.franchisee) &&
					<div className={s.form__error_message}>
						{!errors.franchisee ?
							errorMessage.franchisee : errors.franchisee.message}
					</div>}
	{/* city */}
				<div className={cn(s.form__item, {[s.form__error]: errors.city})}>
					<input className={s.form__input}
						type='text'
						placeholder='Город'
						{...register('city', {
							required: 'Обязательное поле!',
							maxLength: 64 })}/>
					<BtnClearField nameField={'city'}/>
				</div>
				{(errors.city || errorMessage.city) &&
					<div className={s.form__error_message}>
						{!errors.city ?
							errorMessage.city : errors.city.message}
					</div>}
	{/* address */}
				<div className={cn(s.form__item, {[s.form__error]: errors.address})}>
					<input className={s.form__input}
						type='text'
						placeholder='Адрес'
						{...register('address', {
							required: 'Обязательное поле!',
							maxLength: 64 })}/>
					<BtnClearField nameField={'address'}/>
				</div>
				{(errors.address || errorMessage.address) &&
					<div className={s.form__error_message}>
						{!errors.address ?
							errorMessage.address : errors.address.message}
					</div>}
	{/* working_days */}
				<div className={cn(s.form__item, {[s.form__error]: errors.working_days})}>
					<input className={s.form__input}
						type='text'
						placeholder='Рабочие дни'
						autoComplete='off'
						{...register('working_days', {
							required: 'Обязательное поле!',
							maxLength: 64,
						})}/>
					<BtnClearField nameField={'working_days'}/>
				</div>
				{(errors.working_days || errorMessage.working_days) &&
					<div className={s.form__error_message}>
						{!errors.working_days ?
							errorMessage.working_days : errors.working_days.message}
					</div>}
	{/* description */}
				<div className={cn(s.form__item, {[s.form__error]: errors.description})}>
					<input className={s.form__input}
						type='description'
						placeholder='Описание кинотеатра'
						{...register('description', {
							required: 'Обязательное поле!',
						})}/>
					<BtnClearField nameField={'description'}/>
				</div>
				{(errors.description || errorMessage.description) &&
					<div className={s.form__error_message}>
						{!errors.description ?
							errorMessage.description : errors.description.message}
					</div>}
				<ApplyButton className={s.form__button}
					// type="primary"
					// onClick={onSubmit}
					htmlType='submit'>
					Добавить кинотеатр
				</ApplyButton>
			</form>
		</>
	)
}

export default AddCinemaForm;