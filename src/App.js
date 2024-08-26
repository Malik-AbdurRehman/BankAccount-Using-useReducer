import { useReducer } from "react";
import "./App.css";
const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      if (state.balance < 50) {
        return { ...state, balance: state.balance };
      } else
        return {
          ...state,
          balance: state.balance - action.payload,
        };
    case "loanRequest":
      if (state.loan === 0) {
        return {
          ...state,
          balance: state.balance + action.payload,
          loan: state.loan + action.payload,
        };
      } else {
        return {
          ...state,
          loan: state.loan,
        };
      }
    case "payLoan":
      if (state.loan !== 0 && state.loan <= state.balance) {
        return {
          ...state,
          balance: state.balance - action.payload,
          loan: state.loan - action.payload,
        };
      } else {
        return {
          ...state,
          balance: state.balance,
        };
      }
    case "closeAccount":
      if (state.loan === 0 && state.balance === 0) {
        return {
          ...state,
          balance: 0,
          loan: 0,
          isActive: false,
        };
      } else {
        return {
          ...state,
          balance: state.balance,
          loan: state.loan,
          isActive: state.isActive,
        };
      }

    default:
      throw new Error("unknown");
  }
};

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <>
      <div className="center">
        <h1>Use-Reducer Bank Account</h1>
        <p>Balance: {balance}</p>
        <p>Loan: {loan}</p>
        <button
          disabled={isActive}
          onClick={() => dispatch({ type: "openAccount" })}
        >
          Open Account
        </button>
        <br />
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
        >
          Deposit 150
        </button>
        <br />
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
        >
          withdraw 50
        </button>
        <br />
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "loanRequest", payload: 5000 })}
        >
          Request a loan of 5000
        </button>
        <br />
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "payLoan", payload: 5000 })}
        >
          Pay loan
        </button>
        <br />
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "closeAccount" })}
        >
          Close Account
        </button>
      </div>
    </>
  );
}

export default App;
