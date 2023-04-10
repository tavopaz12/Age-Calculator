/* eslint-disable indent */
import { useEffect, useState } from "react";
import "./App.scss";
import ArrowIcon from "./assets/icon-arrow.svg";

import moment from "moment";

function App() {
  const fechaActual = moment();

  const [anio, setAnio] = useState(fechaActual.year());
  const [mes, setMes] = useState(fechaActual.month() + 1);
  const [day, setDay] = useState(fechaActual.date());

  const fechaUserInput = moment(`${anio}-${mes}-${day}`);

  const [invalidDay, setInvalidDay] = useState(false);
  const [invalidMes, setInvalidMes] = useState(false);
  const [invalidAnio, setInvalidAnio] = useState(false);

  const [diffDays, setDiffDays] = useState(0);
  const [diffMes, setDiffMes] = useState(0);
  const [diffAnio, setDiffAnio] = useState(0);

  const [error, setError] = useState(false);

  useEffect(() => {
    const diferenciaDias = moment(fechaActual).diff(
      moment(fechaUserInput),
      "days"
    );

    const diferenciaMeses = moment(fechaActual).diff(
      moment(fechaUserInput),
      "months"
    );
    const diferenciAnios = moment(fechaActual).diff(
      moment(fechaUserInput),
      "years"
    );

    setDiffDays(diferenciaDias - diferenciAnios * 365);
    setDiffMes(12 * diferenciAnios - diferenciaMeses);
    setDiffAnio(diferenciAnios);
  });

  const handleInputDay = (evt) => {
    setDay(evt.target.value);
  };

  useEffect(() => {
    const max = 31;

    if (day > max) {
      setInvalidDay(true);
      return;
    }

    setInvalidDay(false);
  }, [day]);

  const handleInputYear = (evt) => {
    setAnio(evt.target.value);
  };

  useEffect(() => {
    const anioActual = fechaActual.year();

    if (anio > anioActual) {
      setInvalidAnio(true);
      return;
    }

    setInvalidAnio(false);
  });

  const handleInputMes = (evt) => {
    setMes(evt.target.value);
  };

  useEffect(() => {
    const max = 12;

    if (mes > max) {
      setInvalidMes(true);
      return;
    }

    setInvalidMes(false);
  });

  useEffect(() => {
    if (invalidAnio) {
      setError(true);
      return;
    }

    if (invalidDay) {
      setError(true);
      return;
    }

    if (invalidMes) {
      setError(true);
      return;
    }

    setError(false);
  });

  return (
    <main className="App">
      <section className="section">
        <article className="form">
          <form action="" className="form__date">
            <label htmlFor="">
              <span className={`title ${invalidDay ? "text__error" : null}`}>
                DAY
              </span>
              <input
                value={day}
                type="number"
                name=""
                id=""
                onChange={handleInputDay}
                min={1}
                max={31}
              />
              {invalidDay && (
                <span className="info__error">Must be a valid day</span>
              )}
            </label>

            <label htmlFor="">
              <span className={`title ${invalidMes ? "text__error" : null}`}>
                MONTH
              </span>
              <input
                value={mes}
                type="number"
                name=""
                id=""
                onChange={handleInputMes}
                min={1}
                max={12}
              />
              {invalidMes && (
                <span className="info__error">Must be a valid month</span>
              )}
            </label>

            <label htmlFor="">
              <span className={`title ${invalidAnio ? "text__error" : null}`}>
                YEAR
              </span>
              <input
                value={anio}
                type="number"
                name=""
                id=""
                onChange={handleInputYear}
                min={100}
                max={fechaActual.year()}
              />
              {invalidAnio && (
                <span className="info__error">Must be a valid year</span>
              )}
            </label>
          </form>
        </article>

        <article className="arrow">
          <hr />
          <div className="circle">
            <img src={ArrowIcon} alt="" />
          </div>
        </article>

        <article className="results">
          <p className="text">
            <span className="text__purple">
              {error
                ? 0
                : Math.abs(diffAnio) || diffAnio
                ? Math.abs(diffAnio)
                : 0}
            </span>
            <span> years</span>
          </p>
          <p className="text">
            <span className="text__purple">
              {error ? 0 : Math.abs(diffMes) || diffMes ? Math.abs(diffMes) : 0}
            </span>
            <span> months</span>
          </p>
          <p className="text">
            <span className="text__purple">
              {error
                ? 0
                : Math.abs(diffDays) || diffDays
                ? Math.abs(diffDays)
                : 0}
            </span>
            <span> days</span>
          </p>
        </article>
      </section>
    </main>
  );
}

export default App;
