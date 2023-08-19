import React, {useCallback, useContext, useState} from 'react';
import styles from './Search.module.css';
import {SearchContext} from "../../App";
import debounce from 'lodash.debounce';


function Search() {
    const [value,setValue] = useState('');
    const {searchValue,setSearchValue} = useContext(SearchContext);

    const updateSearchValue = useCallback(
        debounce((str)=>{
            setSearchValue(str);
        },1000),
        [],
    );

    const onChangeInput = e => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    }

    return (
       <input value={value} onChange={onChangeInput} className={styles.root} placeholder={`Поиск пиццы...`} />
    );
}

export default Search;