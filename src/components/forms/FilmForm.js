import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { age } from '../../data/constans';
import MultiSelect from '../ui/select/MultiSelect';
import SingleSelect from '../ui/select/SingleSelect';
import { getIndexCheckedItems, chooseImage, removeImage, setFormFieldsValue, previewImage } from '../../helpers/helpers';
import { getCopyrightRequest } from '../../store/actions/copyrightActions';
import { getCategoryRequest } from '../../store/actions/categoryActions';
import MainButton from '../ui/MainButton/MainButton';
import { postFilmRequest, putFilmImageRequest, putFilmRequest } from '../../store/actions/filmActions';
import { useForm } from 'react-hook-form';
import { getCurrentFilmRequest } from '../../store/actions/filmActions';
import Checkbox from '../ui/Checkbox/Checkbox';
import { clearFilmData, fetchError } from '../../store/slices/filmSlice';
import Input from '../ui/Input/Input';
import { showFilmInfo, showFilmEdit } from '../../store/slices/windowStateSlice';
import loadingImg from '../../assets/icons/loading.svg';
import { getLanguageRequest } from '../../store/actions/languageActions';
import { BtnEdit } from './BtnEdit';
import { deleteImageRequest, postImageRequest, putImageRequest } from '../../store/actions/imageActions';

export const filmFormFields = ['name', 'duration', 'year', 'is_published','category',  'copyright_holder', 'language', 'age'];

function FilmForm({className, filmId, modeInfo, buttonName, classButton}) {

	const dispatch = useDispatch();
	const { filmData, errorView } = useSelector(state => state.films);
	const { category } = useSelector(state => state.category);
	const { copyright } = useSelector(state => state.copyright);
	const { language } = useSelector(state => state.language);
	const [ imgsrc, setImgsrc] = React.useState('');
	const [ imgValue, setImgValue] = React.useState('');
	const [ loadForm, setLoadForm] = React.useState('');
	const [ isChanged, setIsChanged ] = React.useState(false);

	const { register, handleSubmit, setValue, setError, getValues, formState: {errors, isDirty, isValidating }, watch } = useForm({ mode: 'all' });

	const [ nameWatch, durationWatch, yearWatch ] = watch(filmFormFields);

	React.useEffect(() => {
		if(filmId){
			dispatch(getCurrentFilmRequest(filmId));
		} else {
			setLoadForm(true);
		};
		dispatch(getCategoryRequest());
		dispatch(getCopyrightRequest());
		dispatch(getLanguageRequest());
		// register fields
		register('copyright_holder', { required: 'Обязательное поле!' });
		register('category', { required: 'Обязательное поле!' });
		register('language', { required: 'Обязательное поле!' });
		register('age', { required: 'Обязательное поле!' });
		register('duration', { required: 'Обязательное поле!',
			pattern: {value: /0[0-2].[0-5][0-9].[0-5][0-9]/, message: 'Не более 02:59:59'},
			minLength: 8,
			maxLength: 8});
		register('is_published');
		register('imagine');

			return () => {
				dispatch(clearFilmData(''));
				setImgsrc('');
			}
	}, []);

	React.useEffect(() =>{
		if(filmId === filmData.id){
			setFormFieldsValue(filmFormFields, setValue, filmData);
			setImgsrc(filmData.imagine && filmData.imagine.image)
			setLoadForm(true);
		}
	}, [filmData]);

	React.useEffect(() =>{
		if (errorView){
			dispatch(fetchError(''));
		}
	}, [isValidating]);

	const onSubmit = async(data, e) => {
		e.preventDefault();
		let img = getValues('imagine')
		let form = data;
		let formImage = {};

		if(filmId){
			if(img && filmData.imagine !== null){
				console.log(1)
				formImage.image = img;
				await putImageRequest(dispatch, formImage, filmData.imagine.id)
					.then(response => {
						form.imagine = response.id;
						putFilmRequest(dispatch, form, filmId);
					});
				setImgValue('');
			} else if(img && filmData.imagine === null){
				console.log(2)
				formImage.image = img;
				await postImageRequest(dispatch, formImage)
					.then(response => {
						form.imagine = response.id;
						putFilmRequest(dispatch, form, filmId);
					});
				setImgValue('');
			} else if(filmData.imagine === undefined && !img){
				console.log(3)
				form.imagine = null;
				await putFilmRequest(dispatch, form, filmId)
					.then(() => {
						deleteImageRequest(filmData.imagine.id)
					});
			}else {
				console.log(4)
				putFilmRequest(dispatch, data, filmId);
			}
		} else {
			if(img){
				formImage.image = img
				await postImageRequest(dispatch, formImage)
					.then(response => {
						form.imagine = response.id;
						postFilmRequest(dispatch, form);
					});
				setImgValue('');
			} else {
				postFilmRequest(dispatch, form);
			}
		}
	}

	return (
		<>
			{modeInfo &&
			<BtnEdit modeInfo={modeInfo} clearData={clearFilmData}
				showEdit={showFilmEdit} showInfo={showFilmInfo} />}
		{loadForm &&
			<form className={s.form}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={cn(s.form__fields, s.form__filmFields)}>
					<div className={cn(s.form__poster, s.poster)}>
						<div className={s.poster__field}>
							<div className={cn(s.poster__change, 'icon_add_poster')}>
								{imgsrc &&
									<input className={cn(s.poster__input)}
										type="file" accept='image*'
										onChange={(e) => chooseImage(e, setImgsrc, setValue, 'imagine')} />}
							</div>
							<div className={cn(s.poster__description)}>Изменить</div>
						</div>
						<div className={s.paster__field}>
							<div className={cn(s.poster__upload,
							'icon_no_poster'
							)}>
								<input className={cn(s.poster__input)}
									type="file" accept='image*'
									name={'imagine'}
									onChange={(e) => chooseImage(e, setImgsrc, setValue, 'imagine')} />
								{imgsrc &&
									<img className={s.poster__preview} src={imgsrc} alt='Poster preview'/>}
							</div>
						</div>
						<div className={s.paster__field}>
							<div className={cn(s.poster__delete, 'icon_trash')}
								onClick={() => removeImage(setImgsrc, setValue, 'imagine')} />
							<div className={cn(s.poster__description)}>Удалить</div>
						</div>
					</div>
	{/* name */}
					<div className={s.form__filmField}>
						<Input classError={errors.name || errorView.name}
							labelBefore={'Название'}
							nameField={'name'}
							defaultValue={filmId ? filmData.name : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={nameWatch}
							register={register}
							validation={{ required: 'Обязательное поле!',
								maxLength: 100 }} />
						{(errors.name || errorView.name) &&
							<div className={s.form__error_message}>
								{!errors.name ?
									errorView.name : errors.name.message}
							</div>}
					</div>
	{/* copyright_holder */}
					<div className={s.form__filmField}>
						<MultiSelect className={cn(s.form__select)}
							classError={errors.copyright_holder && errors.copyright_holder.type}
							optionList={copyright}
							selectValue={'id'} selectLabel={'name'}
							placeholder={'Выберите...'} labelBefore={'Студия'}
							defaultValue={() => filmId ? getIndexCheckedItems(copyright, filmData.copyright_holder).map(i => copyright[i]) : null}
							onChange={(e) => {
								console.log(e.length)
								let studios=[];
								if (!e.length) {
									setError('copyright_holder', { type: "required", message: 'Обязательное поле!' })
								} else {
									e.map(elem => studios.push(elem.name));
									setError('copyright_holder', '');
								}
								setValue('copyright_holder', studios);
								setIsChanged(true);
							}}
							selectType={'selectCheckbox'}
							isDisabled={modeInfo} />
						{(errors.copyright_holder || errorView.copyright_holder) &&
							<div className={s.form__error_message}>
								{!errors.copyright_holder ?
									errorView.copyright_holder : errors.copyright_holder.message}
							</div>}
					</div>
	{/* category */}
					<div className={s.form__filmField}>
						<MultiSelect className={cn(s.form__select)}
							classError={errors.category && errors.category.type}
							selectValue={'id'} selectLabel={'name'}
							placeholder={'Выберите...'} labelBefore={'Жанр'}
							optionList={category}
							defaultValue={() => filmId ? getIndexCheckedItems(category, filmData.category).map(i => category[i]) : null}
							onChange={(e) => {
								let genre=[];
								if (!e.length) {
									setError('category', { type: "required", message: 'Обязательное поле!' })
								} else {
									e.map(elem => {genre.push(elem.name)});
									setError('category', '');
								}
								setValue('category', genre);
								setIsChanged(true);
							}}
							selectType={'selectCheckbox'}
							isDisabled={modeInfo} />
						{(errors.category || errorView.category) &&
							<div className={s.form__error_message}>
								{!errors.category ?
									errorView.category : errors.category.message}
							</div>}
					</div>
	{/* language */}
					<div className={s.form__filmField}>
						<MultiSelect className={cn(s.form__select)}
							classError={errors.language && errors.language.type}
							selectValue={'id'} selectLabel={'name'}
							placeholder={'Выберите...'} labelBefore={'Озвучка'}
							optionList={language}
							defaultValue={() => filmId ? getIndexCheckedItems(language, filmData.language).map(i => language[i]) : null}
							onChange={(e) => {
								let language=[];
								if (!e.length) {
									setError('language', { type: "required", message: 'Обязательное поле!' });
								} else {
									e.map(elem => language.push(elem.name));
									setError('language', '');
								}
								setValue('language', language);
								setIsChanged(true);
							}}
							selectType={'selectCheckbox'}
							isDisabled={modeInfo} />
						{(errors.language || errorView.language) &&
							<div className={s.form__error_message}>
								{!errors.language ?
									errorView.language : errors.language.message}
							</div>}
					</div>
	{/* age */}
					<div className={s.form__filmField}>
						<SingleSelect className={cn(s.form__select)}
							classError={errors.age && errors.age.type}
							optionList={age}
							selectValue={'value'} selectLabel={'label'} placeholder={'Выберите...'} labelBefore={'Цензор'}
							defaultValue={() => filmId ? getIndexCheckedItems(age, [filmData.age]).map(i => age[i]) : null}
							onChange={(e) => {
								setValue('age', e.label);
								setError('age', '');
								setIsChanged(true);
							}}
							isDisabled={modeInfo} />
						{(errors.age || errorView.age) &&
							<div className={s.form__error_message}>
								{!errors.age ?
									errorView.age : errors.age.message}
							</div>}
					</div>
	{/* duration */}
					<div className={s.form__filmField}>
						<Input classError={(errors.duration && errors.duration.type) || errorView.duration}
							labelBefore={"Время"}
							placeholder={"---:---:---"}
							format="##:##:##"
							patternChar="#"
							allowFormatting mask="--"
							value={durationWatch}
							onValueChange={(values) => {
								setValue('duration', values.formattedValue)
									// setError('duration', { required: 'Обязательное поле!',
									// pattern: {value: /0[0-2].[0-5][0-9].[0-5][0-9]/, message: 'ghjl'},
									// minLength: 8,
									// maxLength: 8})
							}}
							defaultValue={filmId ? filmData.duration : ''}
							isDisabled={modeInfo}
							nameField={'duration'}
							setValue={setValue}
							watch={durationWatch}
							 />
						{(errors.duration || errorView.duration) &&
							<div className={s.form__error_message}>
								{!errors.duration ?
									errorView.duration : errors.duration.message}
							</div>}
					</div>
	{/* year */}
					<div className={s.form__filmField}>
						<Input classError={errors.year || errorView.year}
							labelBefore={'Год'}
							nameField={'year'}
							defaultValue={filmId ? filmData.year : ''}
							isDisabled={modeInfo}
							setValue={setValue}
							watch={yearWatch}
							register={register}
							validation={{ required: 'Обязательное поле!',
									pattern: /^\d+$/, maxLength: 4 }} />
						{(errors.year || errorView.year) &&
							<div className={s.form__error_message}>
								{!errors.year ?
									errorView.year : errors.year.message}
							</div>}
					</div>
	{/* isPublish */}
					<div className={s.form__filmField}>
						<Checkbox className={s.form__item_checkbox}
							isChecked={filmId ? filmData.is_published : false}
							setState={setValue}
							nameField={'is_published'}
							children={'Опубликовать'}
							isDisabled={modeInfo} />
					</div>
				</div>
				{buttonName &&
					<MainButton className={cn(s.form__button, classButton)}
						htmlType='submit'
						isDisabled={filmId === undefined && !isDirty && !isChanged}>
						{buttonName}
					</MainButton>}
			</form>
			}
			{!loadForm &&
				<img className={s.loading} src={loadingImg} alt={'Загрузка'} />}
		</>
	);
}

export default FilmForm;