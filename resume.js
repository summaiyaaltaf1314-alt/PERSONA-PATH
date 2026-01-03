// resume.js - FULLY WORKING - ONLY X-ICON FIXED (RED, NO BG, TOP-RIGHT, SMALL)
import { auth, db, onAuthStateChanged } from './firebase.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

let resumeData = {
    fullName: '', email: '', phone: '', linkedin: '', github: '', address: '',
    education: [{ id: 'default', qualification: '', institute: '', startDate: '', endDate: '', grade: '' }],
    experience: [{ id: 'default', title: '', company: '', startDate: '', endDate: '', description: '' }],
    projects: [{ id: 'default', title: '', link: '', description: '' }],
    skills: [{ id: 'default', name: '', level: 'Intermediate' }],
    references: [{ id: 'default', name: '', contact: '' }]
};

let currentStep = 1;
let currentTemplate = 'modern-purple';

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        alert('Please log in.');
        window.location.href = 'login.html';
        return;
    }

    const userNameEl = document.getElementById('user-name');
    const userAvatarEl = document.getElementById('user-avatar');
    const displayName = user.displayName || user.email?.split('@')[0] || 'User';
    const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    if (userNameEl) userNameEl.textContent = displayName;
    if (userAvatarEl) {
        userAvatarEl.textContent = initials;
        userAvatarEl.style.backgroundColor = '#8c52ff';
        userAvatarEl.style.color = '#fff';
        userAvatarEl.style.borderRadius = '50%';
        userAvatarEl.style.width = '40px';
        userAvatarEl.style.height = '40px';
        userAvatarEl.style.display = 'flex';
        userAvatarEl.style.alignItems = 'center';
        userAvatarEl.style.justifyContent = 'center';
        userAvatarEl.style.fontWeight = 'bold';
        userAvatarEl.style.fontSize = '14px';
    }

    const userDocRef = doc(db, 'users', user.uid);
    try {
        const snap = await getDoc(userDocRef);
        if (snap.exists() && snap.data().resumeData) {
            resumeData = { ...resumeData, ...snap.data().resumeData };
        }
    } catch (e) { console.error('Load error:', e); }

    window.resumeData = resumeData;
    initResume(userDocRef);
});

function initResume(userDocRef) {
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const steps = document.querySelectorAll('.step');
    const stepItems = document.querySelectorAll('.step-item');
    const stepLines = document.querySelectorAll('.step-line');
    const resumePreview = document.getElementById('resumePreview');
    const editInfoBtn = document.getElementById('edit-info');
    const saveInfoBtn = document.getElementById('save-resume');
    const downloadResume = document.getElementById('download-resume');

    const addEducation = document.getElementById('add-education');
    const addExperience = document.getElementById('add-experience');
    const addProject = document.getElementById('add-project');
    const addSkill = document.getElementById('add-skill');
    const addRef = document.getElementById('add-ref');

    function showStep(step) {
        steps.forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`step-${step}`);
        if (target) target.classList.add('active');
        updateProgress();
        nextBtn.textContent = step === 5 ? 'Finish & Preview' : 'Next';
        backBtn.style.display = step === 1 ? 'none' : 'inline-block';
    }

    function updateProgress() {
        stepItems.forEach((item, i) => {
            const stepNum = parseInt(item.dataset.step);
            if (currentStep > 5 || stepNum < currentStep) {
                item.classList.add('completed');
                if (i < stepLines.length) stepLines[i].style.backgroundColor = '#8c52ff';
            } else if (stepNum === currentStep) {
                item.classList.add('active');
            } else {
                item.classList.remove('active', 'completed');
                if (i < stepLines.length) stepLines[i].style.backgroundColor = '#f0f0f0';
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < 5) {
            currentStep++;
            showStep(currentStep);
        } else {
            showPreview();
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    document.getElementById('basic-info-form')?.addEventListener('input', e => {
        const { name, value } = e.target;
        if (name in resumeData) {
            resumeData[name] = value;
            renderResume();
        }
    });

    function addItem(section, defaults = {}) {
        const id = Date.now().toString();
        resumeData[section].push({ id, ...defaults });
        renderSectionFields(section);
        renderResume();
    }

    if (addEducation) addEducation.onclick = () => addItem('education', { grade: '' });
    if (addExperience) addExperience.onclick = () => addItem('experience');
    if (addProject) addProject.onclick = () => addItem('projects');
    if (addSkill) addSkill.onclick = () => addItem('skills', { level: 'Intermediate' });
    if (addRef) addRef.onclick = () => addItem('references');

    // === ONLY THIS PART CHANGED: X-ICON STYLING ===
    function renderSectionFields(section) {
        const container = document.getElementById(`${section}-container`);
        if (!container) return;
        container.innerHTML = '';
        resumeData[section].forEach(item => {
            const div = document.createElement('div');
            div.className = 'section-box';
            div.style.position = 'relative';
            div.id = `${section}-${item.id}`;
            div.innerHTML = getFieldHTML(section, item);

            if (['education', 'experience', 'projects'].includes(section)) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'remove-btn-x'; // ← Uses your existing CSS
                closeBtn.innerHTML = '×';
                closeBtn.onclick = () => removeField(section, item.id);
                div.appendChild(closeBtn);
            }

            container.appendChild(div);
        });
    }
    // ===========================================

    function getFieldHTML(section, item) {
        const id = item.id;
        const templates = {
            education: `
                <div class="field-grid">
                    <div class="field-row">
                        <div class="field-item"><label>Qualification</label><input type="text" value="${item.qualification || ''}" data-id="${id}" data-field="qualification" data-section="${section}"></div>
                        <div class="field-item"><label>Institute</label><input type="text" value="${item.institute || ''}" data-id="${id}" data-field="institute" data-section="${section}"></div>
                    </div>
                    <div class="field-row">
                        <div class="field-item"><label>Start</label><input type="date" value="${item.startDate || ''}" data-id="${id}" data-field="startDate" data-section="${section}"></div>
                        <div class="field-item"><label>End</label><input type="date" value="${item.endDate || ''}" data-id="${id}" data-field="endDate" data-section="${section}"></div>
                        <div class="field-item"><label>Grade</label><input type="text" value="${item.grade || ''}" data-id="${id}" data-field="grade" data-section="${section}"></div>
                    </div>
                </div>`,
            experience: `
                <div class="field-grid">
                    <div class="field-row">
                        <div class="field-item"><label>Title</label><input type="text" value="${item.title || ''}" data-id="${id}" data-field="title" data-section="${section}"></div>
                        <div class="field-item"><label>Company</label><input type="text" value="${item.company || ''}" data-id="${id}" data-field="company" data-section="${section}"></div>
                    </div>
                    <div class="field-row">
                        <div class="field-item"><label>Start</label><input type="date" value="${item.startDate || ''}" data-id="${id}" data-field="startDate" data-section="${section}"></div>
                        <div class="field-item"><label>End</label><input type="date" value="${item.endDate || ''}" data-id="${id}" data-field="endDate" data-section="${section}"></div>
                    </div>
                    <div class="field-item full-width"><label>Description</label><textarea data-id="${id}" data-field="description" data-section="${section}">${item.description || ''}</textarea></div>
                </div>`,
            projects: `
                <div class="field-grid">
                    <div class="field-row">
                        <div class="field-item"><label>Title</label><input type="text" value="${item.title || ''}" data-id="${id}" data-field="title" data-section="${section}"></div>
                        <div class="field-item"><label>Link</label><input type="url" value="${item.link || ''}" data-id="${id}" data-field="link" data-section="${section}"></div>
                    </div>
                    <div class="field-item full-width"><label>Description</label><textarea data-id="${id}" data-field="description" data-section="${section}">${item.description || ''}</textarea></div>
                </div>`,
            skills: `
                <div class="field-grid">
                    <div class="field-item"><label>Skill</label><input type="text" value="${item.name || ''}" data-id="${id}" data-field="name" data-section="${section}"></div>
                    <div class="field-item"><label>Level</label>
                        <select data-id="${id}" data-field="level" data-section="${section}">
                            ${['Beginner','Intermediate','Advanced','Expert'].map(l => `<option value="${l}" ${item.level===l?'selected':''}>${l}</option>`).join('')}
                        </select>
                    </div>
                    <button class="remove-btn" onclick="removeField('${section}', '${id}')">Remove</button>
                </div>`,
            references: `
                <div class="field-grid">
                    <div class="field-item"><label>Name</label><input type="text" value="${item.name || ''}" data-id="${id}" data-field="name" data-section="${section}"></div>
                    <div class="field-item"><label>Contact</label><input type="text" value="${item.contact || ''}" data-id="${id}" data-field="contact" data-section="${section}"></div>
                    <button class="remove-btn" onclick="removeField('${section}', '${id}')">Remove</button>
                </div>`
        };
        return templates[section] || '';
    }

    window.removeField = (section, id) => {
        resumeData[section] = resumeData[section].filter(i => i.id !== id);
        renderSectionFields(section);
        renderResume();
    };

    document.addEventListener('input', e => {
        const el = e.target;
        const section = el.dataset.section;
        const field = el.dataset.field;
        const id = el.dataset.id;
        if (section && field && id) {
            const item = resumeData[section].find(i => i.id === id);
            if (item) item[field] = el.value;
            renderResume();
        }
    });

    function renderResume() {
        if (!resumePreview) return;
    
        const nameEl = resumePreview.querySelector('.resume-name');
        const contactEl = resumePreview.querySelector('.resume-contact-details');
        const main = resumePreview.querySelector('.resume-main-content');
        const header = resumePreview.querySelector('.resume-header');
        const profilePic = resumePreview.querySelector('.resume-profile-pic');
        const headerLine = resumePreview.querySelector('.header-line');
        const sectionTitles = resumePreview.querySelectorAll('.resume-section-title');
        const contactItems = resumePreview.querySelectorAll('.contact-item');
        const icons = resumePreview.querySelectorAll('.contact-item i');
    
        const color = getTemplateColor(currentTemplate);
    
        if (header) header.style.backgroundColor = color;
        if (headerLine) headerLine.style.backgroundColor = color;
        sectionTitles.forEach(el => el.style.color = color);
        contactItems.forEach(el => el.style.color = color);
        icons.forEach(el => el.style.color = color);
    
        if (nameEl) nameEl.textContent = resumeData.fullName || 'Your Name';
        if (profilePic) {
            const initials = (resumeData.fullName || 'User').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            profilePic.textContent = initials;
            profilePic.style.backgroundColor = color;
            profilePic.style.color = '#fff';
        }
    
        if (contactEl) {
            const lines = contactEl.querySelectorAll('.contact-line');
            lines.forEach(l => l.innerHTML = '');
            if (resumeData.phone) lines[0].innerHTML += `<span class="contact-item"><i class="fas fa-phone"></i> ${resumeData.phone}</span>`;
            if (resumeData.email) lines[0].innerHTML += `<span class="contact-item"><i class="fas fa-envelope"></i> ${resumeData.email}</span>`;
            if (resumeData.linkedin) lines[0].innerHTML += `<span class="contact-item"><i class="fab fa-linkedin"></i> ${resumeData.linkedin}</span>`;
            if (resumeData.address) lines[1].innerHTML += `<span class="contact-item"><i class="fas fa-map-marker-alt"></i> ${resumeData.address}</span>`;
            if (resumeData.github) lines[1].innerHTML += `<span class="contact-item"><i class="fab fa-github"></i> ${resumeData.github}</span>`;
        }
    
        if (main) {
            main.innerHTML = '';
            const sections = [
                { key: 'experience', title: 'WORK EXPERIENCE' },
                { key: 'education', title: 'EDUCATION' },
                { key: 'projects', title: 'PROJECTS' },
                { key: 'skills', title: 'SKILLS' },
                { key: 'references', title: 'REFERENCES' }
            ];
    
            sections.forEach(sec => {
                if (resumeData[sec.key].length === 0) return;
                const div = document.createElement('div');
                div.innerHTML = `<div class="resume-section-title">${sec.title}</div>`;
    
                resumeData[sec.key].forEach(item => {
                    let html = '<div class="resume-item">';
    
                    // === WORK EXPERIENCE ===
                    if (sec.key === 'experience') {
                        const dateText = [item.startDate, item.endDate].filter(Boolean).join(' – ') || '';
                        html += `
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                <div style="flex: 1;">
                                    <p style="margin: 0; font-weight: 600; font-size: 15px;">${item.title || ''}</p>
                                    <p style="margin: 0; color: #555; font-size: 14px; margin-top: 2px;">${item.company || ''}</p>
                                </div>
                                <div style="text-align: right; white-space: nowrap; font-size: 12px; color: #666;">
                                    ${dateText}
                                </div>
                            </div>
                            <p style="margin-top: 4px; font-size: 14px;">${item.description || ''}</p>`;
    
                    // === EDUCATION ===
                    } else if (sec.key === 'education') {
                        const grade = item.grade?.trim();
                        const isNumeric = !isNaN(grade) && grade !== '';
                        const displayGrade = isNumeric ? `${grade} CGPA` : (grade ? `${grade} Grade` : '');
                        const dateGradeText = [item.startDate, item.endDate].filter(Boolean).join(' – ') + (displayGrade ? ' | ' + displayGrade : '');
    
                        html += `
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div style="flex: 1;">
                                    <p style="margin: 0; font-weight: 600; font-size: 14px; color: #000;">${item.qualification || ''}</p>
                                    <p style="margin: 0; color: #555; font-size: 13px; margin-top: 2px;">${item.institute || ''}</p>
                                </div>
                                <div style="text-align: right; white-space: nowrap; font-size: 12px; color: #666;">
                                    ${dateGradeText || ''}
                                </div>
                            </div>`;
    
                    // === OTHER SECTIONS (UNCHANGED) ===
                    } else if (sec.key === 'projects') {
                        html += `<p style="margin: 0; font-weight: 600;">${item.title || ''}</p>`;
                        html += `<p style="margin: 0; margin-top: 2px;"><a href="${item.link || '#'}" target="_blank" style="color: ${color};">${item.link || ''}</a></p>`;
                        html += `<p style="margin-top: 4px; font-size: 14px;">${item.description || ''}</p>`;
    
                    } else if (sec.key === 'skills') {
                        html += `<p style="margin: 0;"><strong>${item.name || ''}</strong> – ${item.level || ''}</p>`;
    
                    } else if (sec.key === 'references') {
                        html += `<p style="margin: 0;"><strong>${item.name || ''}</strong> – ${item.contact || ''}</p>`;
                    }
    
                    html += '</div>';
                    div.innerHTML += html;
                });
    
                main.appendChild(div);
            });
        }
    }

    function getTemplateColor(template) {
        const colors = {
            'modern-purple': '#8c52ff',
            'classic-black': '#000000',
            'creative-wave': '#00bcd4',
            'minimalist-tech': '#607d8b'
        };
        return colors[template] || '#8c52ff';
    }

    document.querySelectorAll('.template-item').forEach(btn => {
        const color = getTemplateColor(btn.dataset.template);
        btn.style.backgroundColor = color + '20';
        btn.style.border = `2px solid ${color}`;
        btn.style.color = color;
        btn.addEventListener('click', () => {
            currentTemplate = btn.dataset.template;
            document.querySelectorAll('.template-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderResume();
        });
    });

    function showPreview() {
        steps.forEach(s => s.classList.remove('active'));
        const preview = document.getElementById('step-preview');
        if (preview) preview.style.display = 'block';
        updateProgress();
        renderResume();
    }

    async function saveResumeData() {
        try {
            await setDoc(userDocRef, { resumeData }, { merge: true });
            alert('Resume saved successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to save resume.');
        }
    }

    if (downloadResume) {
        downloadResume.onclick = () => {
            if (!window.html2canvas || !window.jspdf) {
                alert('PDF libraries not loaded.');
                return;
            }
            const { jsPDF } = window.jspdf;
            html2canvas(resumePreview, { scale: 2 }).then(canvas => {
                const img = canvas.toDataURL('image/png');
                const doc = new jsPDF('p', 'mm', 'a4');
                const w = doc.internal.pageSize.getWidth();
                const h = (canvas.height * w) / canvas.width;
                doc.addImage(img, 'PNG', 0, 0, w, h);
                doc.save(`${resumeData.fullName || 'Resume'}.pdf`);
            });
        };
    }

    if (editInfoBtn) editInfoBtn.onclick = () => {
        document.getElementById('step-preview').style.display = 'none';
        currentStep = 1;
        showStep(1);
    };

    if (saveInfoBtn) saveInfoBtn.onclick = saveResumeData;

    // SIDEBAR, MENU, LOGOUT
    setupMenuActive();
    setupSidebarToggle();
    setupProfileDropdown();
    setupLogout();

    // INIT
    ['education', 'experience', 'projects', 'skills', 'references'].forEach(renderSectionFields);
    showStep(1);
    renderResume();
}

function setupLogout() {
    const logoutElements = document.querySelectorAll('.logout, .dropdown-content a[href="#logout"]');
    if (logoutElements.length > 0) {
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
    } else {
        console.warn('Logout elements not found. Check HTML for .logout or .dropdown-content a[href="#logout"].');
    }
}

function setupMenuActive() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

function setupSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const mobileHamburger = document.getElementById('hamburger-menu-mobile');
    const desktopHamburger = document.getElementById('hamburger-menu-desktop');
    const closeBtn = document.getElementById('close-sidebar');
    const container = document.querySelector('.dashboard-container');
    const mainContent = document.getElementById('main-content');

    if (mobileHamburger && sidebar && container) {
        mobileHamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            const isOpen = sidebar.classList.contains('active');
            container.classList.toggle('sidebar-open', isOpen);
            container.classList.toggle('overlay-active', isOpen);
        });
    } else {
        console.warn('Mobile hamburger, sidebar, or container not found.');
    }

    if (closeBtn && sidebar && container) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
            container.classList.remove('sidebar-open');
            container.classList.remove('overlay-active');
        });
    } else {
        console.warn('Close button, sidebar, or container not found.');
    }

    if (container) {
        container.addEventListener('click', (e) => {
            if (e.target === container && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                container.classList.remove('sidebar-open');
                container.classList.remove('overlay-active');
            }
        });
    }

    if (desktopHamburger && sidebar && mainContent) {
        desktopHamburger.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('expanded');
        });
    } else {
        console.warn('Desktop hamburger, sidebar, or main content not found.');
    }
}

function setupProfileDropdown() {
    const wrapper = document.querySelector('.user-profile-wrapper');
    if (!wrapper) {
        console.warn('User profile wrapper not found. Check HTML for .user-profile-wrapper.');
        return;
    }

    const dropdown = wrapper.querySelector('.dropdown');
    if (!dropdown) {
        console.warn('Dropdown not found. Check HTML for .dropdown inside .user-profile-wrapper.');
        return;
    }

    const icon = dropdown.querySelector('.dropdown-icon');
    if (!icon) {
        console.warn('Dropdown icon not found. Check HTML for .dropdown-icon inside .dropdown.');
        return;
    }

    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('active');
        }
    });

    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (dropdownContent) {
        dropdownContent.innerHTML = `
            <a href="#settings">Settings</a>
            <a href="#logout">Logout</a>
        `;
        dropdownContent.querySelector('a[href="#settings"]').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'settings.html';
        });
        dropdownContent.querySelector('a[href="#logout"]').addEventListener('click', (e) => {
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
    } else {
        console.warn('Dropdown content not found. Check HTML for .dropdown-content.');
    }
}