import AddButton from '../ui/AddButton/AddButton';
import Checkbox from '../ui/Checkbox/Checkbox';
import MainButton from '../ui/MainButton/MainButton';
import s from './style.module.scss';
import style from '../forms/style.module.scss';
import cn from 'classnames';
import loadingImg from '../../assets/icons/loading.svg';
import DetailMenu from '../DetailMenu/DetailMenu';
import Input from '../ui/Input/Input';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Radio from '../ui/Radio/Radio';
import { deleteCategoryRequest } from '../../store/actions/categoryActions';

function Handbook({title, list, buttonName, errorView, postRequest, putRequest, deleteRequest, name, loading, fetchError, isDisabled}) {
	const dispatch = useDispatch();
	const [option, chooseOption] = React.useState('add');
	const [input, showInput] = React.useState(false);
	const [checked, clearChecked] = React.useState(false);
	const [elemId, setElemId] = React.useState('');
	const [elemName, setElemName] = React.useState('');

	const { register, handleSubmit, setValue, setError, formState: {errors, isDirty, isValidating }, watch } = useForm({ mode: 'all' });
	const nameWatch = watch('name');

	React.useEffect(() =>{
		if (errorView){
			dispatch(fetchError(''));
		}
	}, [isValidating]);

	const onSubmit = async(data) => {
		console.log(data)
		switch (option) {
			case 'add':
				if(!input){
					showInput(!input)
				} else {
					await postRequest(dispatch, data).then((res) => {
						console.log(res)
						if(res.status >= 200 && res.status < 300){
							console.log(res)
							setValue('name', '');
							showInput(false);
						}
					})
				}
				break;
			case 'edit':
				putRequest(dispatch, data, elemId)
				.then(() => {
					setValue('name', '');
					showInput(false);
					chooseOption('add');
					clearChecked(true);
				})
				break;
			case 'delete':
				deleteRequest(dispatch, elemId);
				showInput(false);
				setValue('name', '');
				setElemName('')
				chooseOption('add');
				clearChecked(true);
				break;
		}
	}

	React.useEffect(() =>{
		if(option === 'edit' ||
			option === 'delete'){
			setValue('name', elemName);

		}
	},[option])

	const handleChange = (e) => {
		setValue('name', e.target.value);
		setElemName(e.target.value);
		setElemId(e.target.id);
		if(checked){
			clearChecked(false);
		}
	}

	return (
		<>
			<div className={s.handbook}>
				<div className={s.handbook__container}>
					<div className={s.handbook__header}>
						<h4 className={s.handbook__title}>{title}</h4>
						<DetailMenu className={s.handbook__menu}
							typeDetail={'handbook'}
							chooseOption={chooseOption}
							isDisabledMenu={isDisabled} />
					</div>
					<div className={s.handbook__listBox}>
						{loading &&
							<img className={s.loading} src={loadingImg} alt={'Загрузка'} />}
							<ul className={s.handbook__list}>
								<Radio className={s.handbook__radio_hidden}
									name={name} isChecked={checked}
									setState={clearChecked} onChange={handleChange}/>
							{list.map((item, index) => (
								<li key={`key${index}`}
									className={s.handbook__item}>
									<Radio
										children={item.name || item.label}
										onChange={handleChange}
										onClick={checked ? handleChange : null}
										name={name}
										id={item.id || item.value} />
								</li>))}
						</ul>
					</div>
					<form className={s.handbook__form}
						onSubmit={handleSubmit(onSubmit)}>
							<div className={s.handbook__field}>
							{(input || option === 'edit') &&
								<Input className={s.handbook__input}
									classError={errors.name || errorView.name}
									placeholder={'Введите наименование...'}
									nameField={'name'}
									defaultValue={elemName}
									// isDisabled={modeInfo}
									onKeyDown={(e) => {if (e.key === 'Enter') {
										handleSubmit(onSubmit)
										console.dir(e)
									}}}
									setValue={setValue}
									watch={nameWatch}
									register={register}
									validation={{ required: true,
										maxLength: 100 }} />}
								{(errors.name || (errorView && errorView.name)) &&
									<div className={cn(style.form__error_message, s.handbook__error)}>
										{!errors.name ?
											errorView.name : errors.name.message}
									</div>}
							</div>
						<MainButton className={cn(s.handbook__addButton, {['icon_add']: option === 'add'})}
							children={option === 'add' ? `Добавить ${buttonName}` :
								option === 'edit' ? 'Сохранить изменения' :
								option === 'delete' ? `Удалить ${buttonName}` : ''}
							isDisabled={isDisabled}
							// onClick={addItem}
							type={'submit'}/>
					</form>
				</div>
			</div>
		</>
	);
}

export default Handbook;