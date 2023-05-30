import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import FilmCatalog from '../pages/FilmCatalog/FilmCatalog';
import CinemaCatalog from '../pages/CinemaCatalog/CinemaCatalog';

function App() {
	return (


		<div className="main-container">
			<Sidebar/>
			<Routes>
				<Route path='/' element={<div>Main page</div>} />
				<Route path='/films' element={<FilmCatalog/>} />
				<Route path='/cinema' element={<CinemaCatalog/>} />
			</Routes>
		</div>


	);
}

export default App;