import Expenses from "./components/expenses/Expenses";
import NewExpense from "./components/newExpenses/NewExpense";
import React, { useCallback, useEffect,useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "./hooks/useFeth";

const BASE_URL ="https://tasks-af66b-default-rtdb.firebaseio.com"

function App() {
  const [expenses, setExpenses] = useState([]);
  const {error, sendRequest: fetchExpenseHandler} = useFetch()

 
  
  const transformExpense = useCallback((expenseObj) =>{
    const expenseDate = [];
  
    for (const key in expenseObj) {
      expenseDate.push({
        id: key,
        title: expenseObj[key].title,
        amount: expenseObj[key].amount,
        date: new Date(expenseObj[key].date),
      });
    }

    setExpenses(expenseDate);
  }, [])

  //
  useEffect(()=>{
    fetchExpenseHandler({
      url: `${BASE_URL}/tasks.json`
    },transformExpense)
  },[fetchExpenseHandler, transformExpense])
  
const expenseAddHandler = (expenses) =>{
  setExpenses((prevState)=>prevState.concat(expenses) )
}
  const notify = () => {
    toast.promise(
      fetchExpenseHandler,
      {
        pending: "Fetching...",
        success: "Loaded",
        error: "error",
      },
      { autoClose: 1000, theme: "dark" }
    );
  };

  let content = <p>No Expenses found! Click the button at the top ⬆️</p>;

  if (expenses.length > 0) {
    content = <Expenses expenses={expenses} error={error} />;
  }
  return (
    <div className="content">
      <ToastContainer />
      <NewExpense onAddDataToArray={expenseAddHandler}/>
      <button className="btn" onClick={notify}>Show Expenses</button>
      {content}
    </div>
  );
}

export default App;
