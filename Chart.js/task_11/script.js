console.log("Before fetch");

// fetch the json data
fetch("https://dummyjson.com/products?limit=10")
    .then(response => response.json())
    .then(data => {
        
        const products = data.products;

        const productNames = products.map(product => product.title);
        const productPrices = products.map(product => product.price);
        const productRatings = products.map(product => product.rating);

        const categories = products.map(product => product.category);
        const uniqueCategories = [...new Set(categories)];
        const categoryCounts = {};

        products.forEach(product => {
            if (categoryCounts[product.category]) {
                categoryCounts[product.category]++;
            } else {
                categoryCounts[product.category] = 1;
            }
        });
        console.log(categoryCounts);

        const categoryLabels = uniqueCategories;

        const categoryData = uniqueCategories.map(category => {
            return categoryCounts[category];
        })

        console.log(categoryLabels);
        console.log(categoryData);

        const ctx = document.getElementById('categoryChart');
        const mixedctx = document.getElementById('mixedChart');

        const categoryChart = new Chart(ctx, {
            type: 'pie',

            data: {
                labels: categoryLabels,

                datasets: [
                    {
                        label: 'Products',
                        data: categoryData
                    }
                ]
            }
        });

        const mixedChart = new Chart(mixedctx, {
            data: {
                labels: productNames,

                datasets: [
                    {
                        type: 'bar',
                        label: 'Price',
                        data: productPrices
                    },

                    {
                        type: 'line',
                        label: 'Rating',
                        data: productRatings
                    }
                ]
            }
        })
    })