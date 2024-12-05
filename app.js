const sidebar = document.getElementById('history-sidebar');
const toggleHistory = document.getElementById('toggle-history');
const closeHistory = document.getElementById('close-history');

toggleHistory.addEventListener('click', () => {
    console.log('Bouton ouvrir cliqué');
    sidebar.classList.add('active');
});

closeHistory.addEventListener('click', () => {
    console.log('Bouton fermer cliqué');
    sidebar.classList.remove('active');
});