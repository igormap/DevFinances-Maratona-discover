const Modal = {
  // alternar entre active e não active para abrir/fechar o modal
  openClose() {
    document.querySelector('.modal-overlay').classList.toggle('active')
  }
}

// Lista de objetos da tabela
const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Website',
    amount: 50000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  },
]

const Transaction = {
  // somar as entradas
  incomes() {},

  // somar as saídas
  expenses() {},

  // entradas - saídas
  total() {},
}

// Substituir dados HTML por dados JS
