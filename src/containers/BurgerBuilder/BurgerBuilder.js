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

const ensureMexicalChilli = (ingredients) => {
  if (!ingredients) {
    return null;
  }
  if (typeof ingredients.mexicalChilli === "number") {
    return ingredients;
  }
  return {
    ...ingredients,
    mexicalChilli: 0,
  };
};

const BurgerBuilder = (props) => {
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const normalizedIngredients = ensureMexicalChilli(props.ingredients);

  // Check if there are any or just one ingredient to then continue and make an order
  const updatePurchaseState = (ingredients) => {
    if (!ingredients) {
      return false;
    }
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

  const disabledInfo = {};

  if (normalizedIngredients) {
    for (let key in normalizedIngredients) {
      disabledInfo[key] = normalizedIngredients[key] <= 0;
    }
  }
  // {salad: true, meat: false etc...}

  let orderSummary = null;

  let burger = props.error ? (
    <p style={{ textAlign: "center", fontSize: "2.5rem" }}>
      Ingredients can't be loaded!
    </p>
  ) : (
    <Spinner />
  );

  if (normalizedIngredients) {
    burger = (
      <>
        <Burger ingredients={normalizedIngredients} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          purchasable={updatePurchaseState(normalizedIngredients)}
          ordered={purchaseHandler}
          disabled={disabledInfo}
          isAuthenticated={props.isAuthenticated}
          price={props.totalPrice}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={normalizedIngredients}
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