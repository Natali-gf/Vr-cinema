import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError } from '../slices/cinemaSlice';

export const fetchCinema = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching())
            const response = await api.get('/cinema/')
            dispatch(fetchSuccess(
                response.data
            ))

        } catch (e) {
            dispatch(fetchError(e))
        }
    }
}
