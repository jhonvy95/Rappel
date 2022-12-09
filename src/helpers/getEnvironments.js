export const getEnvironments = () => {
  const variablesEnv = import.meta.env;
  return {
    ...variablesEnv,
  };
};
