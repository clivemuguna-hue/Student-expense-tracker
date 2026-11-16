
// 1. Get HTML elements

const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.getElementById("expenses");

const budgetDisplay = document.getElementById("budget");
const balanceDisplay = document.getElementById("balance");
const totalExpenseDisplay = document.getElementById("total-expenses");


// 2. Set initial budget

const budget = Number(
    budgetDisplay.textContent.replace(/[^0-9.]/g, "")
);

let expenses = [];


// 3. Update dashboard

function updateDashboard() {

    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount, 0
    );

    const balance = budget - totalExpenses;

    balanceDisplay.textContent =
        "KSh " + balance.toLocaleString();

    totalExpenseDisplay.textContent =
        "KSh " + totalExpenses.toLocaleString();

    budgetDisplay.textContent =
        "KSh " + budget.toLocaleString();
}


// 4. Display expenses

function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(function(expense) {

        const li = document.createElement("li");

        li.textContent =
            expense.name + " - KSh " +
            expense.amount.toLocaleString();

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });

            displayExpenses();
            updateDashboard();

        });

        li.appendChild(deleteButton);

        expenseList.appendChild(li);

    });

}


// 5. Add new expense

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newName = expenseName.value.trim();

    const amount = Number(expenseAmount.value);

    if (
        newName === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        alert("Please enter a valid expense name and amount.");

        return;
    }

    const newExpense = {
        id: Date.now(),
        name: newName,
        amount: amount
    };

    expenses.push(newExpense);

    displayExpenses();

    updateDashboard();

    expenseForm.reset();

});


// 6. Initialize dashboard

updateDashboard();
