import { useDispatch, useSelector } from 'react-redux';
import FilmCatalog from './FilmCatalog';
import { getCurrentCinemaRequest } from '../store/actions/cinemaAction';
import React from 'react';
import { clearCinemaData } from '../store/slices/cinemaSlice';

export default function FilmCatalogCinema() {
	const {cinemaData} = useSelector(state => state.cinema);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getCurrentCinemaRequest(localStorage.cinemaId))

		return(()=> dispatch(clearCinemaData()))
    }, []);

	return (
		<FilmCatalog
			hideAddButton={true}
			whichFilms={'cinema'}
			subtitle={cinemaData && `(кинотеатр "${cinemaData.name}" в городе "${cinemaData.city}")`} />
	);
}
