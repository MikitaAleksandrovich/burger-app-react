import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_ORDER = [
  "salad",
  "redHotChilliPepper",
  "bacon",
  "cheese",
  "meat",
];

export const BurgerBuilder = (props) => {
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, [props.onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setIsPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setIsPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = INGREDIENT_ORDER.reduce((info, ingredient) => {
    const quantity =
      props.ingredients && props.ingredients[ingredient]
        ? props.ingredients[ingredient]
        : 0;
    info[ingredient] = quantity <= 0;
    return info;
  }, {});

  if (props.ingredients) {
    Object.keys(props.ingredients).forEach((key) => {
      if (typeof disabledInfo[key] === "undefined") {
        disabledInfo[key] = props.ingredients[key] <= 0;
      }
    });
  }

  let orderSummary = null;

  let burger = props.error ? (
    <p style={{ textAlign: "center", fontSize: "2.5rem" }}>
      Ingredients can't be loaded!
    </p>
  ) : (
    <Spinner />
  );

  if (props.ingredients) {
    burger = (
      <>
        <Burger
          ingredients={props.ingredients}
          ingredientOrder={INGREDIENT_ORDER}
        />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          purchasable={updatePurchaseState(props.ingredients)}
          ordered={purchaseHandler}
          disabled={disabledInfo}
          isAuthenticated={props.isAuthenticated}
          price={props.totalPrice}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={props.totalPrice}
      />
    );
  }

  return (
    <>
      <Modal show={isPurchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseBurgerInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));