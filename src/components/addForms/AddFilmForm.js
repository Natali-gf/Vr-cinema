import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { lang, age } from '../../data/constans';
import MultiSelect from '../ui/MultiSelect/MultiSelect';
import SingleSelect from '../ui/SingleSelect/SingleSelect';
import { previewImage } from '../../helpers/helpers';
import { fetchCopyright } from '../../store/actions/copyrightActions';
import { fetchCategory } from '../../store/actions/categoryActions';
import ApplyButton from '../ui/ApplyButton/ApplyButton';
// import {imageDataURI} from 'image-data-uri'
import { addFilmRequest } from '../../store/actions/addFilmAction';
import { useForm } from 'react-hook-form';
import { btnClearField } from '../../helpers/helpers';

function AddFilmForm({className}) {
	const { category } = useSelector(state => state.category);
	const { copyright } = useSelector(state => state.copyright);
	const [ imgsrc, setImgsrc] = React.useState('')


	React.useEffect(() => {
		dispatch(fetchCategory())
		dispatch(fetchCopyright())
	}, [])


	const [imgValue, setImgValue] = React.useState('')

	const dispatch = useDispatch()
	const { errorMessage } = useSelector(state => state.addFranchisee);

	const { register, handleSubmit, setValue, setError, formState: {errors}, resetField, getValues} = useForm({
		mode: 'onTouched',
		defaultValues: {
		}
	})

	const onSubmit = (data) => {
		addFilmRequest(dispatch, data)
	}

	React.useEffect(() => {
		register('category')
		register('copyright')
		register('language')
		register('age', { required: true })
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

	return (
		<>
			<form className={s.form}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={cn(s.form__poster, s.poster)}>
					<div className={s.poster__field}>
						<div className={cn(s.poster__change, 'icon_add_poster')}>
							{imgsrc &&
								<input className={cn(s.poster__input)}
									type="file" accept='image*'
									onChange={(e) => {
										previewImage(e, setImgsrc);
										setImgValue(e.target.files[0])
									// setImgValue(URL.createObjectURL(e.target.files[0]));
									}} />}
						</div>
						<div className={cn(s.poster__description)}>Изменить</div>
					</div>
					<div className={s.paster__field}>
						<div className={cn(s.poster__upload,
						'icon_no_poster'
						)}>
							<input className={cn(s.poster__input)}
								type="file" accept='image*'
								onChange={(e) => previewImage(e, setImgsrc)}/>
							{imgsrc &&
								<img className={s.poster__preview} src={imgsrc} alt='Poster preview'/>}
						</div>
					</div>
					<div className={s.paster__field}>
						<div className={cn(s.poster__delete, 'icon_trash')}
							onClick={() => setImgsrc('')}/>
						<div className={cn(s.poster__description)}>Удалить</div>
					</div>
				</div>
				<div className={s.form__filmFields}>
					<div className={s.form__filmField}>
						<div className={s.form__item}>
							<input className={s.form__input}
								placeholder='Название'
								autoComplete='off'
								{...register('name', { required: true, maxLength: 100 })}/>
							<BtnClearField nameField={'name'}/>
						</div>
						{(errors.name || errorMessage.name) &&
							<div className={s.form__error_message}>
								{!errors.name ?
									errorMessage.name : errors.name.message}
							</div>}
					</div>
					<div className={s.form__filmField}>
						<MultiSelect
							className={cn(s.form__select)}
							optionList={copyright}
							selectValue={'id'} selectLabel={'name'} placeholder={'Студия'}
							// onChange, value={}
							selectType={'selectCheckbox'}
							onChange={(e) => {
								if (!e.value) {
									setError('copyright_holder', 'Обязательное поле!')
								} else {
									setValue('copyright_holder', e.value)
								}}}/>
						{errors.ownership &&
							<div className={s.form__error_message}>
								Обязательное поле!
							</div>}
					</div>
					<div className={s.form__filmField}>
						<MultiSelect
							className={cn(s.form__select)}
							optionList={category}
							selectValue={'id'} selectLabel={'name'} placeholder={'Жанр'}
							// onChange, value={}
							selectType={'selectCheckbox'}
							onChange={(e) => {
								if (!e.value) {
									setError('category', 'Обязательное поле!')
								} else {
									setValue('category', e.value)
								}}}/>
						{errors.ownership &&
							<div className={s.form__error_message}>
								Обязательное поле!
							</div>}
					</div>
					<div className={s.form__filmField}>
						<SingleSelect
							className={cn(s.form__select)}
							optionList={lang}
							selectValue={'value'} selectLabel={'label'} placeholder={'Озвучка'}
							// onChange={(e) => setLangValue(e)} value={langValue}
							// selectType={'select'}
							onChange={(e) => {
								if (!e.value) {
									setError('language', 'Обязательное поле!')
								} else {
									setValue('language', e.value)
								}}}/>
						{errors.ownership &&
							<div className={s.form__error_message}>
								Обязательное поле!
							</div>}
					</div>
					<div className={s.form__filmField}>
						<SingleSelect
							className={cn(s.form__select)}
							optionList={age}
							selectValue={'value'} selectLabel={'label'} placeholder={'Цензор'}
							// onChange={(e) => setAgeValue(e)} value={ageValue}
							// selectType={'select'}
							onChange={(e) => {
								if (!e.value) {
									setError('age', 'Обязательное поле!')
								} else {
									setValue('age', e.value)
								}}}/>
						{errors.ownership &&
							<div className={s.form__error_message}>
								Обязательное поле!
							</div>}
					</div>
					<div className={s.form__filmField}>
						<div className={s.form__item}>
							<input className={s.form__input}
								placeholder='Время'
								autoComplete='off'
								{...register('duration', { required: true })}/>
							<BtnClearField nameField={'duration'}/>
						</div>
						{(errors.duration || errorMessage.duration) &&
							<div className={s.form__error_message}>
								{!errors.duration ?
									errorMessage.duration : errors.duration.message}
							</div>}
					</div>
					<div className={s.form__filmField}>
						<div className={s.form__item}>
							<input className={s.form__input}
								placeholder='Год'
								autoComplete='off'
								{...register('year', { required: true, pattern: /^\d+$/, maxLength: 4 })}/>
							<BtnClearField nameField={'year'}/>
						</div>
						{(errors.year || errorMessage.year) &&
							<div className={s.form__error_message}>
								{!errors.year ?
									errorMessage.year : errors.year.message}
							</div>}
					</div>
				</div>
			</form>
			<ApplyButton className={s.form__button}
				// type="primary"
				htmlType='submit'>
				Добавить фильм
			</ApplyButton>
		</>
	);
}

export default AddFilmForm;