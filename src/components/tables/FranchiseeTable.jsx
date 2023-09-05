import style from './style.module.scss';
import loadingImg from '../../assets/icons/loading.svg';
import DetailMenu from '../DetailMenu/DetailMenu';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { getFranchiseeRequest } from '../../store/actions/franchiseeAction';
import { setSearchValue } from '../../store/slices/searchSlice';

const tableHeaders = ['', 'Тип', 'Наименование', 'Логин', '№ договора', 'ИНН', 'Адрес', '',]

function FranchiseeTable() {
	const dispatch = useDispatch();
	const { franchisee, loadingPage } = useSelector(state => state.franchisee);
	const { searchValue } = useSelector(state => state.search);
	const {	filtered, sorted, filterVisible } = useSelector(state => state.filterFranchisee);
	let customFranchisee = franchisee;

	useEffect(() => {
		dispatch(getFranchiseeRequest())
		return () => {
			dispatch(setSearchValue(''))
		}
    }, []);

	// check filters
	(function(){
		if(filtered != 'initialState'){
				if (sorted != 'initialState')
					{customFranchisee = sorted.filter((sort) => filtered.some((filter) => filter ===sort)) }
				else { customFranchisee = filtered }}
		else if(sorted != 'initialState')
				{ customFranchisee = sorted }
	}());

	return (
		<>
			<table className={`${style.table} ${style.franchisee__table}`}>
				<thead className={style.table__head}>
					<tr className={cn(style.table__row_head, style.table__franchisee)}>
						{tableHeaders.map((headers, index) => (
							<th className={style.table__column_head} key={index}>
								{headers}
							</th>))}
					</tr>
				</thead>
				{!loadingPage && <tbody className={cn(style.table__body)}
					style={filterVisible ? {height: 'calc(100vh - 477px)'}:{height: 'calc(100vh - 279px)'}}>
					{customFranchisee
						.filter( item => {
							return item.name?.toLowerCase().includes(searchValue.toLowerCase()) || (item.number_contract?.toString()).includes(searchValue)})
							.map( (item, index) => (
						<tr className={cn(style.table__row, style.table__franchisee)} key={index + Math.random()}>
							<td className={style.table__column}></td>
							<td className={style.table__column}>
								{item.ownership}
							</td>
							<td className={style.table__column}>
								{item.name}
							</td>
							<td className={style.table__column}>
								{item.username}
							</td>
							<td className={style.table__column}>
								{item.number_contract}
							</td>
							<td className={style.table__column}>
								{item.inn}
							</td>
							<td className={style.table__column}>
								{item.address}
							</td>
							<td className={style.table__column}>
								<DetailMenu className={style.table__menu}
									elemId={item.id}
									typeDetail={'franchisee'}/>
							</td>
						</tr>
					))}
				</tbody>}
			</table>
			{loadingPage &&
				<img className={style.loading} src={loadingImg} alt={'Загрузка'} />}
		</>
	);
}

export default FranchiseeTable;