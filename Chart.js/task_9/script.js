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
                    data: productPrices,
                    // 1. Background Color
                    backgroundColor: [
                        'rgba(11, 80, 126, 0.4)',
                        'rgba(11, 126, 120, 0.4)',
                        'rgba(11, 126, 47, 0.4)',
                        'rgba(68, 126, 11, 0.4)',
                        'rgba(116, 126, 11, 0.4)'
                    ], 

                    // 2. Border Color
                    borderColor: 'rgb(7, 73, 123)', 

                    // 3. Border Width (in pixels)
                    borderWidth: 2,

                    // 4. Border Radius (in pixels)
                    borderRadius: 8,

            
                }
            ],

            

        };

        // Create chart AFTER API data has arrived
        const ctx = document.getElementById('myChart');

        const myChart = new Chart(ctx, {
            type: 'bar',

            data: chartData,

            options: {
                scales: {
                    // 1. Configure the X-Axis Title
                    x: {
                        title: {
                            display: true,
                            text: 'Products',
                            color: '#333',
                            font: {
                                size: 16,
                                weight: 'bold',
                                family: 'Arial'
                            },
                            padding: { top: 10, bottom: 0 }
                        }
                    },

                    // 2. Configure the Y-Axis Title
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Price ($)',
                            color: '#333',
                            font: {
                                size: 16,
                                weight: 'bold',
                                family: 'Arial'
                            },

                            padding: { top: 0, bottom: 10 }
                        }
                    }
                },

                plugins: {
                    title: {
                        display: true,
                        text: 'Product Price Comparison',
                        position: 'top',
                        color: '#111',
                        font: {
                            size: 20,
                            weight: 'bold',
                            family: 'Arial'
                        },
                        padding: { top: 10, bottom: 30 }
                    },

                    // 2. Tooltip Configuration
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        titleFont: { weight: 'bold' },
                        padding: 10,
                        cornerRadius: 4,
                        
                        callbacks: {
                            title: function(context) {
                                return 'Product: ' + context[0].label;
                            },

                            label: function(context) {
                                return 'Price: $' + context.raw;
                            }
                        }
                        
                    }
                }
            }
        });

        console.log('Chart created');
    });