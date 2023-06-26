export default function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater than 8 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function register_validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid username";
  } else if (/[A-Z]+/.test(values.username)) {
    errors.username = "Uppercase characters cannot be used";
  } else if (/[ !"#$%&'()*+,-./:;<=>?@[\\\]^`{|}~]/.test(values.username)) {
    errors.username = "Special characters cannot be used";
  } else if (values.username.length > 30) {
    errors.username = "Username cannot be longer than 30 characters";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater than 8 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  //validation fro confirm password
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password does not match";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid Confirm Password";
  }

  return errors;
}

export function expense_validate(values) {
  const errors = {};

  // validation for amount
  if (!values.amount) {
    errors.amount = "Required";
  }

  // validation for defination
  if (!values.defination) {
    errors.defination = "Required";
  }

  // validation for category
  if (!values.category) {
    errors.category = "Required";
  }

  // validation for date
  if (!values.date) {
    errors.date = "Required";
  }

  return errors;
}
