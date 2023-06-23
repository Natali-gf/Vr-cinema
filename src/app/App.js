import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/static/Sidebar/Sidebar';
import FilmCatalog from '../pages/FilmCatalog';
import CinemaCatalog from '../pages/CinemaCatalog';
import FranchiseeCatalog from '../pages/FranchiseeCatalog';

function App() {
	return (
		<div className="main-container">
			<Sidebar/>
			<Routes>
				<Route path='/' element={<div>Main page</div>} />
				<Route path='/films' element={<FilmCatalog/>} />
				<Route path='/cinema' element={<CinemaCatalog/>} />
				<Route path='/franchisee' element={<FranchiseeCatalog/>} />
			</Routes>
		</div>
	);
}

export default App;