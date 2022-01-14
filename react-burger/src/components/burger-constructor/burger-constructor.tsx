import { useDispatch, useSelector } from "../../services/hooks";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import styleBurgerConstructor from "./burger-constructor.module.css";
import {
  getOrderNumber,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
} from "../../services/actions/ingredients";
import { openOrderModal } from "../../services/actions/modal";

import { IBurgerIngredients, IIngredient } from "../../utils/interfaces";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { constructorIngredients, currentBun } = useSelector(
    (store: { burgerIngredients: IBurgerIngredients }) =>
      store.burgerIngredients
  );
  const { isAuth } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      if (item.type === "bun") {
        dispatch({
          type: ADD_BUN_TO_CONSTRUCTOR,
          draggedIngredient: item,
        });
      } else {
        dispatch({
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          draggedIngredient: item,
        });
      }
    },
  });

  const totalPrice =
    (
      useSelector(
        (store: { burgerIngredients: IBurgerIngredients }) =>
          store.burgerIngredients.constructorIngredients
      ) as any[]
    ).reduce((sum: number, { price }: { price: number }) => {
      return sum + price;
    }, 0) + (currentBun ? currentBun.price * 2 : 0);

  const topElement = useMemo(() => {
    return currentBun ? (
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${currentBun.name} (верх)`}
        price={currentBun.price}
        thumbnail={currentBun.image}
      />
    ) : (
      ""
    );
  }, [currentBun]);

  const bottomElement = useMemo(() => {
    return currentBun ? (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${currentBun.name} (низ)`}
        price={currentBun.price}
        thumbnail={currentBun.image}
      />
    ) : (
      ""
    );
  }, [currentBun]);

  const openModal = () => {
    dispatch(openOrderModal());
  };

  return (
    <section className={styleBurgerConstructor.root}>
      <div ref={dropTarget} className={`${styleBurgerConstructor.list} `}>
        <div className={`${styleBurgerConstructor.item} mb-4`}>
          {topElement}
        </div>
        <div className={`${styleBurgerConstructor.scrollable} mb-4`}>
          {constructorIngredients.map((item, index) => (
            <BurgerConstructorItem item={item} key={index} index={index} />
          ))}
        </div>
        <div className={`${styleBurgerConstructor.item} mb-4`}>
          {bottomElement}
        </div>
      </div>
      <div className={`${styleBurgerConstructor.total} mt-10`}>
        <span
          className={`${styleBurgerConstructor.totalSum} mr-10 text_type_digits-medium`}
        >
          {totalPrice}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            if (!isAuth) {
              navigate("/login");
              return;
            }

            if (currentBun != null && constructorIngredients.length > 0) {
              dispatch(
                getOrderNumber([
                  currentBun,
                  ...constructorIngredients,
                  currentBun,
                ])
              );
              openModal();
            }
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
