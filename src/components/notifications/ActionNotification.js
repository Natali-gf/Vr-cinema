import style from './style.module.scss';
import React from 'react';
import cn from 'classnames';


function ActionNotification({className, children, isVisible}) {

	return (
		<>
			{isVisible &&
				<div className={cn(style.notification, className)}>
					{children}
				</div>
			}
		</>
	);
}

export default ActionNotification;