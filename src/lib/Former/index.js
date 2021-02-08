import { useCallback, useContext, createContext, useState } from "react";

const FormContext = createContext({});
export const useFormContext = () => useContext(FormContext);

export const Former = (props) => {
  const [values, setValues] = useState(props.initialValues);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateField = useCallback(
    (name) => {
      const value = values[name];
      const errors = props.validate[name](value);
      return errors.length ? errors : false;
    },
    [props.validate, values]
  );

  const validateAll = useCallback(() => {
    const errors = {};

    Object.keys(props.validate).forEach((name) => {
      const value = values[name];
      const fieldErrors = props.validate[name](value);

      if (fieldErrors.length) {
        errors[name] = fieldErrors;
      }
    });

    return Object.keys(errors).length ? errors : false;
  }, [props.validate, values]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const errors = validateAll();

        if (Object.keys(errors).length) {
          throw errors;
        }

        await props.handleSubmit(values);
        setValues(props.initialValues);
      } catch (errors) {
        throw errors;
      }
    },
    [props.handleSubmit, values, validateAll]
  );

  return (
    <FormContext.Provider
      value={{
        initialValues: props.initialValues,
        state: values,
        helpers: { setFieldValue, validateField, validateAll, handleSubmit }
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export const useForm = (props) => {
  const {
    helpers: { handleSubmit }
  } = useFormContext();

  return { handleSubmit };
};

export const useField = (name) => {
  const {
    state: values,
    helpers: { setFieldValue, validateField }
  } = useFormContext();

  return {
    value: values[name],
    setValue: (value) => setFieldValue(name, value),
    validateField
  };
};
