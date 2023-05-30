// import searchIcon from '../../assets/icons/searchIcon.png'
import deleteSearchText from '../../assets/icons/deleteSearchText.svg'
import style from './style.module.scss';

export  const Search = ({searchValue, setSearchValue}) => {
 return (
    <div className={style.search}>
        <div className={style.search__img}></div>
        {/* <img src={searchIcon} alt="" /> */}
        <input 
            type="text" 
            placeholder='Поиск'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />
        <button><img src={deleteSearchText} alt="" /></button>
	</div>
 )
}