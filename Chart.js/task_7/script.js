    const skills = ['HTML', 'CSS', 'JavaScript', 'PHP', 'Java']; // lables
    const scores = [80, 70, 60, 50, 50]; // data

    const friendScores = [60, 85, 75, 65, 80]; // Giving the friend score's a variable

    const data = { // setup code of chart 
        labels: skills,
        datasets: [
            {
                label: 'My Skills',
                data: scores,
                // Custom styling for the upper first dataset
                borderWidth: 3,   // Thick Line
                pointRadius: 4   // Larger points
            },

            {
                label: "My Friend's Skills",
                data: friendScores,
                // Custom styling for the lower dataset
                borderWidth: 1,
                pointRadius: 2,

                // Dash Effect
                borderDash: [5, 5]
            },
        ],
    }



    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Skill Level",
                        color: '#333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },

                    max: 100    // Forces the Y-axis to end exacty at 100
                }
            },

            plugins: {
                title: {
                    display: true,
                    text: 'Programming Skills Comparison'
                }
            }
        }
    });

    
    // Create function for adding skill
    function addSkill() {
        const skillValue = document.getElementById('skill').value;
        const scoreValue = Number(document.getElementById('score').value);

        // condition so that same skill can't be added
        if (skills.includes(skillValue)) {
            alert('Skill already added');
            return;
        }
        if (skillValue === '') {
            alert('Skill input can not be empty');
            return;
        }

        if (document.getElementById('score').value === '') {
            alert('Score can not be empty.');
            return;
        }
        
        if (scoreValue < 0 || scoreValue > 100) {
            alert('Enter withing range of 0 - 100.');
            return;
        }



        skills.push(skillValue);  // Add same skill for both
        scores.push(scoreValue);  // Add the skill for me

        friendScores.push(70);    // Always add score '70' for friend

        // update the chart
        myChart.update();

        // also make the input values empty again
        document.getElementById('skill').value = '';
        document.getElementById('score').value = '';
        
    }


    // Invoke the function by adding event listener
    const btn = document.getElementById('btn');
    btn.addEventListener('click', addSkill);