

document.addEventListener('DOMContentLoaded', function () {


  const allRecipes = getRecipes();
 const totalUsers = getUsers();
  const addedRecipes = allRecipes.filter(r => r.id > 20);
   

  
  document.getElementById('stat-total').innerHTML = '<h3>Total Recipes</h3><p><strong>' + allRecipes.length + '</strong></p>';
  document.getElementById('stat-appetizers').innerHTML = '<h3>Appetizers</h3><p><strong>' + allRecipes.filter(r => r.course === 'appetizer').length + '</strong></p>';
  document.getElementById('stat-mains').innerHTML = '<h3>Main Courses</h3><p><strong>' + allRecipes.filter(r => r.course === 'main-course' || r.course === 'main course').length + '</strong></p>';
  document.getElementById('stat-desserts').innerHTML = '<h3>Desserts</h3><p><strong>' + allRecipes.filter(r => r.course === 'dessert').length + '</strong></p>';
  document.getElementById('stat-users').innerHTML = '<h3>Total Users</h3><p><strong>' + totalUsers.length + '</strong></p>';

  
  function renderTable(list) {
    const tbody = document.getElementById('recipesTableBody');
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#a0a0a0;">No recipes added yet</td></tr>';
      return;
    }

    list.forEach(r => {
      const date = new Date(r.id).toLocaleDateString('en-GB');
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="checkbox"></td>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${r.course || r.type || 'N/A'}</td>
        <td>${date}</td>
        <td>Published</td>
        <td>
          <a href="edit_recipe.html?id=${r.id}">Edit</a> | 
          <a href="#" class="delete-btn" data-id="${r.id}">Delete</a>
        </td>
      `;
      tbody.appendChild(tr);
    });

    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const id = parseInt(this.dataset.id);
        if (confirm('Are you sure you want to delete this recipe?')) {
          const updated = allRecipes.filter(r => r.id !== id);
          localStorage.setItem('recipes', JSON.stringify(updated));
          alert('🗑️ Recipe deleted!');
          location.reload();
        }
      });
    });
  }

  renderTable(addedRecipes);

  
  document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = this.querySelector('input').value.toLowerCase();
    const filtered = addedRecipes.filter(r => r.name.toLowerCase().includes(query));
    renderTable(filtered);
  });

});