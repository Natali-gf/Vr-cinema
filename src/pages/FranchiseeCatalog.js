import style from './style.module.scss';
import cn from "classnames";
import React from 'react';
import Header from '../components/static/Header/Header';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import FilterOptions from '../components/static/FilterOptions/FilterOptions';
import AddWindow from '../components/ui/AddWindow/AddWindow';
import AddFranchiseeForm from '../components/addForms/AddFranchiseeForm';
import FranchiseeTable from '../components/tables/FranchiseeTable';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../components/ui/AddButton/AddButton';
import { showAddFranchisee } from '../store/slices/windowStateSlice';

const buttonAdd = 'Добавить франчайзи';

function FranchiseeCatalog() {
	const { addFranchiseeWindow } = useSelector(state => state.stateAddWindow);
	const { filterVisible } = useSelector(state => state.filter);
	const dispatch = useDispatch();

	return (
		<div className={style.content}>
			<div className={style.content__container}>
				<Header className={style.content__header}
					title={'База франчайзи'} />
				<div className={style.content__filterPanel}>
					<FilterPanel className={style.content__filters}
					buttonAdd={buttonAdd} />
					<AddButton className={style.content__addButton}
						children={buttonAdd}
						onClick={() => {dispatch(showAddFranchisee(!addFranchiseeWindow))}} />
					{filterVisible &&
						<FilterOptions className={style.content__options}>
							{/* <FilmFilters /> */}
						</FilterOptions>}
				</div>
				<div className={cn(style.content__tableBlock, style.content__tableBlock_franchisee)}
						style={filterVisible ? {height: 'calc(100vh - 408px)'}:{height: 'calc(100vh - 210px)'}}>
					<FranchiseeTable />
				</div>
				{addFranchiseeWindow &&
					<AddWindow className={style.content__addWindow}
						showAddwindow={showAddFranchisee}
						addWindow={addFranchiseeWindow}
						children={<AddFranchiseeForm/>}/>}
			</div>
		</div>
	);
}

export default FranchiseeCatalog;

