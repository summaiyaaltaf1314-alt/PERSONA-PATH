import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

/* -------------------------------------------------
   DOM ELEMENTS
------------------------------------------------- */
const form               = document.getElementById('settingsForm');
const messageContainer   = document.getElementById('messageContainer');
const resetBtn           = document.getElementById('resetBtn');

/* -------------------------------------------------
   DEFAULT VALUES (fallback if nothing in Firestore)
------------------------------------------------- */
const defaultData = {
    firstName: '',
    lastName: '',
    phone: '',
    altEmail: '',
    bio: '',
    city: '',
    country: '',
    dob: '',
    degree: '',
    institution: '',
    graduationYear: ''
};

/* -------------------------------------------------
   GLOBAL USER VARS
------------------------------------------------- */
let currentUser = null;
let userDocRef  = null;

/* -------------------------------------------------
   AUTH STATE → LOAD PROFILE
------------------------------------------------- */
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    currentUser = user;
    userDocRef  = doc(db, 'users', user.uid);

    // ----- show name in header (if you have a header) -----
    // (optional – uncomment if you have #displayName in the page)
    // const nameEl = document.getElementById('displayName');
    // if (nameEl) nameEl.textContent = `${user.displayName || ''}`.trim();

    try {
        const snap = await getDoc(userDocRef);
        const stored = snap.exists() ? snap.data().profile || {} : {};

        // Prefer Firestore data, fall back to Firebase Auth displayName
        const full = stored.firstName && stored.lastName
            ? `${stored.firstName} ${stored.lastName}`
            : (user.displayName || '');

        const [first = '', last = ''] = full.split(' ');
        const finalData = {
            ...defaultData,
            ...stored,
            firstName: stored.firstName || first,
            lastName:  stored.lastName  || last
        };

        populateForm(finalData);
    } catch (e) {
        showMessage('Error loading profile.', 'error');
        console.error(e);
    }

    // Initialise logout after the user is known
    setupLogout();
});

/* -------------------------------------------------
   POPULATE FORM
------------------------------------------------- */
function populateForm(data) {
    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = data[key] || '';
    });
}

/* -------------------------------------------------
   GET FORM DATA
------------------------------------------------- */
function getFormData() {
    const fd = new FormData(form);
    const obj = {};
    for (let [k, v] of fd) obj[k] = v.trim();
    return obj;
}

/* -------------------------------------------------
   SHOW MESSAGE
------------------------------------------------- */
function showMessage(text, type = 'info') {
    messageContainer.innerHTML = `<div class="message ${type}">${text}</div>`;
    setTimeout(() => messageContainer.innerHTML = '', 4000);
}

/* -------------------------------------------------
   VALIDATE REQUIRED FIELDS
------------------------------------------------- */
function validate(data) {
    if (!data.firstName || !data.lastName || !data.phone) {
        return 'Please fill all required fields.';
    }
    return null;
}

/* -------------------------------------------------
   SAVE PROFILE
------------------------------------------------- */
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const data = getFormData();
    const err  = validate(data);
    if (err) return showMessage(err, 'error');

    try {
        await setDoc(userDocRef, { profile: data }, { merge: true });
        showMessage('Profile saved successfully!', 'success');
    } catch (e) {
        showMessage('Failed to save. Try again.', 'error');
        console.error(e);
    }
});

/* -------------------------------------------------
   RESET BUTTON
------------------------------------------------- */
resetBtn.addEventListener('click', () => {
    populateForm(defaultData);
    showMessage('Form reset.', 'info');
});

/* -------------------------------------------------
   LOGOUT FUNCTION (your code – now called automatically)
------------------------------------------------- */
function setupLogout() {
    const logoutElements = document.querySelectorAll('.logout, .dropdown-content a[href="#logout"]');
    if (logoutElements.length === 0) {
        console.warn('Logout elements not found. Check HTML for .logout or .dropdown-content a[href="#logout"].');
        return;
    }

    logoutElements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                signOut(auth).then(() => {
                    alert('You have been logged out successfully.');
                    window.location.href = 'login.html';
                }).catch(err => {
                    console.error('Logout error:', err);
                    alert('Logout failed. Try again.');
                });
            }
        });
    });
}

/* -------------------------------------------------
   SIDEBAR & MENU (same as your dd.js)
------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const sidebar            = document.getElementById('sidebar');
    const mobileHamburger    = document.getElementById('hamburger-menu-mobile');
    const desktopHamburger   = document.getElementById('hamburger-menu-desktop');
    const closeSidebar       = document.getElementById('close-sidebar');
    const dashboardContainer = document.querySelector('.dashboard-container');

    // Mobile
    mobileHamburger?.addEventListener('click', e => {
        if (window.innerWidth < 1024) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            const active = sidebar.classList.contains('active');
            dashboardContainer.classList.toggle('sidebar-open', active);
            dashboardContainer.classList.toggle('overlay-active', active);
        }
    });

    // Desktop
    desktopHamburger?.addEventListener('click', e => {
        if (window.innerWidth >= 1024) {
            e.stopPropagation();
            sidebar.classList.toggle('hidden');
            document.getElementById('main-content').classList.toggle('expanded');
        }
    });

    // Close button
    closeSidebar?.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            sidebar.classList.remove('active');
            dashboardContainer.classList.remove('sidebar-open');
            dashboardContainer.classList.remove('overlay-active');
        }
    });

    // Click outside
    dashboardContainer?.addEventListener('click', e => {
        if (e.target === dashboardContainer && window.innerWidth < 1024 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            dashboardContainer.classList.remove('sidebar-open');
            dashboardContainer.classList.remove('overlay-active');
        }
    });

    // Menu active state
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
            const a = this.querySelector('a');
            if (a?.href) window.location.href = a.href;
        });
    });

    // Highlight current page
    const cur = window.location.pathname.split('/').pop() || 'settings.html';
    menuItems.forEach(item => {
        const a = item.querySelector('a');
        if (a && a.getAttribute('href') === cur) {
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
        }
    });
});