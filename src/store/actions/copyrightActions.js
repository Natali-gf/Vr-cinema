import api from "../../api/axios";
import { fetchSuccess, fetchError } from '../slices/copyrightSlice';

export const fetchCopyright = () => {
    return async (dispatch) => {
        try {
            const response = await api.get('/copyright/')
            dispatch(fetchSuccess(
                response.data
            ))
        } catch (e) {
            dispatch(fetchError(e))
			console.log('error');
        }
    }
}