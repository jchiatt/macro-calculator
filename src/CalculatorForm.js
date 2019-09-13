import React from 'react';
function calculateMacros(weight) {
  const totalCalories = weight * 11;
  const proteinInGrams = (Math.round(((totalCalories / 2) / 4) * 10) / 10)
  const carbsInGrams = (Math.round(((totalCalories / 4) / 4) * 10) / 10)
  const fatInGrams = (Math.round(((totalCalories / 4) / 9) * 10) / 10)

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

  function handleChange(e) {
    setWeight(parseInt(e.target.value));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { proteinInGrams, carbsInGrams, fatInGrams } = calculateMacros(weight);
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