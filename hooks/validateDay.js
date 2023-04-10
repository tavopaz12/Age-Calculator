import moment from "moment";

const fechaActual = moment();

export const validateDay = (anioInput) => {
  const anioActual = fechaActual.year();

  if (anioInput > anioActual) {
    return true;
  }
};
