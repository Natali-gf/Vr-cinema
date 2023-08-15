import React from 'react';
import Handbook from '../Handbook/Handbook';
import s from './style.module.scss';
import cn from 'classnames';
import { franchiseeType, age } from '../../data/constans';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCopyrightRequest, getCopyrightRequest, postCopyrightRequest, putCopyrightRequest } from '../../store/actions/copyrightActions';
import { deleteCategoryRequest, getCategoryRequest, postCategoryRequest, putCategoryRequest } from '../../store/actions/categoryActions';
import { deleteLanguageRequest, getLanguageRequest, postLanguageRequest, putLanguageRequest } from '../../store/actions/languageActions';
import { deleteTypeCinemaRequest, getTypeCinemaRequest, postTypeCinemaRequest, putTypeCinemaRequest } from '../../store/actions/typeCinemaActions';
import { deleteCityRequest, getCityRequest, postCityRequest, putCityRequest } from '../../store/actions/cityActions';
import { fetchErrorMessage as fetchErrorTypeCinema} from '../../store/slices/typeCinemaSlice';
import { fetchErrorMessage as fetchErrorLanguage } from '../../store/slices/languageSlice';
import { fetchErrorMessage as fetchErrorCategory } from '../../store/slices/categorySlice';
import { fetchErrorMessage as fetchErrorCopyright } from '../../store/slices/copyrightSlice';
import { fetchErrorMessage as fetchErrorCity } from '../../store/slices/citySlice';

function Handbooks({className, title, list}) {
	const dispatch = useDispatch();
	const { searchValue } = useSelector(state => state.search)
	const category = useSelector(state => state.category);
	const copyright = useSelector(state => state.copyright);
	const language = useSelector(state => state.language);
	const typeCinema = useSelector(state => state.typeCinema);
	const city = useSelector(state => state.city);

	React.useEffect(() => {

		dispatch(getCategoryRequest());
		dispatch(getCopyrightRequest());
		dispatch(getLanguageRequest());
		dispatch(getTypeCinemaRequest());
		dispatch(getCityRequest());

	},[])

	const handbooksParams = [
		{
			title: 'Озвучка',
			buttonName: 'озвучку',
			name: 'language',
			list: language.language,
			isDisabled: false,
			errorView: language.errorView,
			postRequest: postLanguageRequest,
			putRequest: putLanguageRequest,
			deleteRequest: deleteLanguageRequest,
			fetchError: fetchErrorLanguage,
			loading: language.loading,
		},
		{
			title: 'Тип кинотеатра',
			buttonName: 'тип',
			name: 'typeCinema',
			list: typeCinema.typeCinema,
			isDisabled: false,
			errorView: typeCinema.errorView,
			postRequest: postTypeCinemaRequest,
			putRequest: putTypeCinemaRequest,
			deleteRequest: deleteTypeCinemaRequest,
			fetchError: fetchErrorTypeCinema,
			loading: typeCinema.loading,
		},
		{
			title: 'Тип предпринимателя',
			buttonName: 'тип',
			name: 'typeFranchisee',
			list: franchiseeType,
			isDisabled: true,
		},
		{
			title: 'Цензор',
			buttonName: 'цензор',
			name: 'age',
			list: age,
			isDisabled: true,
		},
		{
			title: 'Жанры',
			buttonName: 'жанр',
			name: 'category',
			list: category.category,
			isDisabled: false,
			errorView: category.errorView,
			postRequest: postCategoryRequest,
			putRequest: putCategoryRequest,
			deleteRequest: deleteCategoryRequest,
			fetchError: fetchErrorCategory,
			loading: category.loading,
		},,
		{
			title: 'Студии',
			buttonName: 'студию',
			name: 'copyright',
			list: copyright.copyright,
			isDisabled: false,
			errorView: copyright.errorView,
			postRequest: postCopyrightRequest,
			putRequest: putCopyrightRequest,
			deleteRequest: deleteCopyrightRequest,
			fetchError: fetchErrorCopyright,
			loading: copyright.loading,
		},,
		{
			title: 'Город',
			buttonName: 'город',
			name: 'city',
			list: city.city,
			isDisabled: false,
			errorView: city.errorView,
			postRequest: postCityRequest,
			putRequest: putCityRequest,
			deleteRequest: deleteCityRequest,
			fetchError: fetchErrorCity,
			loading: city.loading,
		},
	]

	return (
		<>
			<div className={cn(s.handbooks, className)}>
				<div className={s.handbooks__container}>
					{handbooksParams.filter( item => (item.title.toLowerCase()).includes(searchValue.toLowerCase()))
					.map((item, index) => (
						<Handbook key={`key${index}`}
							className={s.handbooks__item}
							title={item.title}
							buttonName={item.buttonName}
							name={item.name}
							list={item.list}
							isDisabled={item.isDisabled}
							errorView={item.errorView}
							postRequest={item.postRequest}
							putRequest={item.putRequest}
							deleteRequest={item.deleteRequest}
							loading={item.loading}
							fetchError={item.fetchError} />))}
					{/* <Handbook className={s.handbooks__item}
						title={'Озвучка'}
						buttonName={'озвучку'}
						name={'languag'}
						list={language.language}
						isDisabledButton={false}
						errorView={language.errorView}
						postRequest={postLanguageRequest}
						putRequest={putLanguageRequest}
						deleteRequest={deleteLanguageRequest}
						loading={language.loading}
						fetchError={fetchErrorLanguage} /> */}
					{/* <Handbook className={s.handbooks__item}
						title={'Тип кинотеатра'}
						buttonName={'тип'}
						name={'typeCinema'}
						list={typeCinema.typeCinema}
						isDisabledButton={false}
						errorView={typeCinema.errorView}
						postRequest={postTypeCinemaRequest}
						putRequest={putTypeCinemaRequest}
						deleteRequest={deleteTypeCinemaRequest}
						loading={typeCinema.loading}
						fetchError={fetchErrorTypeCinema} />
					<Handbook className={s.handbooks__item}
						title={'Тип предпринимателя'}
						buttonName={'тип'}
						name={'typeFranchisee'}
						list={franchiseeType}
						isDisabledButton={true}/>
					<Handbook className={s.handbooks__item}
						title={'Цензор'}
						buttonName={'цензор'}
						name={'age'}
						list={age}
						isDisabledButton={true}/>
					<Handbook className={s.handbooks__item}
						title={'Жанры'}
						buttonName={'жанр'}
						name={'category'}
						list={category.category}
						isDisabledButton={false}
						errorView={category.errorView}
						postRequest={postCategoryRequest}
						putRequest={putCategoryRequest}
						deleteRequest={deleteCategoryRequest}
						loading={category.loading}
						fetchError={fetchErrorCategory} />
					<Handbook className={s.handbooks__item}
						title={'Студии'}
						buttonName={'студию'}
						name={'language'}
						list={copyright.copyright}
						isDisabledButton={false}
						errorView={copyright.errorView}
						postRequest={postCopyrightRequest}
						putRequest={putCopyrightRequest}
						deleteRequest={deleteCopyrightRequest}
						loading={copyright.loading}
						fetchError={fetchErrorCopyright} />
					<Handbook className={s.handbooks__item}
						title={'Город'}
						buttonName={'город'}
						name={'city'}
						list={city.city}
						isDisabledButton={false}
						errorView={city.errorView}
						postRequest={postCityRequest}
						putRequest={putCityRequest}
						deleteRequest={deleteCityRequest}
						loading={city.loading}
						fetchError={fetchErrorCity} /> */}
				</div>
			</div>
		</>
	);
}

export default Handbooks;