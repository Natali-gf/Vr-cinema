import style from './style.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/static/Header/Header';
import Handbooks from '../components/Handbooks/Handbooks';
import MainButton from '../components/ui/MainButton/MainButton';
import ActionNotification from '../components/notifications/ActionNotification';
import GeneralNotification from '../components/notifications/GeneralNotification';

const buttonAdd = 'Добавить справочник';

function HandbookCatalog() {
	const { notificationText, notificationVisible, errorNotificationText, errorNotificationVisible } = useSelector(state => state.notification);
	const dispatch = useDispatch();

	return (
		<>
			<div className={style.content}>
				<div className={style.content__container}>
					<Header className={style.content__header}
						title={'Справочник'} />
					<div className={style.content__filterPanel}>
						<MainButton className={cn(style.content__addButton, 'icon_add')}
							children={buttonAdd}
							onClick={() => {}}/>
					</div>
					<hr className={style.content__hr}/>
					<div className={style.content__tableBlock}
							style={{height: 'calc(100vh - 248px)'}}>
						<Handbooks className={style.content__handbooks} />
					</div>
					<ActionNotification children={notificationText} isVisible={notificationVisible} />
					{/* <GeneralNotification children={errorNotificationText} isVisible={errorNotificationVisible}/> */}
				</div>
			</div>
			<GeneralNotification children={errorNotificationText} isVisible={errorNotificationVisible}/>
		</>
	);
}

export default HandbookCatalog;