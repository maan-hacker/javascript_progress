const productNames = [];
const productPrices = [];
// Adding products
let products = [];
// geting the dropdown node 
const categorySelect = document.getElementById('category');
// declaring the myChart
let myChart;

// Filtered Names and Prices
let filteredNames, filteredPrices;



console.log('Before fetch');


// fetching data from the api
fetch('https://dummyjson.com/products?limit=10')
    .then(response => response.json())
    .then(data => {
        // Storing Products
        products = data.products;


        const categories = products.map(product => product.category);

        // Creating set of categories
        const uniqueCategories = [...new Set(categories)];

        data.products.forEach(product => {
            productNames.push(product.title);
            productPrices.push(product.price);
        });

        // putting api categories in the dropdown
        uniqueCategories.forEach(category => {
            const option = document.createElement('option');

            option.value = category;
            option.textContent = category;

            categorySelect.appendChild(option);
        })





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

        myChart = new Chart(ctx, {
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

        categorySelect.addEventListener('change', function() {
    const selectedCategory = categorySelect.value;

    

    let filteredProducts;

    if (selectedCategory === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => {
            return product.category === selectedCategory;
        })
    }

    filteredNames = filteredProducts.map(product => {
        return product.title;
    });
    filteredPrices = filteredProducts.map(product => product.price);

    myChart.data.labels = filteredNames;
    myChart.data.datasets[0].data = filteredPrices;

    myChart.update();
})

        console.log('Chart created');


    });



