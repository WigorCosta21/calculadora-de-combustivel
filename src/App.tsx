import "./App.css";
import { useState, FormEvent } from "react";

import logoImg from "./assets/logo.png";

interface InfoProps {
  title: string;
  gasoline: string | number;
  alcohol: string | number;
}

const App = () => {
  const [gasolineInput, setGasolineInput] = useState(0);
  const [alcoholInput, setAlcoholInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  const calculate = (event: FormEvent) => {
    event.preventDefault();

    let calculation = alcoholInput / gasolineInput;
    console.log(calculation);

    if (calculation <= 0.7) {
      setInfo({
        title: "Compensa usar álcool",
        gasoline: formatCurrency(gasolineInput),
        alcohol: formatCurrency(alcoholInput),
      });
    } else {
      setInfo({
        title: "Compensa usar gasolina",
        gasoline: formatCurrency(gasolineInput),
        alcohol: formatCurrency(alcoholInput),
      });
    }
  };

  const formatCurrency = (value: number) => {
    let formattedValue = value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return formattedValue;
  };

  return (
    <div>
      <main className="container">
        <img
          className="logo"
          src={logoImg}
          alt="Logo da calculadora de gasolina ou alcool"
        />
        <h1 className="title">Qual a melhor opção?</h1>

        <form className="form" onSubmit={calculate}>
          <label htmlFor="">Álcool (preço por litro)</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={alcoholInput}
            onChange={(e) => setAlcoholInput(Number(e.target.value))}
          />
          <label htmlFor="">Gasolina (preço por litro)</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={gasolineInput}
            onChange={(e) => setGasolineInput(Number(e.target.value))}
          />

          <input className="button" type="submit" value="Calcular" />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">{info.title}</h2>
            <span>Álcool {info.alcohol}</span>
            <span>Gasolina {info.gasoline}</span>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
