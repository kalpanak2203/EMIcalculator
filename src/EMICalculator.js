import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import jsPDF from 'jspdf';

// Define light and dark themes with transitions
const lightTheme = {
  background: 'linear-gradient(135deg, #f9f9f9, #e1e1e1)',
  color: '#333',
  resultBackground: '#4caf50',
  buttonBackground: '#333',
  buttonColor: '#fff',
  sliderTrackColor: '#ddd',
  sliderHandleColor: '#4caf50',
  transition: 'background 0.3s ease, color 0.3s ease',
};

const darkTheme = {
  background: 'linear-gradient(135deg, #333, #555)',
  color: '#f9f9f9',
  resultBackground: '#1b5e20',
  buttonBackground: '#f9f9f9',
  buttonColor: '#333',
  sliderTrackColor: '#666',
  sliderHandleColor: '#1b5e20',
  transition: 'background 0.3s ease, color 0.3s ease',
};

const CalculatorWrapper = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Arial', sans-serif;
  transition: ${({ theme }) => theme.transition};
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.color};
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  transition: ${({ theme }) => theme.transition};
`;

const InputWrapper = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color};
  margin-bottom: 10px;
  transition: ${({ theme }) => theme.transition};
`;

const SliderWrapper = styled.div`
  margin: 20px 0;
`;

const StyledSlider = styled(Slider)`
  .rc-slider-track {
    background-color: ${({ theme }) => theme.sliderTrackColor};
    transition: background-color 0.3s ease;
  }

  .rc-slider-handle {
    border: 2px solid ${({ theme }) => theme.sliderHandleColor};
    background-color: ${({ theme }) => theme.sliderHandleColor};
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  .rc-slider-rail {
    background-color: ${({ theme }) => theme.sliderTrackColor};
  }
`;

const ResultWrapper = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: ${({ theme }) => theme.resultBackground};
  color: #fff;
  font-size: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
  font-weight: 500;
  transition: ${({ theme }) => theme.transition};
`;

const ThemeToggleButton = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.buttonColor};
    color: ${({ theme }) => theme.buttonBackground};
  }
`;

const ActionButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.buttonColor};
    color: ${({ theme }) => theme.buttonBackground};
  }
`;

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(50000);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(6);
  const [years, setYears] = useState(2);
  const [theme, setTheme] = useState(lightTheme); // State to handle theme

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const calculateEMI = (principal, rate, years) => {
    const monthlyRate = rate / (12 * 100);
    const months = years * 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  const netLoanAmount = principal - downPayment;
  const emi = calculateEMI(netLoanAmount, interestRate, years).toFixed(2);
  const totalAmountPayable = (emi * years * 12).toFixed(2);
  const netInterestPayable = (totalAmountPayable - netLoanAmount).toFixed(2);

  const handleSavePDF = () => {
    const doc = new jsPDF();
    doc.text(`EMI Breakdown`, 10, 10);
    doc.text(`Total Loan Amount: ₹${principal}`, 10, 20);
    doc.text(`Down Payment: ₹${downPayment}`, 10, 30);
    doc.text(`Interest Rate: ${interestRate}%`, 10, 40);
    doc.text(`Tenure (Years): ${years}`, 10, 50);
    doc.text(`EMI: ₹${emi}/month`, 10, 60);
    doc.text(`Total Amount Payable: ₹${totalAmountPayable}`, 10, 70);
    doc.text(`Net Interest Payable: ₹${netInterestPayable}`, 10, 80);
    doc.text(`Net Loan Amount: ₹${netLoanAmount}`, 10, 90);
    doc.save('EMI_Breakdown.pdf');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ThemeProvider theme={theme}>
      <CalculatorWrapper>
        <Heading>EMI Calculator</Heading>

        <ThemeToggleButton onClick={toggleTheme}>
          {theme === lightTheme ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </ThemeToggleButton>

        <InputWrapper>
          <Label>Total Loan Amount: ₹{principal}</Label>
          <StyledSlider
            max={70000000}
            min={50000}
            value={principal}
            onChange={value => setPrincipal(value)}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Down Payment: ₹{downPayment}</Label>
          <StyledSlider
            max={principal - 50000}
            min={0}
            value={downPayment}
            onChange={value => setDownPayment(value)}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Interest Rate (%): {interestRate}%</Label>
          <StyledSlider
            max={15}
            min={1}
            value={interestRate}
            onChange={value => setInterestRate(value)}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Tenure (Years): {years}</Label>
          <StyledSlider
            max={30}
            min={1}
            value={years}
            onChange={value => setYears(value)}
          />
        </InputWrapper>

        <ResultWrapper>
          <p><strong>EMI:</strong> ₹{emi}/month</p>
          <p><strong>Total Amount Payable:</strong> ₹{totalAmountPayable}</p>
          <p><strong>Net Interest Payable:</strong> ₹{netInterestPayable}</p>
          <p><strong>Net Loan Amount:</strong> ₹{netLoanAmount}</p>
        </ResultWrapper>

        <div>
          <ActionButton onClick={handleSavePDF}>Save as PDF</ActionButton>
          <ActionButton onClick={handlePrint}>Print</ActionButton>
        </div>
      </CalculatorWrapper>
    </ThemeProvider>
  );
};

export default EMICalculator;
