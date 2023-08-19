import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../redux/slices/filterSlice";

function Categories() {
const dispatch = useDispatch();
const categoryId = useSelector((state)=> state.filterSlice.categoryId);


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
					<li key={i}
						onClick={() => dispatch(setCategoryId(i))}
						className={categoryId === i ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories;