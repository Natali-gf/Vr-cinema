import style from './style.module.scss';
import cn from "classnames";
import React from 'react';
import Header from '../components/static/Header/Header';
import FilterPanel from '../components/static/FilterPanel/FilterPanel';
import FilterOptions from '../components/static/FilterOptions/FilterOptions';
import FranchiseeTable from '../components/tables/FranchiseeTable';
import { useDispatch, useSelector } from 'react-redux';
import { showFranchiseeAdd, showFranchiseeEdit, showFranchiseeInfo } from '../store/slices/windowStateSlice';
import { clearAllFilter, selectSort, currentSort, resetAllButton, setFilterVisible, setActiveFilter, showClearBtnFilter, setDescSort, setActiveSort, showClearBtnSort  } from '../store/slices/filterFranchisee';
import PopupWindow from '../components/ui/PopupWindow/PopupWindow';
import FranchiseeForm from '../components/forms/FranchiseeForm';
import MainButton from '../components/ui/MainButton/MainButton';
import FranchiseeFilters from '../components/filters/franchiseeFilters/FranchiseeFilters';
import ActionNotification from '../components/notifications/ActionNotification';
import GeneralNotification from '../components/notifications/GeneralNotification';

const buttonAdd = 'Добавить франчайзи';
const buttonEdit = 'Сохранить изменения';
const filterParams = {
	filterName: 'franchisee',
	currentSort: currentSort,
	setDescSort: setDescSort,
	setActiveSort: setActiveSort,
	showClearBtnSort: showClearBtnSort,
	selectSort: selectSort,
	setFilterVisible: setFilterVisible,
	setActiveFilter: setActiveFilter,
	resetAllButton: resetAllButton,
	showClearBtnFilter: showClearBtnFilter,
	clearAllFilter: clearAllFilter,
}

function FranchiseeCatalog() {
	const { franchiseeAddWindow, franchiseeEditWindow, franchiseeInfoWindow } = useSelector(state => state.statePopupWindow);
	const { franchiseeId } = useSelector(state => state.franchisee);
	const filterFranchisee = useSelector(state => state.filterFranchisee);
	const { notificationText, notificationVisible, errorNotificationText, errorNotificationVisible } = useSelector(state => state.notification);
	const dispatch = useDispatch();
	filterParams.filterState = filterFranchisee;

	return (
		<>
			<div className={style.content}>
				<div className={style.content__container}>
					<Header className={style.content__header}
						title={'База франчайзи'} />
					<div className={style.content__filterPanel}>
						<FilterPanel className={style.content__filters}
							buttonAdd={buttonAdd}
							filterParams={filterParams} />
						<MainButton className={cn(style.content__addButton, 'icon_add')}
							children={buttonAdd}
							onClick={() => {dispatch(showFranchiseeAdd(!franchiseeAddWindow))}} />
						{filterFranchisee.filterVisible &&
							<FilterOptions className={style.content__options}>
								<FranchiseeFilters />
							</FilterOptions>}
					</div>
					<div className={cn(style.content__tableBlock, style.content__tableBlock_franchisee)}
							style={filterFranchisee.filterVisible ? {height: 'calc(100vh - 409px)'}:{height: 'calc(100vh - 211px)'}}>
						<FranchiseeTable />
					</div>
					{franchiseeAddWindow &&
						<PopupWindow className={style.content__addWindow}
							showPopupWindow={showFranchiseeAdd}
							children={<FranchiseeForm
										buttonName={buttonAdd}
										modeInfo={false}/>}
							/>}
					{franchiseeEditWindow &&
						<PopupWindow className={style.content__addWindow}
							showPopupWindow={showFranchiseeEdit}
							children={<FranchiseeForm
										franchiseeId={franchiseeId}
										buttonName={buttonEdit}
										modeInfo={false}/>}
							/>}
					{franchiseeInfoWindow &&
						<PopupWindow className={style.content__addWindow}
							showPopupWindow={showFranchiseeInfo}
							children={<FranchiseeForm
										franchiseeId={franchiseeId}
										modeInfo={true}/>}
							/>}
					<ActionNotification children={notificationText} isVisible={notificationVisible} />
					{/* <GeneralNotification children={errorNotificationText} isVisible={errorNotificationVisible}/> */}
				</div>
			</div>
			<GeneralNotification children={errorNotificationText} isVisible={errorNotificationVisible}/>
		</>
	);
}

export default FranchiseeCatalog;

