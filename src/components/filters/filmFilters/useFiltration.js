import { useSelector, useDispatch } from 'react-redux';
import { currentFilter } from '../../../store/slices/filterFilm';

export default function useFiltration() {
	//filters states (redux)
	const {	genre, studio, yearFrom, yearTo, language, filtered } = useSelector(state => state.filter);
	const {	films } = useSelector(state => state.films);
	const dispatch = useDispatch();

	//filtration
		if(films.length || filtered != 'initialState'){
			let filteredFilms = films;
			if (genre.length) {
				filteredFilms = filteredFilms.filter((item) => (
					item.category.some((filter) => (
						genre.some((elem) => (
							elem.name === filter))))))}
			if (studio.length) {
				filteredFilms = filteredFilms.filter((item) => (
					item.copyright_holder.some((filter) => (
						studio.some((elem) => (
							elem.name === filter))))))}
			if (yearFrom.length) {
				filteredFilms = filteredFilms.filter((item) => (
						yearFrom.some((elem) => (
							item.year >= elem.year))));console.log(filteredFilms)}
			if (yearTo.length) {
				filteredFilms = filteredFilms.filter((item) => (
					yearTo.some((elem) => (
						item.year <= elem.year))));console.log(filteredFilms)}
			if (language.length) {
				filteredFilms = filteredFilms.filter((item) => (
					item.language.some((filter) => (
						language.some((elem) => (
							elem.name.toLowerCase() === filter.toLowerCase()))))))}
			//update filters state
			dispatch(currentFilter(filteredFilms))
		}
}
