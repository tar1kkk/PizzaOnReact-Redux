import { useState } from "react";

function Categories() {
	const [activeIndex, setActiveIndex] = useState(0);

	function onClickCategory(index) {
		setActiveIndex(index);
	}
	const catgories = [
		'Все',
		'Мясные',
		'Вегетарианские',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className="categories">
			<ul>
				{catgories.map((value, i) => (
					<li key={i} onClick={() => onClickCategory(i)} className={activeIndex === i ? 'active' : ''}>{value}</li>
				))}
			</ul>
		</div>
	)
}

export default Categories;