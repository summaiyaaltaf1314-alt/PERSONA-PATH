import { 
    auth, 
    db, 
    storage, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    ref, 
    uploadBytes, 
    getDownloadURL, 
    doc, 
    setDoc,
} from './firebase.js';

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

// Handle File Input Label Change
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

// Save User Data to Firestore (including assessment data)
async function saveUserData(user, firstName, lastName, email, profilePic = null) {
    let profileUrl = '';
    try {
        if (profilePic) {
            const storageReference = ref(storage, `profiles/${user.uid}`);
            await uploadBytes(storageReference, profilePic);
            profileUrl = await getDownloadURL(storageReference);
        }
    } catch (storageError) {
        console.warn('Profile picture upload failed, skipping URL:', storageError.message);
    }

    // Retrieve and merge assessment data from localStorage
    const storedAssessmentData = localStorage.getItem('assessmentData');
    const assessmentData = storedAssessmentData ? JSON.parse(storedAssessmentData) : {};

    try {
        await setDoc(doc(db, 'users', user.uid), {
            firstName,
            lastName,
            email,
            profileUrl: profileUrl || '',
            assessmentData: assessmentData, // Include assessment data directly
            createdAt: new Date().toISOString()
        }, { merge: true });
        console.log('User data and assessment data saved to Firestore:', user.uid);
        if (storedAssessmentData) localStorage.removeItem('assessmentData'); // Clear after successful save
    } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        alert('Error saving user data: ' + firestoreError.message);
        throw firestoreError;
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
        const profilePic = document.getElementById('profilePic')?.files[0];

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return alert('All fields are required');
        }
        if (password !== confirmPassword) {
            return alert('Passwords do not match');
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await saveUserData(user, firstName, lastName, email, profilePic);
            alert('Account created successfully!');
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
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
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
    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email')?.value || '';
        const password = document.getElementById('password')?.value || '';
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Error logging in: ' + error.message);
        }
    });
}

// Forgot Password Logic
const sendResetBtn = document.getElementById('sendResetBtn');
if (sendResetBtn) {
    sendResetBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('emailInput')?.value.trim() || '';
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                alert('Password reset email sent! Check your inbox for the link.');
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
onAuthStateChanged(auth, (user) => {
    if (user) {
        // No redirect from login/signup/forget
    } else {
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'login.html';
        }
    }
});