import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError } from '../slices/filmSlice';

export const fetchFilms = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching())
            const response = await api.get('/films/')
            dispatch(fetchSuccess(
                response.data
            ))

        } catch (e) {
            dispatch(fetchError(e))
        }
    }
}