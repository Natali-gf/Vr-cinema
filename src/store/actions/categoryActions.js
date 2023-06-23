import api from "../../api/axios";
import { fetchSuccess, fetchError } from '../slices/categorySlice';

export const fetchCategory = () => {
    return async (dispatch) => {
        try {
            const response = await api.get('/category/')
            dispatch(fetchSuccess(
                response.data
            ))
        } catch (e) {
            dispatch(fetchError(e))
			console.log('error');
        }
    }
}