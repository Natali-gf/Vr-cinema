import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.scss';
import { setSearchValue } from '../../../store/slices/searchSlice';
import cn from 'classnames';

export default function Search ({placeholder}) {
    const dispatch = useDispatch()
    const { searchValue } = useSelector(state => state.search)

    return (
        <div className={style.search}>
            <label className={cn(style.search__label, 'icon_search')} htmlFor="search"/>
            <input className={style.search__input} id={'search'}
                type={'text'} placeholder={placeholder || 'Поиск'} value={searchValue}
                onChange={(e) => dispatch(setSearchValue(e.target.value))} />
            {searchValue &&
                <button className={cn(style.search__button, 'icon_close')}
                    onClick={() => dispatch(setSearchValue(''))}/>}
        </div>
    )
}