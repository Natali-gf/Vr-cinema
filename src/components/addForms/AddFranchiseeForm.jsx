import React from 'react';
import s from './style.module.scss';
import './style.scss';
import cn from 'classnames';
import SingleSelect from '../ui/SingleSelect/SingleSelect';
import { franchiseeType } from '../../data/constans';
import ApplyButton from '../ui/ApplyButton/ApplyButton';
import { addFranchiseeRequest } from '../../store/actions/addFranchiseeAction';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { btnClearField } from '../../helpers/helpers';


function AddFranchiseeForm(){
	const [visibleField, setVisibleField] = React.useState('');
	const dispatch = useDispatch();
 	const { errorMessage } = useSelector(state => state.addFranchisee);

	const { register, handleSubmit, setValue, setError, formState: {errors}, resetField, getValues} = useForm({
		mode: 'onTouched',
		defaultValues: {
		}
	})

	const onSubmit = (data) => {
		addFranchiseeRequest(dispatch, data)
	}

	React.useEffect(() => {
		register('ownership', { required: true })
	}, []);

	// const InputField = ({nameField, placeholder, className, type}) => {
	// 	// const [valu, setValu] = React.useState(getValues(nameField))
	// 	React.useEffect(() => {
	// 		setFocus(nameField)
	// 		console.log(getValues(nameField))
	// 	}, []);
	// 	// setFocus()
	// 	// console.log(getValues(nameField))
	// 	// console.log(dirtyFields.name);
	// 	return (
	// 		<div className={s.form__item}>
	// 			<input className={cn(s.form__input, className)}
	// 				type={type}
	// 				placeholder={placeholder}
	// 				{...register(nameField)}
	// 				/>

	// 			{/* <button className={cn(s.form__button, 'icon_close')}
	// 				onClick={(e) => {
	// 					e.preventDefault();
	// 					resetField(nameField)}} /> */}
	// 		</div>
	// 	)
	// }

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
				<h4 className={s.form__subtitle}>Персональные данные</h4>
	{/* ownership */}
				<SingleSelect className={cn(s.form__select, {[s.form__error]: errors.ownership})}
					optionList={franchiseeType}
					placeholder={'Тип'}
					name='ownership'
					onChange={(e) => {
						if (!e.value) {
							setError('ownership', 'Обязательное поле!')
						} else {
							setValue('ownership', e.value)
							setVisibleField(e.value)
						}}}/>
				{errors.ownership &&
					<div className={s.form__error_message}>
						Обязательное поле!
					</div>}
	{/* name */}
				<div className={s.form__item}>
					<input className={s.form__input}
						placeholder='Наименование'
						autoComplete='off'
						{...register('name')}/>
					<BtnClearField nameField={'name'}/>
				</div>
				{(errors.name || errorMessage.name) &&
					<div className={s.form__error_message}>
						{!errors.name ?
							errorMessage.name : errors.name.message}
					</div>}
	{/* username */}
				<div className={cn(s.form__item, {[s.form__error]: errors.username})}>
					<input className={s.form__input}
						type='text'
						placeholder='Логин'
						autoComplete='off'
						{...register('username', {
							required: 'Обязательное поле!',
							pattern: {value: /^[A-Za-z0-9_\-.@]+$/, message: 'Только латинские буквы, цифры и символы @/./+/-/_'},
							maxLength: 150,
						})}/>
					<BtnClearField nameField={'username'}/>
				</div>
				{(errors.username || errorMessage.username) &&
					<div className={s.form__error_message}>
						{!errors.username ?
							errorMessage.username : errors.username.message}
					</div>}
	{/* Password */}
				<div className={cn(s.form__item, {[s.form__error]: errors.password})}>
					<input className={s.form__input}
						type='password'
						placeholder='Пароль'
						{...register('password', {
							required: 'Обязательное поле!',
							minLength: {value: 8, message: 'Пароль слишком короткий'}
						})}/>
					<BtnClearField nameField={'password'}/>
				</div>
				{(errors.password || errorMessage.password) &&
					<div className={s.form__error_message}>
						{!errors.password ?
							errorMessage.password : errors.password.message}
					</div>}
	{/* number_contract */}
				<div className={cn(s.form__item, {[s.form__error]: errors.number_contract})}>
					<input className={s.form__input}
						type='text'
						placeholder='№ договора'
						{...register('number_contract', {
							required: 'Обязательное поле!',
							maxLength: 100,
						})}/>
					<BtnClearField nameField={'number_contract'}/>
				</div>
				{(errors.number_contract || errorMessage.number_contract) &&
					<div className={s.form__error_message}>
						{!errors.number_contract ?
							errorMessage.number_contract : errors.number_contract.message}
					</div>}
			{visibleField !== 'Другое' &&
				<div>
					<h4 className={s.form__subtitle}>Реквизиты</h4>
	{/* ogrn */}
				{visibleField === 'OOO' &&
					<div className={cn(s.form__item, {[s.form__error]: errors.ogrn})}>
						<input className={s.form__input}
							type='text'
							placeholder='ОГРН'
							{...register('ogrn', { maxLength: 50 })}/>
					</div>}
					{(errors.ogrn || errorMessage.ogrn) &&
						<div className={s.form__error_message}>
							{!errors.ogrn ?
								errorMessage.ogrn : errors.ogrn.message}
						</div>}
	{/* ogrnip */}
				{visibleField === 'ИП' &&
					<div className={cn(s.form__item, {[s.form__error]: errors.ogrnip})}>
						<input className={s.form__input}
							type='text'
							placeholder='ОГРНИП'
							{...register('ogrnip', { maxLength: 50 })}/>
					</div>}
					{(errors.ogrnip || errorMessage.ogrnip) &&
						<div className={s.form__error_message}>
							{!errors.ogrnip ?
								errorMessage.ogrnip : errors.ogrnip.message}
						</div>}
	{/* inn */}
					<div className={cn(s.form__item, {[s.form__error]: errors.inn})}>
						<input className={s.form__input}
							type='text'
							placeholder='ИНН'
							{...register('inn', { maxLength: 50 })}/>
					</div>
					{(errors.inn || errorMessage.inn) &&
						<div className={s.form__error_message}>
							{!errors.inn ?
								errorMessage.inn : errors.inn.message}
						</div>}
	{/* kpp_bank */}
					<div className={cn(s.form__item, {[s.form__error]: errors.kpp_bank})}>
						<input className={s.form__input}
							type='text'
							placeholder='КПП'
							{...register('kpp_bank', { maxLength: 50 })}/>
					</div>
					{(errors.kpp_bank || errorMessage.kpp_bank) &&
						<div className={s.form__error_message}>
							{!errors.kpp_bank ?
								errorMessage.kpp_bank : errors.kpp_bank.message}
						</div>}
	{/* address */}
					<div className={cn(s.form__item, {[s.form__error]: errors.address})}>
						<input className={s.form__input}
							type='text'
							placeholder='Адрес'
							{...register('address', { maxLength: 150 })}/>
					</div>
					{(errors.address || errorMessage.address) &&
						<div className={s.form__error_message}>
							{!errors.address ?
								errorMessage.address : errors.address.message}
						</div>}
				<h4 className={s.form__subtitle}>Банковские реквизиты</h4>
	{/* bank_name */}
					<div className={cn(s.form__item, {[s.form__error]: errors.bank_name})}>
						<input className={s.form__input}
							type='text'
							placeholder='Название банка'
							{...register('bank_name', { maxLength: 150 })}/>
					</div>
					{(errors.bank_name || errorMessage.bank_name) &&
						<div className={s.form__error_message}>
							{!errors.bank_name ?
								errorMessage.bank_name : errors.bank_name.message}
						</div>}
	{/* bank_account_number */}
					<div className={cn(s.form__item, {[s.form__error]: errors.bank_account_number})}>
						<input className={s.form__input}
							type='text'
							placeholder='Номер счета'
							{...register('bank_account_number', { maxLength: 50 })}/>
					</div>
					{(errors.bank_account_number || errorMessage.bank_account_number) &&
						<div className={s.form__error_message}>
							{!errors.bank_account_number ?
								errorMessage.bank_account_number : errors.bank_account_number.message}
						</div>}
	{/* bik_bank */}
					<div className={cn(s.form__item, {[s.form__error]: errors.bik_bank})}>
						<input className={s.form__input}
							type='text'
							placeholder='БИК'
							{...register('bik_bank', { maxLength: 50 })}/>
					</div>
					{(errors.bik_bank || errorMessage.bik_bank) &&
						<div className={s.form__error_message}>
							{!errors.bik_bank ?
								errorMessage.bik_bank : errors.bik_bank.message}
						</div>}
				</div>}
				<ApplyButton className={s.form__button}
					htmlType='submit'>
					Добавить франчайзи
				</ApplyButton>
			</form>
		</>
	)
}

export default AddFranchiseeForm;