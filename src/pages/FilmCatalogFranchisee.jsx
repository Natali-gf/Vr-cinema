import { useDispatch, useSelector } from 'react-redux';
import FilmCatalog from './FilmCatalog';
import React from 'react';
import { getCurrentFranchiseeRequest } from '../store/actions/franchiseeAction';
import { clearFranchiseeData } from '../store/slices/franchiseeSlice';

export default function FilmCatalogFranchisee({}) {
	const {franchiseeData} = useSelector(state => state.franchisee);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getCurrentFranchiseeRequest(localStorage.franchiseeId))

		return(()=> dispatch(clearFranchiseeData()))
    }, []);

	return (
		<FilmCatalog
			hideAddButton={true}
			whichFilms={'franchisee'}
			title={''}
			subtitle={franchiseeData && `(франчайзи "${franchiseeData.name}")`} />
	);
}
