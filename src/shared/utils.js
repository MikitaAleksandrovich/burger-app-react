export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    // Check for empty input
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    // Check for valid email
    if (rules.isEmail) {
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        isValid = pattern.test(value) && isValid;
    }

    // Check for min length of the inputed value
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    // Check for max length of the inputed value
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
};
