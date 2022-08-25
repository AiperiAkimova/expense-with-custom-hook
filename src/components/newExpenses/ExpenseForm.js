import React from "react";
import "./ExpenseForm.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../hooks/useFeth";

function ExpenseForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    console.log(enteredTitle);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const { error, sendRequest: sendExpenses } = useFetch();

  //applydata

  const createExpense = (expenseDate, data) => {
    const generatedId = data.name;
    const createdExpense = { id: generatedId, expenseDate };

    if (data.ok) {
      toast.success("Uspeshno dobavleno", {
        position: "top-center",
        theme: "dark",
        autoClose: 1000,
      });
    }

    props.onAddData(createdExpense);
  };

  //config
  const submitHandler = async (event, expenseDate) => {
    event.preventDefault();

    sendExpenses(
      {
        url: "https://tasks-af66b-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          title: enteredTitle,
          amount: enteredAmount,
          date: new Date(enteredDate),
        },
        
      },
      createExpense.bind(null, expenseDate)
    );

    // console.log(enteredTitle, enteredAmount, enteredDate);
    //     const expenseDate = {
    //       title: enteredTitle,
    //       amount: enteredAmount,
    //       date: new Date(enteredDate),
    //     };
    //     const response = await fetch(
    //       "https://tasks-af66b-default-rtdb.firebaseio.com/tasks.json",
    //       {
    //         method: "POST",
    //         body: JSON.stringify(expenseDate),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     if (response.ok) {
    //       toast.success("Uspeshno dobavleno", {
    //         position: "top-center",
    //         theme: "dark",
    //         autoClose: 1000,
    //       });
    //     }
    //     // console.log(expenseDate);
    // const data = await response.json()
    // const generatedId = data.name
    // const createdExpense = {id: generatedId, expenseDate}
    // props.onAddData(createdExpense)
    //     // props.onAddData(expenseDate)

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amout</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2022-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button>Add Expense</button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}

export default ExpenseForm;
