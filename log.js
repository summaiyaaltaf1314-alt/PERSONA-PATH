// log.js
import { auth, db, googleProvider } from './firebase.js';

// Single Parameterized Password Toggle Function
function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    if (!passwordField) return;
    const toggleIcon = passwordField.nextElementSibling?.querySelector('i');
    if (!toggleIcon) return;
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Handle File Input Label Change (UI only, no upload due to Storage billing)
const profilePicInput = document.getElementById('profilePic');
if (profilePicInput) {
    profilePicInput.addEventListener('change', function() {
        const fileNameSpan = document.getElementById('fileName');
        if (this.files && this.files.length > 0) {
            fileNameSpan.textContent = this.files[0].name;
        } else {
            fileNameSpan.textContent = 'Choose File...';
        }
    });
}

// Save User Data to Firestore
async function saveUserData(user, firstName, lastName, email) {
    try {
        await db.setDoc(db.doc(db, 'users', user.uid), {
            firstName,
            lastName,
            email,
            profilePic: '', // Use initials later
            createdAt: new Date()
        }, { merge: true });
        console.log('User data saved successfully');
    } catch (error) {
        console.error('Error saving user data:', error);
        alert('Error saving data: ' + error.message);
    }
}

// Signup Logic
const signupBtn = document.querySelector('.signup-btn');
if (signupBtn) {
    signupBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const password = document.getElementById('password')?.value || '';
        const confirmPassword = document.getElementById('confirmPassword')?.value || '';

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return alert('All fields are required');
        }
        if (password !== confirmPassword) {
            return alert('Passwords do not match');
        }

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            await saveUserData(user, firstName, lastName, email);
            alert('Account created! Redirecting to login...');
            window.location.href = 'login.html';
        } catch (error) {
            alert('Error signing up: ' + error.message);
        }
    });
}

// Google Sign-in
const googleBtn = document.querySelector('.google-btn');
if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            const user = result.user;
            const firstName = user.displayName.split(' ')[0] || 'User';
            const lastName = user.displayName.split(' ').slice(1).join(' ') || '';
            await saveUserData(user, firstName, lastName, user.email);
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Error with Google sign-in: ' + error.message);
        }
    });
}

// Login Logic
const loginBtn = document.querySelector('.login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('email')?.value || '';
        const password = document.getElementById('password')?.value || '';
        try {
            await auth.signInWithEmailAndPassword(email, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Error logging in: ' + error.message);
        }
    });
}

// Forgot Password Logic
const sendOtpBtn = document.getElementById('sendOtpBtn');
if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', async () => {
        const email = document.getElementById('emailInput')?.value.trim() || '';
        if (email) {
            try {
                await auth.sendPasswordResetEmail(email);
                alert('Password reset email sent! Check your inbox.');
                window.location.href = 'login.html';
            } catch (error) {
                alert('Error sending reset email: ' + error.message);
            }
        } else {
            alert('Please enter your email.');
        }
    });
}

// Auth State Listener
auth.onAuthStateChanged((user) => {
    if (user) {
        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html') || window.location.pathname.includes('forget.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('assessment.html')) {
            window.location.href = 'login.html';
        }
    }
});