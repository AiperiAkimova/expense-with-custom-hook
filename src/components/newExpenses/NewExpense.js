import ExpenseForm from './ExpenseForm';
import classes from './NewExpense.module.css';

const NewExpense = (props) => {
  const addData = (data) => {
    const objectWithId = {
      ...data,
      id: Math.random().toString(),
    };

    props.onAddDataToArray(objectWithId)
  };

  return (
    <div className={classes["new-expense"]}>
      <ExpenseForm onAddData={addData} />
    </div>
  );
};
export default NewExpense;