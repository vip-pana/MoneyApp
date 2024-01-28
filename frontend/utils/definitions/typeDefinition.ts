// for convention all methods created in this file will have at the end of the name the phrase "ValueDefinition"
// here is the file where all type definition will be created

type CheckMailValueDefinition = {
  email: string;
};

type LoginValueDefinition = {
  email: string;
  password: string;
};

type SignUpValueDefinition = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  currency: string;
};
