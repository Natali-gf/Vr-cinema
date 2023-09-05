import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError, fetchingCurrentFilm, fetchCurrentFilmSuccess, fetchErrorMessage } from '../slices/filmSlice';
import { showFilmAdd, showFilmEdit } from '../slices/windowStateSlice';
import { setNotificationText, showErrorNotification, showNotification } from '../slices/notification';
import { filmFiltration } from "../../components/filters/filmFilters/MovieFilterButton";
import { currentFilter, currentSort } from "../slices/filterFilm";
import { getSortBy } from "../../components/filters/filmFilters/Sort";

export const getFilmRequest = (filter = null) => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/films/');
            dispatch(fetchSuccess( response.data ));

			//check and correct filter state
			if(filter && filter.filtered !== 'initialState'){
				dispatch(currentFilter(filmFiltration(response.data, filter.filtered, filter.genre, filter.studio, filter.yearFrom, filter.yearTo, filter.language)));
				if(filter.sorted){
					const sorted = getSortBy(filter.sort, response.data);
					if(filter.ascSort === false){
						sorted.reverse()
					}
					dispatch(currentSort(sorted));
				}
			} else if(filter && filter.sort !== ''){
				const sorted = getSortBy(filter.sort, response.data);
				if(filter.ascSort === false){
					sorted.reverse()
				}
				dispatch(currentSort(sorted));
			}
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export const getCurrentFilmRequest = (filmId) => {
	const token = localStorage.getItem('authorizationToken');
    return async (dispatch) => {
        try {
            dispatch(fetchingCurrentFilm());
            const response = await api.get(`/films/${filmId}`,
            { headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            }})
            dispatch(fetchCurrentFilmSuccess( response.data ));

			return response;
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export async function postFilmRequest (dispatch, data) {
	const result = await api.post(`/film_add/`, JSON.stringify(data))
		.then((response) => {
			// console.log('response', response);
			dispatch(showFilmAdd(false));
			dispatch(getFilmRequest());
			dispatch(showNotification(true));
			dispatch(setNotificationText('Фильм добавлен'));
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
		})
	return result
}

export async function putFilmRequest (dispatch, data, filmId, state) {
	const result = await api.put(`/film_add/${filmId}/`, JSON.stringify(data))
		.then((response) => {
			// console.log('response', response);
			dispatch(showFilmEdit(false));
			dispatch(getFilmRequest());
			dispatch(showNotification(true));
			if(state === 'on'){
				dispatch(setNotificationText('Фильм опубликован'));
			} else if(state === 'off'){
				dispatch(setNotificationText('Фильм перемещен в архив'))
			} else {
				dispatch(setNotificationText('Изменения сохранены'))
			}
			setTimeout(() => {
				dispatch(showNotification(false))
			}, 3000);
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            if(typeof message.response.data === 'object'){
                dispatch(fetchErrorMessage(message.response.data));
            } else {
                dispatch(fetchError(message.message));
                dispatch(showErrorNotification(true))
            }
		})
	return result
}

export const getFranchiseeFilmRequest = (franchiseeId, filter = null) => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get(`/franchisee_film/${franchiseeId}`);
            dispatch(fetchSuccess(response.data.films));

			//check and correct filter state
			if(filter && filter.filtered !== 'initialState'){
				dispatch(currentFilter(filmFiltration(response.data.films, filter.filtered, filter.genre, filter.studio, filter.yearFrom, filter.yearTo, filter.language)));
				if(filter.sorted){
					const sorted = getSortBy(filter.sort, response.data.films);
					if(filter.ascSort === false){
						sorted.reverse()
					}
					dispatch(currentSort(sorted));
				}
			} else if(filter && filter.sort !== ''){
				const sorted = getSortBy(filter.sort, response.data.films);
				if(filter.ascSort === false){
					sorted.reverse()
				}
				dispatch(currentSort(sorted));
			}
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}

export const getCinemaFilmRequest = (cinemaId, filter = null) => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get(`/cinema/${cinemaId}`);
            dispatch(fetchSuccess( response.data.films ));

			//check and correct filter state
			if(filter && filter.filtered !== 'initialState'){
				dispatch(currentFilter(filmFiltration(response.data.films, filter.filtered, filter.genre, filter.studio, filter.yearFrom, filter.yearTo, filter.language)));
				if(filter.sorted){
					const sorted = getSortBy(filter.sort, response.data.films);
					if(filter.ascSort === false){
						sorted.reverse()
					}
					dispatch(currentSort(sorted));
				}
			} else if(filter && filter.sort !== ''){
				const sorted = getSortBy(filter.sort, response.data.films);
				if(filter.ascSort === false){
					sorted.reverse()
				}
				dispatch(currentSort(sorted));
			}
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            dispatch(fetchError(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}