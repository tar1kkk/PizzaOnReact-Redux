
type CategoriesProps = {
	value: number;
	onChangeCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
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
				{catgories.map((categoryName, i) => (
					<li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>{categoryName}</li>
				))}
			</ul>
		</div>
	)
}

export default Categories;