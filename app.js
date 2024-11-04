// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize Telegram Web App
Telegram.WebApp.ready();

// Get Telegram user information
const telegramUser = Telegram.WebApp.initDataUnsafe.user;

if (telegramUser) {
    const userId = telegramUser.id;
    const username = telegramUser.username;

    // Display welcome message
    document.getElementById("welcomeMessage").innerText = `Welcome, ${username}!`;

    // Retrieve or create user profile in Firebase Firestore
    const userRef = db.collection("users").doc(userId.toString());

    userRef.get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            document.getElementById("userPoints").innerText = userData.points || 0;
        } else {
            // Create a new user profile if it doesn't exist
            userRef.set({
                username: username,
                points: 0,
                tasks: {
                    "task-1": { status: "Pending", link: "" }
                }
            });
        }
    }).catch((error) => {
        console.error("Error getting user data:", error);
    });
}

// Function to handle task submission
function submitTask(taskId, inputId) {
    const taskLink = document.getElementById(inputId).value;
    const userRef = db.collection("users").doc(telegramUser.id.toString());

    if (taskLink) {
        userRef.update({
            [`tasks.${taskId}.link`]: taskLink,
            [`tasks.${taskId}.status`]: "On review"
        }).then(() => {
            document.getElementById(inputId).disabled = true;
            document.querySelector(`#${taskId} button`).innerText = "On review";
        }).catch((error) => {
            console.error("Error updating task:", error);
        });
    }
}
