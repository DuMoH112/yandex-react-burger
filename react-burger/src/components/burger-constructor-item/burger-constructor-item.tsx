import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  replaceItems,
} from "../../services/actions/ingredients";
import styles from "./burger-constructor-item.module.css";

import { IIngredient } from "../../utils/interfaces";
interface IProps {
  item: IIngredient;
  index: number;
}

const BurgerConstructorItem = (props: IProps) => {
  const dispatch = useDispatch();

  const deleteIngredientFromConstructor = (item: IIngredient) => {
    dispatch({
      type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
      id: item._id,
    });
  };

  const ref = React.useRef<HTMLInputElement>(null);

  const [, drop] = useDrop({
    accept: "constructorIngredient",
    hover: (item: IProps, monitor: any) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(replaceItems(dragIndex, hoverIndex));

      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "constructorIngredient",
    item: () => {
      return { id: props.item._id, index: props.index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div className={`${styles.item} mb-4`} ref={ref} draggable>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
        handleClose={(): void => deleteIngredientFromConstructor(props.item)}
      />
    </div>
  );
};

export default BurgerConstructorItem;
