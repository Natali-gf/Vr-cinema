import style from './style.module.scss';
import loadingImg from '../../assets/icons/loading.svg';
import FilmMenu from '../FilmMenu/FilmMenu';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { allFranchisee } from '../../store/slices/franchiseeSlice';
import { fetchFranchisee } from '../../store/actions/franchiseeAction';

const tableHeaders = ['Тип', 'Наименование', 'Логин', '№ договора', 'ИНН', 'КПП', 'Адрес', 'ОГРН', 'ОГРНИП', 'Банк', 'Номер счета', 'БИК', '',]

function FranchiseeTable({className}) {
	const dispatch = useDispatch();
	const {franchisee, loading} = useSelector(allFranchisee);
	const { searchValue } = useSelector(state => state.search);

	useEffect(() => {
		dispatch(fetchFranchisee())
    }, []);

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
				{!loading && <tbody className={cn(style.table__body)}>
					{franchisee.filter( item =>
						(item.name.toLowerCase()).includes(searchValue.toLowerCase()))
							.map( (item, index) => (
						<tr className={cn(style.table__row, style.table__franchisee)} key={index + Math.random()}>
							<td className={style.table__column}>
								{item.type}
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
								{item.kpp_bank}
							</td>
							<td className={style.table__column}>
								{item.address}
							</td>
							<td className={style.table__column}>
								{item.ogrn}
							</td>
							<td className={style.table__column}>
								{item.ogrnip}
							</td>
							<td className={style.table__column}>
								{item.bank_name}
							</td>
							<td className={style.table__column}>
								{item.bank_account_number}
							</td>
							<td className={style.table__column}>
								{item.bik_bank}
							</td>
							<td className={style.table__column}>
								<FilmMenu className={style.table__menu}/>
							</td>
						</tr>
					))}
				</tbody>}
			</table>
			{loading &&
				<img className={style.loading} src={loadingImg} alt={'Загрузка'} />}
		</>
	);
}

export default FranchiseeTable;