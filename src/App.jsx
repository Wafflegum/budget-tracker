import { useEffect, useState } from 'react'

import './App.css'
import BudgetCard from './assets/Components/BudgetCard/BudgetCard'
import './assets/Components/BudgetCard/BudgetCard'
import Expense from './assets/Components/Expense/Expense'
function App() {
	const [totalExpenses, setTotalExpenses] = useState(0)
	const [expensesData, setExpensesData] = useState([])
	const [budget, setBudget] = useState(0)

	const [newExpense, setNewExpense] = useState({})

	function SetBudget(amount) {
		setBudget(parseFloat(amount))
	}

	function LoadExpenses() {
		const storedExpenses = localStorage.getItem('expenses')

		if (storedExpenses != null) {
			const jsonExpenseData = JSON.parse(storedExpenses)
			setExpensesData(jsonExpenseData)
		}
	}
	useEffect(() => {
		LoadExpenses()
	}, [])

	function CalculateTotalExpenses(data) {
		setTotalExpenses(data.reduce((total, expense) => total + parseFloat(expense.amount), 0))
	}

	function handleDeleteExpense(id) {
		const updatedExpenseList = expensesData.filter((expense) => expense.id !== id)
		setExpensesData(updatedExpenseList)
		CalculateTotalExpenses(updatedExpenseList)
	}

	function CreateNewExpense() {
		const newExpense = { id: crypto.randomUUID(), name: '', amount: '' }

		setExpensesData((prevExpenses) => [...prevExpenses, newExpense])

		setNewExpense(null)
	}

	function handleEditExpense(id, name, amount) {
		setExpensesData((prevExpensesData) => {
			const updatedExpenseList = prevExpensesData.map((expense) => {
				return expense.id === id ? { ...expense, name, amount } : expense
			})
			CalculateTotalExpenses(updatedExpenseList)

			const jsonExpenseData = JSON.stringify(updatedExpenseList)
			localStorage.setItem('expenses', jsonExpenseData)
			return updatedExpenseList
		})

		// if (expensesData.find((expense) => expense.id === id)) {
		// 	let expense = expensesData.find((expense) => expense.id === id)
		// 	expense.name = name
		// 	expense.amount = amount
		// }
	}

	return (
		<main>
			<h1>Budget Tracker</h1>
			<div className="budget-container">
				<BudgetCard title={'Total Budget'} value={'15,000'} EditBudget={SetBudget} />
				<BudgetCard title={'Total Expenses'} value={totalExpenses} />
				<BudgetCard title={'Remaining Budget'} value={'15,000'} />
			</div>

			<div className="expense-list-container">
				<header>
					<button id="addExpense" onClick={CreateNewExpense}>
						Add Expense
					</button>
				</header>

				{expensesData
					? expensesData.map((expense) => {
							return (
								<Expense
									key={expense.id}
									id={expense.id}
									name={expense.name}
									amount={expense.amount}
									categories={expense.categories}
									EditExpense={handleEditExpense}
									DeleteExpense={handleDeleteExpense}
								/>
							)
					  })
					: ''}
			</div>
		</main>
	)
}

export default App
