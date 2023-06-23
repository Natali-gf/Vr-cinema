import api from "../../api/axios";
import { fetching, fetchSuccess, fetchError } from '../slices/franchiseeSlice';

export const fetchFranchisee = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching())
            const response = await api.get('/franchisee/')
            dispatch(fetchSuccess(
                response.data
            ))

        } catch (e) {
            dispatch(fetchError(e))
        }
    }
}
