console.log("Dashboard started");


// References to the html element we want to modify 
const status = document.getElementById('status');

const productCount = document.getElementById('productCount');
const averagePrice = document.getElementById('averagePrice');
const averageRating = document.getElementById('averageRating');

const categorySelect = document.getElementById('category');

const priceCanvas = document.getElementById('priceChart');
const categoryCanvas = document.getElementById('categoryChart');

// Fetching the JSON data of the products
fetch('https://dummyjson.com/products?limit=10')
    .then(response => response.json())
    .then(data => {
        // stored the products
        const products = data.products;

        // Get all product prices
        const prices = products.map(product => product.price)
        console.log(prices);
        
        // Add all product prices together
        const totalPrice = prices.reduce((total, price) => {
            return total + price;
        }, 0)

        // Get all product ratings
        const ratings = products.map(product => product.rating);

        // Calculate the average product price
        const avgPrice = totalPrice / products.length;

        console.log(avgPrice);


        // Add all ratings together
        const totalRating = ratings.reduce((total, rating) => {
            return total + rating;
        }, 0);

        // Calculate the average Rating
        const avgRating = totalRating / products.length;

        // Display products count
        productCount.textContent = products.length; 

        // Display average Price with 2 decimal places
        averagePrice.textContent = '$' + avgPrice.toFixed(2);

        // Display the average Rating with 2 decimal places
        averageRating.textContent = avgRating.toFixed(2);



        console.log(data);

        status.textContent = 'Products loaded Successfully';



        // Get product names for the x-axis
        const productNames = products.map(product => product.title);

        // Get product prices for the bars
        const productPrices = products.map(product => product.price);

        const priceChart = new Chart(priceCanvas, {
            type: 'bar',

            data: {
                labels: productNames,

                datasets: [
                    {
                        label: 'Product Price',
                        data: productPrices,

                        borderRadius: 8,

                        borderWidth: 2
                    }
                ]
            },

            // Chart Configuration
            options: {
                // Configure the axes

                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Products'
                        }
                    },

                    y: {
                        beginAtZero: true,

                        title: {
                            display: true,
                            text: 'Price ($)'
                        }
                    }
                },

                // Chart Plugins
                plugins: {

                    // Chart title
                    title: {
                        display: true,
                        text: 'Product Price Comparison'
                    },

                    // Tooltip Configuration
                    tooltip: {
                        callbacks: {

                            // Change the tooltip title
                            title: function(context) {
                                return 'Product: ' + context[0].label;
                            },

                            // Change the tooltip value
                            label: function(context) {
                                return 'Price: $' + context.raw;
                            }
                        }
                    }
                }
            }
        });

        categorySelect.addEventListener('change', function () {

            // Get the category selected by the user
            const selectedCategory = categorySelect.value;

            let filteredProducts;

            if (selectedCategory === 'all') {
                // Show all products
                filteredProducts = products;
            } else {
                // Keep only products belonging to the selected category
                filteredProducts = products.filter(product => {
                    return product.category === selectedCategory;
                })
            }

            console.log(filteredProducts);

            // Get the names of the filtered products
            const filteredNames = filteredProducts.map(product => product.title);

            // Get the prices of the filtered products
            const filteredPrices = filteredProducts.map(product => product.price);
            console.log(filteredNames);
            console.log(filteredPrices);

            // Replace the chart's product names
            priceChart.data.labels = filteredNames;

            // Replace the chart's product prices
            priceChart.data.datasets[0].data = filteredPrices;

            // Tell chart.js to redraw the chart
            priceChart.update();

            console.log('Selected Category: ', selectedCategory);
        })
        

        


        // Get the category of every product
        const categories = products.map(product => product.category);

        // Remove duplicate categories
        const uniqueCategories = [...new Set(categories)];

        // Add each unique category to the dropdown
        uniqueCategories.forEach(category => {
            
            // Create a new <option>
            const option = document.createElement('option');

            // The value will be the category name
            option.value = category;

            // the text the user sees
            option.textContent = category;

            // Add the option to the dropdown
            categorySelect.appendChild(option);
        })

        // Object that will store the number of products
        // belonging to each category

        const categoryCounts = {};

        products.forEach(product => {
            if (categoryCounts[product.category]) {
                

                // Category alrady exists, so increase its count
                categoryCounts[product.category]++;
            } else {

                // First product belonging to this category
                categoryCounts[product.category] = 1;
            }
        });

        // Category names will become the chart labels
        const categoryLabels = uniqueCategories;

        // Get the number of products for each category
        const categoryData = uniqueCategories.map(category => {
            return categoryCounts[category];
        });


        // Create the doughnut Chart
        const categoryChart = new Chart (categoryCanvas, {
            type: 'doughnut',

            data: {

                labels: categoryLabels,

                datasets: [
                    {
                        label: 'Products',
                        data: categoryData
                    }
                ]
            },

            options: {
                plugins: {

                    // Display a title above the chart
                    title: {
                        display: true,
                        text: 'Products by Category'
                    },

                    // Show Category and quantity in the tooltip
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ": " + context.raw + ' products';
                            }
                        }
                    }
                }
            }
        })

    })
    .catch(error => {
        // Show the error in the browser console
        console.error('Error fetching products: ', error);

        // Tell the user that the products could not be loaded
        status.textContent = 'Failed to load products.';
    })

