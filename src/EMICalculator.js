import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const CalculatorWrapper = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Heading = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 10px;
`;

const ResultWrapper = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #4caf50;
  color: #fff;
  font-size: 1.5rem;
  border-radius: 5px;
`;

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [years, setYears] = useState(5);

  const calculateEMI = (principal, rate, years) => {
    const monthlyRate = rate / (12 * 100);
    const months = years * 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  const emi = calculateEMI(principal, interestRate, years).toFixed(2);

  return (
    <CalculatorWrapper>
      <Heading>EMI Calculator</Heading>

      <InputWrapper>
        <Label>Loan Amount (Principal): ₹{principal}</Label>
        <Slider
          max={5000000}
          min={50000}
          value={principal}
          onChange={value => setPrincipal(value)}
        />
      </InputWrapper>

      <InputWrapper>
        <Label>Interest Rate (%): {interestRate}%</Label>
        <Slider
          max={15}
          min={1}
          value={interestRate}
          onChange={value => setInterestRate(value)}
        />
      </InputWrapper>

      <InputWrapper>
        <Label>Tenure (Years): {years}</Label>
        <Slider
          max={30}
          min={1}
          value={years}
          onChange={value => setYears(value)}
        />
      </InputWrapper>

      <ResultWrapper>
        EMI: ₹{emi}/month
      </ResultWrapper>
    </CalculatorWrapper>
  );
};

export default EMICalculator;
