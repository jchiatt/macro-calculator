import React from 'react';
function calculateMacros(weight, ratio) {
  var totalCalories;
  var proteinInGrams;
  var carbsInGrams;
  var fatInGrams;

  if ( ratio === "fatloss" ) {
    totalCalories = weight * 11;
    proteinInGrams = Math.round((totalCalories / 2 / 4) * 10) / 10;
    carbsInGrams = Math.round((totalCalories / 4 / 4) * 10) / 10;
    fatInGrams = Math.round((totalCalories / 4 / 9) * 10) / 10;
  }

  if ( ratio === "moderate" ) {
    totalCalories = weight * 11;
    proteinInGrams = Math.round(((totalCalories * .4) / 4) * 10) / 10;
    carbsInGrams = Math.round(((totalCalories * .3) / 4) * 10) / 10;
    fatInGrams = Math.round(((totalCalories * .3) / 9) * 10) / 10;
  }

  return {
    proteinInGrams,
    carbsInGrams,
    fatInGrams
  };
}

export default function CalculatorForm() {
  const [weight, setWeight] = React.useState('');
  const [protein, setProtein] = React.useState(0);
  const [carbs, setCarbs] = React.useState(0);
  const [fat, setFat] = React.useState(0);
  const [ratio, setRatio] = React.useState("fatloss");

  function handleChange(e) {
    if ( e.target.value === '' ) {
      setWeight('');
    } else {
      setWeight(parseInt(e.target.value));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { proteinInGrams, carbsInGrams, fatInGrams } = calculateMacros(weight, ratio);
    setProtein(proteinInGrams);
    setCarbs(carbsInGrams);
    setFat(fatInGrams);
  }

  return (
    <>
      <form className="Form" onSubmit={handleSubmit}>
        <label htmlFor="weight">
          <input
            type="text"
            id="weight"
            name="weight"
            placeholder="Current weight"
            value={weight}
            onChange={handleChange}
          />
        </label>
        <label className="Form__radio">
          <input
            type="radio"
            name="ratio"
            value="fatloss"
            checked={ratio === "fatloss"}
            className="Form__input"
            onClick={() => setRatio("fatloss")}
          />
          <span className="Form__span">50%, 25%, 25%</span>
        </label>
        <label className="Form__radio">
          <input
            type="radio"
            name="ratio"
            value="moderate"
            checked={ratio === "moderate"}
            className="Form__input"
            onClick={() => setRatio("moderate")}
          />
          <span className="Form__span">40%, 30%, 30%</span>
        </label>
        <button type="submit">Calculate</button>
        {protein > 0 && (
          <div className="Result">
            <p>Protein: {protein}g</p>
            <p>Carbs: {carbs}g</p>
            <p>Fat: {fat}g</p>
          </div>
        )}
      </form>
    </>
  );
}