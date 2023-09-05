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

function Handbook(props) {
	const dispatch = useDispatch();
	const [option, chooseOption] = React.useState('add');
	const [input, showInput] = React.useState(false);
	const [checked, clearChecked] = React.useState(false);
	const [elemId, setElemId] = React.useState('');
	const [elemName, setElemName] = React.useState('');

	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors, isValidating },
		watch } = useForm({ mode: 'all' });
	const nameWatch = watch('name');

	React.useEffect(() =>{
		if (props.errorView && props.errorView.name){
			dispatch(props.fetchError(''));
		}
	}, [isValidating]);

	React.useEffect(() =>{
		if(option === 'edit' ||
			option === 'delete'){
			setValue('name', elemName);

		}
	},[option])

	const onSubmit = async(data) => {
		switch (option) {
			case 'add':
				if(!input){
					showInput(!input)
				} else {
					await props.postRequest(dispatch, data).then((res) => {
						if(res.status >= 200 && res.status < 300){
							setValue('name', '');
							showInput(false);
						}
					})
				}
				break;
			case 'edit':
				props.putRequest(dispatch, data, elemId)
				.then(() => {
					setValue('name', '');
					showInput(false);
					chooseOption('add');
					clearChecked(true);
				})
				break;
			case 'delete':
				props.deleteRequest(dispatch, elemId);
				showInput(false);
				setValue('name', '');
				setElemName('')
				chooseOption('add');
				clearChecked(true);
				break;
		}
	}

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
						<h4 className={s.handbook__title}>{props.title}</h4>
						<DetailMenu className={s.handbook__menu}
							typeDetail={'handbook'}
							chooseOption={chooseOption}
							isDisabledMenu={props.isDisabled} />
					</div>
					<div className={s.handbook__listBox}>
						{props.loading &&
							<img className={s.loading} src={loadingImg} alt={'Загрузка'} />}
							<div className={s.handbook__list}>
								<Radio
								className={s.handbook__radio_hidden}
									name={props.name} isChecked={checked}
									setState={clearChecked} onChange={handleChange}/>
							{props.list.map((item, index) => (
								<Radio className={s.handbook__item} key={`key${index}`}
									children={item.name || item.label}
									onChange={handleChange}
									onClick={checked ? handleChange : null}
									name={props.name}
									id={item.id || item.value} />
							))}
							</div>
					</div>
					<form className={s.handbook__form}
						onSubmit={handleSubmit(onSubmit)}
						onKeyDown={(e) => {if (e.key === 'Enter') e.preventDefault()}}>
							<div className={s.handbook__field}>
							{(input || option === 'edit') &&
								<Input className={s.handbook__input}
									classError={errors.name || props.errorView.name}
									placeholder={'Введите наименование...'}
									nameField={'name'}
									defaultValue={elemName}
									setValue={setValue}
									watch={nameWatch}
									register={register}
									validation={{ required: true,
										maxLength: 100 }}
										 />}
								{(errors.name || (props.errorView && props.errorView.name)) &&
									<div className={cn(style.form__error_message, s.handbook__error)}>
										{!errors.name ?
											props.errorView.name : errors.name.message}
									</div>}
							</div>
						<MainButton className={cn(s.handbook__addButton, {['icon_add']: option === 'add'})}
							children={option === 'add' ? `Добавить ${props.buttonName}` :
								option === 'edit' ? 'Сохранить изменения' :
								option === 'delete' ? `Удалить ${props.buttonName}` : ''}
							isDisabled={props.isDisabled}
							type={'submit'}/>
					</form>
				</div>
			</div>
		</>
	);
}

export default Handbook;