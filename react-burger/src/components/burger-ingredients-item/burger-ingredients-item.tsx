import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerItem from './burger-ingredients-item.module.css';
import { useDrag } from 'react-dnd';
import { useSelector } from "../../services/hooks";

import { IBurgerIngredients, IIngredient } from '../../utils/interfaces';

interface IProps {
  item: IIngredient;
  openModal: (item: IIngredient) => void;
}

const BurgerIngredientsItem = (props: IProps) => {
  const ingredients = useSelector((store: {burgerIngredients: IBurgerIngredients}) => (store.burgerIngredients.constructorIngredients) as any[]).filter(item => item._id === props.item._id);
  const currentBun = [useSelector((store: {burgerIngredients: IBurgerIngredients}) => store.burgerIngredients.currentBun)].filter(item => item && item._id === props.item._id)

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props.item
  });
  
  const conditionCount = ingredients.length > 0 || currentBun.length > 0;
  const length = props.item.type !== 'bun' ? ingredients.length : currentBun.length > 0 ? 2 : 0;

  return (
    <>
      <li ref={dragRef} key={props.item._id} className={`${stylesBurgerItem.card} mb-8 mr-4`} onClick={() => props.openModal(props.item)}>
        {
          conditionCount && (
            <span className={`${stylesBurgerItem.count} text_type_digits-default`}>{length}</span>
          )
        }
        <img src={props.item.image} alt=""/>
        <span className={`${stylesBurgerItem.price} mt-2 mb-1 text_type_digits-default`}>
          {props.item.price}
          <CurrencyIcon type="primary" />
        </span>
        <p className={`${stylesBurgerItem.name} text_type_main-default`}>{props.item.name}</p>
      </li>
    </>
  );
};

export default BurgerIngredientsItem;
