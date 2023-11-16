document.addEventListener('DOMContentLoaded', function () {
    // Function to render booked services table
    function renderBookedServicesTable() {
        const bookedServicesTable = document.getElementById('bookedServicesTable');
        const tbody = bookedServicesTable.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        // Retrieve booked services data from localStorage
        const bookedServicesData = JSON.parse(localStorage.getItem('formDataArray')) || [];

        // Populate the table with booked services data
        bookedServicesData.forEach((service, index) => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = service.service;
            row.insertCell(1).textContent = service.creditCard;
            row.insertCell(2).textContent = service.cardType;
            row.insertCell(3).textContent = service.name;
            row.insertCell(4).textContent = service.email;
            row.insertCell(5).textContent = service.ipAddress;
            row.insertCell(6).textContent = service.status || 'Inactive';

            // Create buttons
            const actionCell = row.insertCell(7);
            const activateButton = document.createElement('button');
            
            // Set button text based on the status
            if (service.status === 'Active') {
                activateButton.textContent = 'Inactive';
            } else {
                activateButton.textContent = 'Activate';
            }

            activateButton.addEventListener('click', function () {
                // Toggle status between 'Active' and 'Inactive'
                bookedServicesData[index].status = (service.status === 'Active') ? 'Inactive' : 'Active';
                localStorage.setItem('formDataArray', JSON.stringify(bookedServicesData));
                renderBookedServicesTable(); // Update the table
            });
            actionCell.appendChild(activateButton);

            const cancelCell = row.insertCell(8);
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('click', function () {
                // Delete the booking
                bookedServicesData.splice(index, 1);
                localStorage.setItem('formDataArray', JSON.stringify(bookedServicesData));
                renderBookedServicesTable(); // Update the table
            });
            cancelCell.appendChild(cancelButton);
        });
    }

    // Render the booked services table on page load
    renderBookedServicesTable();
});

