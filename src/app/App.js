import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/static/Sidebar/Sidebar';
import FilmCatalog from '../pages/FilmCatalog';
import CinemaCatalog from '../pages/CinemaCatalog';
import FranchiseeCatalog from '../pages/FranchiseeCatalog';
import HandbookCatalog from '../pages/HandbookCatalog';
import Authorization from '../pages/Authorization/AuthorizationPage';
import FilmCatalogCinema from '../pages/FilmCatalogCinema';
import FilmCatalogFranchisee from '../pages/FilmCatalogFranchisee';
import Settings from '../pages/Settings/Settings';

function App() {

	return (
		<div className="main-container">
			<Sidebar/>
			<Routes>
				<Route path='/' element={!localStorage.getItem('authorizationToken') ? <Authorization/> : <div/>} />
				<Route path='/films' element={<FilmCatalog/>} />
				<Route path='/cinema' element={<CinemaCatalog/>} />
				<Route path='/franchisee' element={<FranchiseeCatalog/>} />
				<Route path='/handbook' element={<HandbookCatalog/>} />
				<Route path='/cinema/cinema_films' element={<FilmCatalogCinema/>} />
				<Route path='/franchisee/franchisee_films' element={<FilmCatalogFranchisee/>} />
				<Route path='/user_settings' element={<Settings />} />
				{!localStorage.getItem('authorizationToken') &&
					<Route path='/authorization' element={<Authorization/>} />}
			</Routes>
		</div>
	);
}

export default App;