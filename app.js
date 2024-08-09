window.Telegram.WebApp.ready();

window.onload = function() {
    // Access user information
    const user = window.Telegram.WebApp.initDataUnsafe;
    const userId = user?.user?.id;
    const username = user?.user?.username || "Username";

    // Display the username
    document.getElementById('username').textContent = username;

    // Fetch user-specific data from your server
    fetch(`https://exquisitev2.urbanson.tech/data/${userId}`)
        .then(response => response.json())
        .then(data => {
            const points = data.points || 0;
            const tasksDone = data.tasksDone || 0;

            document.getElementById('points').textContent = points;
            document.getElementById('tasksDone').textContent = tasksDone;
        });

    // Handle task completion
    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = this.getAttribute('data-task');
            const taskElement = document.getElementById(taskId);

            if (!taskElement.classList.contains('completed')) {
                // Update task status
                let points = parseInt(document.getElementById('points').textContent);
                let tasksDone = parseInt(document.getElementById('tasksDone').textContent);

                points += 10;
                tasksDone += 1;
                taskElement.classList.add('completed');
                this.textContent = 'Completed';
                document.getElementById('points').textContent = points;
                document.getElementById('tasksDone').textContent = tasksDone;

                // Send updated data to server
                sendDataToServer(userId, points, tasksDone);
            }
        });
    });
};

function sendDataToServer(userId, points, tasksDone) {
    fetch('https://exquisitev2.urbanson.tech/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, points, tasksDone })
    });
}
