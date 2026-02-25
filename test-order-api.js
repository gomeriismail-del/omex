// Test script to verify backend API
const testOrder = {
    nameOfProduct: "Test Product",
    priceOfProduct: 100,
    quantity: 1,
    address: "Test Address",
    city: "Test City",
    color: "red",
    status: "pending"
};

fetch('https://dmtart.pro/api/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(testOrder)
})
.then(response => {
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    return response.json();
})
.then(data => {
    console.log('Success:', data);
})
.catch(error => {
    console.error('Error:', error);
});
