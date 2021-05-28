import React from "react";
import PropTypes from "prop-types";

import styles from "./BurgerIngredient.module.css";

const BurgerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={styles.breadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={styles.breadTop}>
          <div className={styles.ceeds}></div>
          <div className={styles.ceeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={styles.meat}></div>;
      break;
    case "cheese":
      ingredient = <div className={styles.cheese}></div>;
      break;
    case "bacon":
      ingredient = <div className={styles.bacon}></div>;
      break;
    case "salad":
      ingredient = <div className={styles.salad}></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
