import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import SingleSelect from '../ui/select/SingleSelect';
import { getIndexCheckedItems, setFormFieldsValue } from '../../helpers/helpers';
import MainButton from '../ui/MainButton/MainButton';
import { useForm } from 'react-hook-form';
import { postFranchiseeRequest, putFranchiseeRequest, getCurrentFranchiseeRequest } from '../../store/actions/franchiseeAction';
import { clearFranchiseeData, fetchError } from '../../store/slices/franchiseeSlice';
import Input from '../ui/Input/Input';
import { franchiseeType } from '../../data/constans';
import { getFilmRequest } from '../../store/actions/filmActions';
import MultiSelect from '../ui/select/MultiSelect';
import { showFranchiseeEdit, showFranchiseeInfo } from '../../store/slices/windowStateSlice';
import loadingImg from '../../assets/icons/loading.svg';
import { BtnEdit } from './BtnEdit';

const franchiseeFormFields = ['name', 'username', 'password', 'number_contract',
							'ogrn', 'ogrnip', 'inn', 'kpp_bank', 'address',
							'bank_name', 'bank_account_number', 'bik_bank',
							'films', 'ownership'];

function FranchiseeForm ({className, franchiseeId, modeInfo, buttonName}) {

	const dispatch = useDispatch();
	const { franchiseeData, errorView } = useSelector(state => state.franchisee);
	const { films } = useSelector(state => state.films);
	const [ loadForm, setLoadForm] = React.useState('');
	const [ visibleField, setVisibleField ] = React.useState('');
	const [ isChanged, setIsChanged ] = React.useState(false);

	const { register, handleSubmit, setValue, setError, formState: {errors, isValidating, isDirty}, watch } = useForm({ mode: 'all' });

	const [ nameWatch, usernameWatch, passwordWatch, numberContractWatch,
		ogrnWatch, ogrnipWatch, innWatch, kppBankWatch, addressWatch,
		bankNameWatch, bankAccountNumberWatch, bikBankWatch ] = watch(franchiseeFormFields);

	React.useEffect(() => {
		if(franchiseeId){
			dispatch(getCurrentFranchiseeRequest(franchiseeId));
		} else {
			setLoadForm(true);
		};
		if(!films.length){
			dispatch(getFilmRequest());
		};
		// register fields
		register('ownership', { required: 'Обязательное поле!' });
		register('films');

			return () => {
				dispatch(clearFranchiseeData(''));
			}
	}, []);

	React.useEffect(() =>{
		if(franchiseeId === franchiseeData.id){
			setFormFieldsValue(franchiseeFormFields, setValue, franchiseeData);
			setVisibleField(franchiseeData.ownership)
			setLoadForm(true);
		}
	}, [franchiseeData]);

	React.useEffect(() =>{
		if (errorView){
			dispatch(fetchError(''));
		}
	}, [isValidating]);

	const onSubmit = async(data, e) => {
		console.log(e)
		e.preventDefault()
		if (!data.films){
			data.films=[];
		}
		console.log(data)
		if(franchiseeId){
			putFranchiseeRequest(dispatch, data, franchiseeId);
		} else {
			postFranchiseeRequest(dispatch, data);
		}
	}

	return (
		<>
			{modeInfo &&
			<BtnEdit modeInfo={modeInfo} clearData={clearFranchiseeData}
				showEdit={showFranchiseeEdit} showInfo={showFranchiseeInfo} />}
		{loadForm &&
			<form className={s.form}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={cn(s.form__fields, s.form__franchiseeFields)}>
					<h4 className={s.form__subtitle}>Персональные данные</h4>
		{/* ownership */}
					<div className={s.form__franchiseeField}>
						<SingleSelect className={cn(s.form__select)}
							classError={errors.ownership && errors.ownership.type}
							optionList={franchiseeType}
							defaultValue={() => franchiseeId ? getIndexCheckedItems(franchiseeType, [franchiseeData.ownership]).map(i => franchiseeType[i]) : null}
							selectValue={'value'} selectLabel={'label'}
							labelBefore={'Тип'} placeholder={'Выберите...'}
							onChange={(e) => {
								setValue('ownership', e.label);
								setVisibleField(e.label);
								setError('ownership', '');
								setIsChanged(true);
							}}
							isDisabled={modeInfo} />
						{errors.ownership &&
							<div className={s.form__error_message}>
								{!errors.ownership ?
									errorView.ownership : errors.ownership.message}
							</div>}
					</div>
		{/* name */}
					<div className={s.form__franchiseeField}>
						<Input classError={errors.name || errorView.name}
							labelBefore={'Наименование'}
							nameField={'name'}
							defaultValue={franchiseeId ? franchiseeData.name : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={nameWatch}
							register={register}
							validation={{ required: 'Обязательное поле!',
								maxLength: 150 }} />
						{(errors.name || errorView.name) &&
							<div className={s.form__error_message}>
								{!errors.name ?
									errorView.name : errors.name.message}
							</div>}
					</div>
		{/* username */}
					<div className={s.form__franchiseeField}>
						<Input classError={errors.username || errorView.username}
							labelBefore={'Логин'}
							nameField={'username'}
							defaultValue={franchiseeId ? franchiseeData.username : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={usernameWatch}
							register={register}
							validation={{
								required: 'Обязательное поле!',
								pattern: {value: /^[A-Za-z0-9_\-.@]+$/,
										message: 'Только латинские буквы, цифры и символы @/./+/-/_'},
								maxLength: 150,
							}} />
						{(errors.username || errorView.username) &&
							<div className={s.form__error_message}>
								{!errors.username ?
									errorView.username : errors.username.message}
							</div>}
					</div>
		{/* Password */}
					<div className={s.form__franchiseeField}>
						<Input classError={errors.password || errorView.password}
							type={'password'}
							labelBefore={'Пароль'}
							nameField={'password'}
							defaultValue={franchiseeId ? franchiseeData.password : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={passwordWatch}
							register={register}
							validation={{ required: 'Обязательное поле!',
								pattern: {value: /^[A-Za-z0-9_\-.@]+$/,
										message: 'Только латинские буквы, цифры и символы @/./+/-/_'},
								minLength: {value: 8, message: 'Пароль слишком короткий'},
								maxLength: 128 }} />
					{(errors.password || errorView.password) &&
						<div className={s.form__error_message}>
							{!errors.password ?
								errorView.password : errors.password.message}
						</div>}
					</div>
		{/* number_contract */}
					<div className={s.form__franchiseeField}>
						<Input classError={errors.number_contract || errorView.number_contract}
							labelBefore={'№ договора'}
							nameField={'number_contract'}
							defaultValue={franchiseeId ? franchiseeData.number_contract : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={numberContractWatch}
							register={register}
							validation={{ required: 'Обязательное поле!',
									maxLength: 100 }} />
					{(errors.number_contract || errorView.number_contract) &&
						<div className={s.form__error_message}>
							{!errors.number_contract ?
								errorView.number_contract : errors.number_contract.message}
						</div>}
					</div>
				{visibleField !== 'Другое' &&
					<div className={s.form__franchiseeFields_additional}>
						<h4 className={s.form__subtitle}>Реквизиты</h4>
		{/* ogrn */}
					{visibleField === 'OOO' &&
						<div className={s.form__franchiseeField}>
							<Input classError={errors.ogrn || errorView.ogrn}
								labelBefore={'ОГРН'}
								nameField={'ogrn'}
								defaultValue={franchiseeId ? franchiseeData.ogrn : ''}
								isDisabled={modeInfo}
								setValue={setValue}
								watch={ogrnWatch}
								register={register}
								validation={{
									maxLength: {
										value: 13,
										message: 'ОГРН должен состоять из 13 цифр / Неверный ОГРН'},
									minLength: {
										value: 13,
										message: 'ОГРН должен состоять из 13 цифр / Неверный ОГРН'}
								}} />
						{(errors.ogrn || errorView.ogrn) &&
							<div className={s.form__error_message}>
								{!errors.ogrn ?
									errorView.ogrn : errors.ogrn.message}
							</div>}
						</div>}
		{/* ogrnip */}
					{visibleField === 'ИП' &&
						<div className={s.form__franchiseeField}>
							<Input classError={errors.ogrnip || errorView.ogrnip}
								labelBefore={'ОГРНИП'}
								nameField={'ogrnip'}
								defaultValue={franchiseeId ? franchiseeData.ogrnip : ''}
								isDisabled={modeInfo}
								setValue={setValue}
								watch={ogrnipWatch}
								register={register}
								validation={{
									minLength: {
										value: 15,
										message: 'ОГРНИП должен состоять из 15 цифр / Неверный ОГРНИП'},
									maxLength: {
										value: 15,
										message: 'ОГРНИП должен состоять из 15 цифр / Неверный ОГРНИП'}
								}} />
							{(errors.ogrnip || errorView.ogrnip) &&
								<div className={s.form__error_message}>
									{!errors.ogrnip ?
										errorView.ogrnip : errors.ogrnip.message}
								</div>}
						</div>}
		{/* inn */}
						<div className={s.form__franchiseeField}>
							<Input classError={errors.inn || errorView.inn}
								labelBefore={'ИНН'}
								nameField={'inn'}
								defaultValue={franchiseeId ? franchiseeData.inn : ''}
								isDisabled={modeInfo}
								setValue={setValue}
								watch={innWatch}
								register={register}
								validation={{
									minLength: {
										value: 10,
										message: 'ИНН должен состоять из 10 или 12 цифр / Неверный ИНН'},
									maxLength: {
										value: 12,
										message: 'ИНН должен состоять из 10 или 12 цифр / Неверный ИНН'}
								}} />
							{(errors.inn || errorView.inn) &&
								<div className={s.form__error_message}>
									{!errors.inn ?
										errorView.inn : errors.inn.message}
								</div>}
						</div>
		{/* kpp_bank */}
						<div className={s.form__franchiseeField}>
							<Input classError={errors.kpp_bank || errorView.kpp_bank}
								labelBefore={'КПП'}
								nameField={'kpp_bank'}
								defaultValue={franchiseeId ? franchiseeData.kpp_bank : ''}
								isDisabled={modeInfo}
								setValue={setValue}
								watch={kppBankWatch}
								register={register}
								validation={{
									minLength: {
										value: 9,
										message: 'КПП должен состоять из 10 или 12 цифр / Неверный КПП'},
									maxLength: {
										value: 12,
										message: 'КПП должен состоять из 10 или 12 цифр / Неверный КПП'}
								}} />
							{(errors.kpp_bank || errorView.kpp_bank) &&
								<div className={s.form__error_message}>
									{!errors.kpp_bank ?
										errorView.kpp_bank : errors.kpp_bank.message}
								</div>}
						</div>
		{/* address */}
						<div className={s.form__franchiseeField}>
							<Input classError={errors.address || errorView.address}
								labelBefore={'Адрес'}
								nameField={'address'}
								defaultValue={franchiseeId ? franchiseeData.address : ''}
								isDisabled={modeInfo}
								setValue={setValue}
								watch={addressWatch}
								register={register}
								validation={{ maxLength: 150 }} />
							{(errors.address || errorView.address) &&
								<div className={s.form__error_message}>
									{!errors.address ?
										errorView.address : errors.address.message}
								</div>}
						</div>
						<h4 className={s.form__subtitle}>Банковские реквизиты</h4>
		{/* bank_name */}
						<div className={s.form__franchiseeField}>
							<Input classError={errors.bank_name || errorView.bank_name}
								labelBefore={'Название банка'}
								nameField={'bank_name'}
								defaultValue={franchiseeId ? franchiseeData.bank_name : ''}
								isDisabled={modeInfo}
								setValue={setValue}
								watch={bankNameWatch}
								register={register}
								validation={{ maxLength: 150 }} />
							{(errors.bank_name || errorView.bank_name) &&
								<div className={s.form__error_message}>
									{!errors.bank_name ?
										errorView.bank_name : errors.bank_name.message}
								</div>}
						</div>
		{/* bank_account_number */}
						<div className={s.form__franchiseeField}>
							<Input classError={errors.bank_account_number || errorView.bank_account_number}
								labelBefore={'Номер счета'}
								nameField={'bank_account_number'}
								defaultValue={franchiseeId ? franchiseeData.bank_account_number : ''}
								isDisabled={modeInfo}
								setValue={setValue}
								watch={bankAccountNumberWatch}
								register={register}
								validation={{
									maxLength: {
										value: 20,
										message: 'Максимум 20 цифр'}
								}}  />
							{(errors.bank_account_number || errorView.bank_account_number) &&
								<div className={s.form__error_message}>
									{!errors.bank_account_number ?
										errorView.bank_account_number : errors.bank_account_number.message}
								</div>}
						</div>
		{/* bik_bank */}
						<div className={s.form__franchiseeField}>
							<Input classError={errors.bik_bank || errorView.bik_bank}
								labelBefore={'БИК'}
								nameField={'bik_bank'}
								defaultValue={franchiseeId ? franchiseeData.bik_bank : ''}
								isDisabled={modeInfo}
								setValue={setValue}
								watch={bikBankWatch}
								register={register}
								validation={{
									minLength: {
										value: 9,
										message: 'БИК должен состоять из 9 или 12 цифр / Неверный БИК'},
									maxLength: {
										value: 9,
										message: 'БИК должен состоять из 9 или 12 цифр / Неверный БИК'}
								}} />
							{(errors.bik_bank || errorView.bik_bank) &&
								<div className={s.form__error_message}>
									{!errors.bik_bank ?
										errorView.bik_bank : errors.bik_bank.message}
								</div>}
						</div>
					</div>}
	{/* films */}
					<div className={s.form__franchiseeField}>
						<MultiSelect className={cn(s.form__select)}
							classError={errors.films && errors.films.type}
							optionList={films}
							selectValue={'id'} selectLabel={'name'}
							labelBefore={'Фильмы'} placeholder={'Выберите...'}
							defaultValue={() => franchiseeId ?
								getIndexCheckedItems(films, franchiseeData.films).map(i => films[i]) : null}
							isDisabled={modeInfo}
							onChange={(e) => {
								let films=[];
								if (!e.length) {
									setError('films', 'Обязательное поле!')
								} else {
									e.map(elem => films.push(elem.name));
									setError('films', '');
								}
								setValue('films', films);
								setIsChanged(true);
							}}
							selectType={'selectCheckbox'} />
						{(errors.films || errorView.films) &&
							<div className={s.form__error_message}>
								{!errors.films ?
									errorView.films : errors.films.message}
							</div>}
					</div>
				</div>
				{buttonName &&
					<MainButton className={cn(s.form__button)}
						htmlType='submit'
						isDisabled={franchiseeId === undefined && !isDirty && !isChanged}>
						{buttonName}
					</MainButton>}
			</form>}
			{!loadForm &&
				<img className={s.loading} src={loadingImg} alt={'Loading'} />}
		</>
	);
}

export default FranchiseeForm;