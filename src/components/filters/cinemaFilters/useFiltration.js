import { useSelector, useDispatch } from 'react-redux';
import { currentFilter } from '../../../store/slices/filterCinema';

export default function useFiltration() {
	//filters states (redux)
	const {	city, owner, typeCinema, filtered } = useSelector(state => state.filterCinema);
	const {	franchisee } = useSelector(state => state.franchisee);
	const dispatch = useDispatch();

	//filtration
		if(franchisee.length || filtered != 'initialState'){
			let filteredFranchisee = franchisee;
			if (city.length) {
				filteredFranchisee = filteredFranchisee.filter((item) => (
					item.city.some((filter) => (
						city.some((elem) => (
							elem.city === filter))))))}
			if (owner.length) {
				filteredFranchisee = filteredFranchisee.filter((item) => (
					item.name.some((filter) => (
						owner.some((elem) => (
							elem.name === filter))))))}
			if (typeCinema.length) {
				filteredFranchisee = filteredFranchisee.filter((item) => (
					item.type_cinema.some((filter) => (
						typeCinema.some((elem) => (
							elem.name === filter))))))}
			//update filters state
			dispatch(currentFilter(filteredFranchisee))
		}
}
