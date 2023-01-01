import { useContext } from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { useState } from 'react';

// type SearchContextProps = {
// 	searchValue: string;
// 	setSearchValue: (str: string) => void;
// }

const Search = () => {
	const [value, setValue] = useState('');

	const updateSearchValue = useCallback(
		debounce((str) => {
			setSearchValue(str);
		}, 1000),
		[],
	);
	const onChangeInput = (e) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	}
	const { searchValue, setSearchValue } = useContext(SearchContext);
	return (
		<>
			<input value={value} onChange={(e) => onChangeInput(e)} className={styles.root} placeholder='Поиск пиццы...' />
		</>
	);
}

export default Search;