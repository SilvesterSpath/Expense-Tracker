const balance = document.getElementById('balance');
const money_plus = document.getElementById('money_plus');
const money_minus = document.getElementById('money_minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const number = document.getElementById('number');
const amount = document.getElementById('amount');
const form = document.getElementById('form');
const deleteBtn = document.querySelectorAll('.delete-btn');

console.log(deleteBtn);

/* const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
]; */

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  /*   const newTransaction = {};
  newTransaction['text'] = form.text.value;
  newTransaction.amount = Number(form.amount.value);
  const randomId = Math.floor(Math.random() * 101);
  if (!(randomId in dummyTransactions)) {
    newTransaction.id = randomId;
  } else {
    newTransaction.id = Math.floor(Math.random() * 201) + 101;
  }
  transactions.push(newTransaction);
  console.log(transactions);
  init(); */

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount!');
  } else {
    const newTransaction = {
      id: genId(),
      text: text.value,
      amount: Number(amount.value),
    };
    transactions.push(newTransaction);
    addTransactionToDOM(newTransaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
}

// Generate random id
function genId() {
  return Math.floor(Math.random() * 10100);
}

// Add to transactions to DOM
function addTransactionToDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `${transaction.text}<span>${sign}$${
    transaction.amount < 0
      ? Math.abs(transaction.amount).toFixed(2)
      : transaction.amount.toFixed(2)
  }</span><button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
}

// Update the balance
function updateValues() {
  const amounts = transactions.map((i) => i.amount);
  const total = amounts.reduce((a, i) => a + i, 0).toFixed(2);
  balance.innerHTML = `$${total}`;
  /*   let income = 0;
  let expence = 0;
  amounts.map((i) => (i < 0 ? (expence += Math.abs(i)) : (income += i))); */
  const expence = amounts.filter((i) => i < 0).reduce((a, b) => a + b, 0);
  const income = amounts
    .filter((i) => i > 0)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  money_minus.innerHTML = `-$${Math.abs(expence).toFixed(2)}`;
  money_plus.innerHTML = `+$${income}`;
  console.log(amounts);
}

// Show income and expense
/* function incomeAndExpense(array) {
  let income = 0;
  let expense = 0;
  for (const i of array) {
    i.amount < 0 ? (expense += Math.abs(i.amount)) : (income += i.amount);
  }
  money_minus.innerHTML = `-$${expense}.0`;
  money_plus.innerHTML = `+$${income}.0`;
} */

// Delete element
function removeTransaction(id) {
  transactions = transactions.filter((i) => i.id !== id);
  updateLocalStorage();
  init();
}

// UPdate local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionToDOM);
  /* incomeAndExpense(transactions); */
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
