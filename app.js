// Références
const sidebar = document.getElementById('history-sidebar');
const toggleHistory = document.getElementById('toggle-history');
const closeHistory = document.getElementById('close-history');
const historyList = document.getElementById('history-list');

// Bouton pour afficher la barre latérale
toggleHistory.addEventListener('click', () => {
    sidebar.classList.add('active');
});

// Bouton pour fermer la barre latérale
closeHistory.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Fonction pour ajouter un calcul à l'historique
function addToHistory(operation, result) {
    const entry = document.createElement('p');
    entry.textContent = `${operation} = ${result}`;
    historyList.appendChild(entry);
}