import React from "react";
import { useDispatch } from "react-redux";

import styles from "./Order.module.css";

import trash from "../../../assets/images/trash.png";

import * as actions from "../../../store/actions/index";

const Order = (props) => {
const dispatch = useDispatch();
  const ingredients = [];


  const handleOrderClick = () => {
      console.log(props.id);
      dispatch(actions.deleteOrder(props.id))
  }

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientsOutput = ingredients.map((ingredient) => {
    return (
      <span key={ingredient.name} className={styles.ingredient}>
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className={styles.container}>
      <div>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>
          Price:
          <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
        </p>
      </div>
      <div>
          <img src={trash} className={styles.trash} onClick={handleOrderClick} />
      </div>
    </div>
  );
};



export default Order;
