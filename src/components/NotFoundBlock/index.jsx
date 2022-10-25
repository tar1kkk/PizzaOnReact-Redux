import React from 'react';
import styles from './NotFoundBlock.module.scss';

function NotFoundBlock(props) {
	return (
		<div className={styles.root}>
			<h1 >Ничего не найдено :(</h1>
			<p className={styles.description}>К сожалению данная страница отсутсвует в нашем инернет-магазине</p>
		</div>
	);
}

export default NotFoundBlock;