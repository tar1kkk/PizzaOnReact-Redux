import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';

function Search() {
	const { searchValue, setSearchValue } = useContext(SearchContext);
	return (
		<>
			<input value={searchValue} onChange={e => setSearchValue(e.target.value)} className={styles.root} placeholder='Поиск пиццы...' />
		</>
	);
}

export default Search;