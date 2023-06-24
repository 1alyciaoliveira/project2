// Function to open the modal
function openModalNewGoal() {
		// Add is-active class on the modal
	document.getElementById("add-new-goal").classList.add("is-active");
}
	
// Function to close the modal
function closeModalNewGoal() {
	document.getElementById("add-new-goal").classList.remove("is-active");
}
	
// Add event listeners to close the modal
// whenever user click outside modal
document.querySelectorAll(".modal-background")
.forEach(($el) => {
			const $modal = $el.closest(".modal");
			$el.addEventListener("click", () => {
			
			// Remove the is-active class from the modal
			$modal.classList.remove("is-active");
		});
});


const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#profile-goal').value.trim();
  const target_quantity = document.querySelector('#target-quantity').value.trim();
  const description = document.querySelector('#profile-description').value.trim();
  
  if (name && target_quantity && description) {
    const response = await fetch(`/api/objective`, {
      method: 'POST',
      body: JSON.stringify({ name, target_quantity, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create this objective');
    }
  }
};

document.querySelector('#add-new-goal').addEventListener('click', newFormHandler);

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/objective/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      alert('Objective deleted');
      document.location.replace('/profile');
    } else {
      alert(data.message || 'Failed to delete objective');
    }
  }
};

document.querySelector('#table').addEventListener('click', delButtonHandler);