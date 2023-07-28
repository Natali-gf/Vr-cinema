import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import SingleSelect from '../ui/select/SingleSelect';
import { getIndexCheckedItems, setFormFieldsValue } from '../../helpers/helpers';
import MainButton from '../ui/MainButton/MainButton';
import { useForm } from 'react-hook-form';
import Checkbox from '../ui/Checkbox/Checkbox';
import Input from '../ui/Input/Input';
import { getCurrentCinemaRequest, postCinemaRequest, putCinemaRequest } from '../../store/actions/cinemaAction';
import { clearCinemaData, fetchError } from '../../store/slices/cinemaSlice';
import { getTypeCinemaRequest } from '../../store/actions/typeCinemaActions';
import { showCinemaEdit, showCinemaInfo } from '../../store/slices/windowStateSlice';
import loadingImg from '../../assets/icons/loading.svg';
import { getFranchiseeRequest } from '../../store/actions/franchiseeAction';
import { getCityRequest } from '../../store/actions/cityActions';
import { BtnEdit } from './BtnEdit';

export const cinemaFormFields = ['name', 'address', 'working_days', 'is_active', 'franchisee', 'city',  'type_cinema'];

function CinemaForm({className, modeInfo, cinemaId, buttonName}) {

	const dispatch = useDispatch();
	const { typeCinema } = useSelector(state => state.typeCinema);
	const { city } = useSelector(state => state.city);
	const { cinemaData, errorView} = useSelector(state => state.cinema);
	const { franchisee } = useSelector(state => state.franchisee);
	const [ loadForm, setLoadForm] = React.useState('');
	const [ isChanged, setIsChanged ] = React.useState(false);

	const { register, handleSubmit, setValue, setError, formState: {errors, isDirty, isValidating}, watch } = useForm({ mode: 'all' });

	const [ nameWatch, addressWatch, workingDaysWatch ] = watch(cinemaFormFields);

	React.useEffect(() => {
		if(cinemaId){
			dispatch(getCurrentCinemaRequest(cinemaId));
		} else {
			setLoadForm(true);
		};
		dispatch(getTypeCinemaRequest());
		dispatch(getFranchiseeRequest());
		dispatch(getCityRequest());
		// register fields
		register('type_cinema', { required: 'Обязательное поле!' });
		register('city', { required: 'Обязательное поле!' });
		register('franchisee', { required: 'Обязательное поле!' });
		register('is_active');

			return () => {
				dispatch(clearCinemaData(''));
			}
	}, []);

	React.useEffect(() =>{
		if(cinemaId === cinemaData.id){
			setFormFieldsValue(cinemaFormFields, setValue, cinemaData);
			setLoadForm(true);
		}
	}, [cinemaData]);

	React.useEffect(() =>{
		if (errorView){
			dispatch(fetchError(''));
		}
	}, [isValidating]);

	const onSubmit = (data, e) => {
		console.log(data)
		e.preventDefault()
		if(cinemaId){
			putCinemaRequest(dispatch, data, cinemaId);
		} else {
			postCinemaRequest(dispatch, data);
		}
	}

	return (
		<>
			{modeInfo &&
			<BtnEdit modeInfo={modeInfo} clearData={clearCinemaData}
				showEdit={showCinemaEdit} showInfo={showCinemaInfo} />}
		{loadForm &&
			<form className={s.form}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={cn(s.form__fields, s.form__cinemaFields)}>
	{/* type_cinema */}
					<div className={s.form__cinemaField}>
						<SingleSelect className={cn(s.form__select)}
							classError={errors.type_cinema && errors.type_cinema.type}
							optionList={typeCinema}
							defaultValue={() => cinemaId ? getIndexCheckedItems(typeCinema, [cinemaData.type_cinema]).map(i => typeCinema[i]) : null}
							selectValue={'id'} selectLabel={'name'}
							placeholder={'Выберите...'} labelBefore={'Тип кинотеатра'}
							onChange={(e) => {
								setValue('type_cinema', e.name);
								setError('type_cinema', '');
								setIsChanged(true);
							}}
							isDisabled={modeInfo} />
						{errors.type_cinema &&
							<div className={s.form__error_message}>
								{!errors.city ?
									errorView.city : errors.city.message}
							</div>}
					</div>
	{/* city */}
					<div className={s.form__cinemaField}>
						<SingleSelect className={cn(s.form__select)}
							classError={errors.city && errors.city.type}
							optionList={city}
							defaultValue={() => cinemaId ? getIndexCheckedItems(city, [cinemaData.city]).map(i => city[i]) : null}
							selectValue={'id'} selectLabel={'name'}
							placeholder={'Выберите...'} labelBefore={'Город'}
							onChange={(e) => {
								setValue('city', e.name);
								setError('city', '');
								setIsChanged(true);
							}}
							isDisabled={modeInfo} />
						{(errors.city || errorView.city) &&
							<div className={s.form__error_message}>
								{!errors.city ?
									errorView.city : errors.city.message}
							</div>}
					</div>
	{/* address */}
					<div className={s.form__cinemaField}>
						<Input classError={errors.address}
							labelBefore={'Адрес'}
							nameField={'address'}
							defaultValue={cinemaId ? cinemaData.address : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={addressWatch}
							register={register}
							validation={{ required: 'Обязательное поле!',
								maxLength: 64 }} />
					{(errors.address || errorView.address) &&
						<div className={s.form__error_message}>
							{!errors.address ?
								errorView.address : errors.address.message}
						</div>}
					</div>
	{/* franchisee */}
					<div className={s.form__cinemaField}>
						<SingleSelect className={cn(s.form__select)}
							classError={errors.franchisee && errors.franchisee.type}
							optionList={franchisee}
							defaultValue={() => cinemaId ? getIndexCheckedItems(franchisee, [cinemaData.franchisee]).map(i => franchisee[i]) : null}
							selectValue={'id'} selectLabel={'name'}
							placeholder={'Выберите...'} labelBefore={'Франчайзи'}
							onChange={(e) => {
								setValue('franchisee', e.name);
								setError('franchisee', '');
								setIsChanged(true);
							}}
							isDisabled={modeInfo} />
						{(errors.franchisee || errorView.franchisee) &&
							<div className={s.form__error_message}>
								{!errors.franchisee ?
									errorView.franchisee : errors.franchisee.message}
							</div>}
					</div>
	{/* name */}
					<div className={s.form__cinemaField}>
						<Input classError={errors.name}
							labelBefore={'Название кинотеатра'}
							nameField={'name'}
							defaultValue={cinemaId ? cinemaData.name : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={nameWatch}
							register={register}
							validation={{ required: 'Обязательное поле!',
								maxLength: 64 }} />
						{(errors.name || errorView.name) &&
							<div className={s.form__error_message}>
								{!errors.name ?
									errorView.name : errors.name.message}
							</div>}
					</div>
	{/* working_days */}
					<div className={s.form__cinemaField}>
						<Input classError={errors.working_days}
							labelBefore={'Рабочие дни'}
							nameField={'working_days'}
							defaultValue={cinemaId ? cinemaData.working_days : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={workingDaysWatch}
							register={register}
							validation={{ required: 'Обязательное поле!',
								maxLength: 64 }} />
					{(errors.working_days || errorView.working_days) &&
						<div className={s.form__error_message}>
							{!errors.working_days ?
								errorView.working_days : errors.working_days.message}
						</div>}
					</div>
	{/* description */}
					{/* <div className={s.form__cinemaField}>
						<Input classError={errors.description}
							placeholder='Описание кинотеатра'
							nameField={'description'}
							defaultValue={cinemaId ? cinemaData.description : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={descriptionWatch}
							register={register}
							validation={{ maxLength: 64 }} />
						{(errors.description || errorView.description) &&
							<div className={s.form__error_message}>
								{!errors.description ?
									errorView.description : errors.description.message}
							</div>}
					</div> */}
	{/* isActive */}
					<div className={s.form__cinemaField}>
						<Checkbox className={s.form__item_checkbox}
							isChecked={cinemaId ? cinemaData.is_active : false}
							children={'Действующий'}
							nameField={'is_active'}
							setState={setValue}
							isDisabled={modeInfo} />
					</div>
				</div>
				{buttonName &&
					<MainButton className={cn(s.form__button)}
						htmlType='submit'
						isDisabled={cinemaId === undefined && !isDirty && !isChanged}>
						{buttonName}
					</MainButton>}
			</form>}
			{!loadForm &&
				<img className={s.loading} src={loadingImg} alt={'Loading'} />}
		</>
	);
}

export default CinemaForm;