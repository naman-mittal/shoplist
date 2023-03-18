export const validateEmail = (email: string) => {
  if (!email || !email.length) {
    return 'Please enter the email';
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) {
    return 'Invalid Email';
  }

  return '';
};

export const validateGroceryName = (name: string) => {
  if (!name || !name.length) {
    return 'please enter name';
  }

  const nameRegex = /^\S.*[a-zA-Z0-9\s]*$/;

  if (!nameRegex.test(name)) {
    return 'only alphanumeric (a-z, A-Z, 0-9) allowed';
  }

  if (name.length > 20) {
    return 'only 20 characters allowed';
  }

  return '';
};

export const validateGroceryQuantity = (name: string) => {
  if (!name || !name.length) {
    return 'please enter quantity';
  }

  const nameRegex = /^\S.*[a-zA-Z0-9\s]*$/;

  if (!nameRegex.test(name)) {
    return 'only alphanumeric (a-z, A-Z, 0-9) allowed';
  }

  if (name.length > 20) {
    return 'only 20 characters allowed';
  }

  return '';
};
