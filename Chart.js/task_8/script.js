const productNames = [];
const productPrices = [];

console.log('Before fetch');

fetch('https://dummyjson.com/products?limit=5')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        data.products.forEach(product => {
            productNames.push(product.title);
            productPrices.push(product.price);
        });

        console.log('API arrays:');
        console.log(productNames);
        console.log(productPrices);

        // Create chart data AFTER API data has arrived
        const chartData = {
            labels: productNames,
            datasets: [
                {
                    label: 'Product Prices',
                    data: productPrices
                }
            ]
        };

        // Create chart AFTER API data has arrived
        const ctx = document.getElementById('myChart');

        const myChart = new Chart(ctx, {
            type: 'bar',

            data: chartData,

            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Price'
                        }
                    }
                },

                plugins: {
                    title: {
                        display: true,
                        text: 'Product Prices'
                    }
                }
            }
        });

        console.log('Chart created');
    });