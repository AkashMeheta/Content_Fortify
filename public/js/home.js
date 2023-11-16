document.addEventListener('DOMContentLoaded', function () {
    const openPopupButton = document.getElementById('openPopup');
    const closePopupButton = document.getElementById('closePopup');
    const popupForm = document.getElementById('popupForm');

    openPopupButton.addEventListener('click', function () {
        popupForm.style.display = 'flex';
    });

    closePopupButton.addEventListener('click', function () {
        popupForm.style.display = 'none';
    });

    // Close the popup if the overlay is clicked
    window.addEventListener('click', function (event) {
        if (event.target === popupForm) {
            popupForm.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const openPopupButton = document.getElementById('openPopup');
    const closePopupButton = document.getElementById('closePopup');
    const popupForm = document.getElementById('popupForm');
    const submitFormButton = document.getElementById('submitForm');

    const paymentPopup = document.getElementById('paymentPopup');
    const closePaymentPopupButton = document.getElementById('closePaymentPopup');
    const paymentForm = document.getElementById('paymentForm');
    const paymentAmountElement = document.getElementById('paymentAmount');
    const payButton = document.getElementById('payButton');

    openPopupButton.addEventListener('click', function () {
        popupForm.style.display = 'flex';
    });

    closePopupButton.addEventListener('click', function () {
        popupForm.style.display = 'none';
    });

    closePaymentPopupButton.addEventListener('click', function () {
        paymentPopup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === popupForm) {
            popupForm.style.display = 'none';
        }
    });

    submitFormButton.addEventListener('click', function () {
        // Get values from the form
        const service = document.getElementById('service').value;
        const creditCard = document.getElementById('creditCard').value;
        const cardType = document.getElementById('cardType').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const ipAddress = document.getElementById('ipAddress').value;

        // Retrieve existing form data from localStorage
        const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

        // Save the current form data to the array
        const formData = {
            service,
            creditCard,
            cardType,
            name,
            email,
            ipAddress,
        };
        formDataArray.push(formData);

        // Save the updated array back to localStorage
        localStorage.setItem('formDataArray', JSON.stringify(formDataArray));

        // Determine the payment amount based on the selected service
        let paymentAmount;
        switch (service) {
            case 'pro':
                paymentAmount = 1000;
                break;
            case 'standard':
                paymentAmount = 750;
                break;
            case 'basic':
                paymentAmount = 500;
                break;
            default:
                paymentAmount = 0;
        }

        // Display the payment popup with the calculated amount
        paymentAmountElement.textContent = `Rs ${paymentAmount}`;
        paymentPopup.style.display = 'flex';
    });

    // // Handle payment logic
    // payButton.addEventListener('click', function () {
    //     // Get the selected payment method
    //     const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        
    //     if (selectedPaymentMethod) {
    //         const paymentMethod = selectedPaymentMethod.value;

    //         // Perform payment processing logic (you can customize this part based on your needs)

    //         // Display a confirmation or success message
    //         alert(`Payment successful! Method: ${paymentMethod}`);
    //     } else {
    //         // Display an error message if no payment method is selected
    //         alert('Please select a payment method.');
    //     }

    //     // Close the payment popup after processing
    //     paymentPopup.style.display = 'none';
    // });

    // (Previous code)

     // Function to render booked services table
     function renderBookedServicesTable() {
        const bookedServicesTable = document.getElementById('bookedServicesTable');
        const tbody = bookedServicesTable.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        // Retrieve booked services data from localStorage
        const bookedServicesData = JSON.parse(localStorage.getItem('formDataArray')) || [];

        // Populate the table with booked services data
        bookedServicesData.forEach(service => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = service.service;
            row.insertCell(1).textContent = service.creditCard;
            row.insertCell(2).textContent = service.cardType;
            row.insertCell(3).textContent = service.name;
            row.insertCell(4).textContent = service.email;
            row.insertCell(5).textContent = service.ipAddress;
            row.insertCell(6).textContent = service.status || 'Inactive';
        });
    }

    // Render the booked services table on page load
    renderBookedServicesTable();

    // Handle payment logic
    payButton.addEventListener('click', function () {
        // Get the selected payment method
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

        if (selectedPaymentMethod) {
            const paymentMethod = selectedPaymentMethod.value;

            // Perform payment processing logic (you can customize this part based on your needs)

            // Display a confirmation or success message
            // alert(`Payment successful! Method: ${paymentMethod}`);

            // Update the status of booked services to "Active"
            const bookedServicesData = JSON.parse(localStorage.getItem('formDataArray')) || [];
            bookedServicesData.forEach(service => {
                service.status = 'Inactive';
            });

            // Save the updated booked services data back to localStorage
            localStorage.setItem('formDataArray', JSON.stringify(bookedServicesData));

            // Render the booked services table
            renderBookedServicesTable();

            // Make the booked services section visible
            const bookedServicesSection = document.getElementById('bookedServicesSection');
            bookedServicesSection.style.display = 'block';
        } else {
            // Display an error message if no payment method is selected
            alert('Please select a payment method.');
        }

        // Close the payment popup after processing
        paymentPopup.style.display = 'none';
    });
});


