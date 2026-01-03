// dash.js
import { auth, db } from './firebase.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Fetch user data
    const userDocRef = doc(db, 'users', user.uid);
    getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const firstName = userData.firstName || 'User';
            const lastName = userData.lastName || '';
            const assessmentData = userData.assessmentData || {};

            // Update greeting
            const greetingElement = document.querySelector('.greeting');
            if (greetingElement) greetingElement.textContent = `Hello ${firstName} ${lastName}`;

            // Update profile initials
            const avatarElement = document.querySelector('.user-avatar');
            if (avatarElement) {
                const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
                avatarElement.textContent = initials;
            }

            // Calculate DISC scores
            const discScores = { D: 0, I: 0, S: 0, C: 0 };
            const totalQuestions = Object.keys(assessmentData.discAnswers || {}).length || 1;
            for (const [id, value] of Object.entries(assessmentData.discAnswers || {})) {
                const category = questions['15-20'].personality.find(q => q.id === id)?.category;
                if (category) discScores[category] += value;
            }
            for (const category in discScores) {
                discScores[category] = Math.round((discScores[category] / totalQuestions) * 20); // Scale to 0-100
                const card = document.querySelector(`.disc-card[data-trait="${category === 'D' ? 'Dominance' : category === 'I' ? 'Influence' : category === 'S' ? 'Steadiness' : 'Conscientiousness'}"]`);
                if (card) card.dataset.value = discScores[category];
            }
            updateDiscCards();

            // Update bar chart analytics
            updateBarChart(discScores);

            // Top-rated careers
            const careerRatings = assessmentData.careerRatingAnswers || {};
            const topCareers = Object.entries(careerRatings)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([id]) => questions['15-20'].career.find(q => q.id === id)?.name)
                .filter(Boolean);
            updateCareerRecommendations(topCareers);

            // Logout functionality
            const logoutElement = document.querySelector('.logout');
            if (logoutElement) {
                logoutElement.addEventListener('click', () => {
                    if (confirm('Are you sure you want to log out?')) {
                        auth.signOut().then(() => {
                            alert('You are logged out.');
                            window.location.href = 'login.html';
                        });
                    }
                });
            }

            // Settings navigation
            const settingsItem = document.querySelectorAll('.menu-item')[4];
            if (settingsItem) {
                settingsItem.addEventListener('click', () => {
                    window.location.href = 'setting.html';
                });
            }
        }
    }).catch(error => console.error('Error fetching user data:', error));

    // Menu item handling
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems.length > 0) {
        // Set initial active state based on current page
        const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === currentPath) {
                item.classList.add('active');
            }
        });

        // Menu item click handling
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all menu items
                menuItems.forEach(mi => mi.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                // Allow navigation if there's a link
                const link = this.querySelector('a');
                if (link && link.href) {
                    window.location.href = link.href;
                }
            });
        });
    }

    // Sidebar toggle functionality
    const sidebar = document.getElementById('sidebar');
    const mobileHamburger = document.getElementById('hamburger-menu-mobile');
    const desktopHamburger = document.getElementById('hamburger-menu-desktop');
    const closeSidebar = document.getElementById('close-sidebar');
    const mainContent = document.getElementById('main-content');
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (mobileHamburger) {
        mobileHamburger.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) {
                e.stopPropagation();
                sidebar.classList.toggle('active');
                const isActive = sidebar.classList.contains('active');
                dashboardContainer.classList.toggle('sidebar-open', isActive);
                dashboardContainer.classList.toggle('overlay-active', isActive);
            }
        });
    }

    if (desktopHamburger) {
        desktopHamburger.addEventListener('click', (e) => {
            if (window.innerWidth >= 1024) {
                e.stopPropagation();
                sidebar.classList.toggle('hidden');
                mainContent.classList.toggle('expanded');
            }
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('active');
                dashboardContainer.classList.remove('sidebar-open');
                dashboardContainer.classList.remove('overlay-active');
            }
        });
    }

    if (dashboardContainer) {
        dashboardContainer.addEventListener('click', (e) => {
            if (e.target === dashboardContainer && window.innerWidth < 1024 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                dashboardContainer.classList.remove('sidebar-open');
                dashboardContainer.classList.remove('overlay-active');
            }
        });
    }

    // DISC Card Hover Effects
    const discCards = document.querySelectorAll('.disc-card');
    discCards.forEach(card => {
        const circle = card.querySelector('circle:nth-child(2)');
        if (circle) {
            const value = parseInt(card.dataset.value);
            const strokeDashOffset = 282.743 - (282.743 * value / 100);
            circle.setAttribute('stroke-dashoffset', strokeDashOffset);
        }
    });

    // Bar Chart Animation and Hover
    const barGroups = document.querySelectorAll('.bar-group');
    barGroups.forEach(group => {
        const bar = group.querySelector('.bar');
        if (bar) {
            const value = parseInt(bar.dataset.value);
            const barChartElement = group.closest('.bar-chart');
            const effectiveChartHeight = barChartElement.clientHeight;
            const barHeight = (value / 100) * effectiveChartHeight;

            bar.style.height = `${barHeight}px`;
            bar.style.transition = 'height 0.5s ease-out';

            group.addEventListener('mouseover', () => {
                const tooltip = group.querySelector('.bar-tooltip');
                if (tooltip) tooltip.style.display = 'block';
            });

            group.addEventListener('mouseout', () => {
                const tooltip = group.querySelector('.bar-tooltip');
                if (tooltip) tooltip.style.display = 'none';
            });
        }
    });

    // User Profile Dropdown
    const userProfileWrapper = document.querySelector('.user-profile-wrapper');
    if (userProfileWrapper) {
        userProfileWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            userProfileWrapper.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (userProfileWrapper && !userProfileWrapper.contains(e.target) && userProfileWrapper.classList.contains('active')) {
            userProfileWrapper.classList.remove('active');
        }
    });

    // Resume Generator Logic
    const resumeData = {
        fullName: '',
        profilePicture: null,
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        address: '',
        references: [{ id: 'default', name: '', contact: '' }],
        education: [{ id: 'default', qualification: '', institute: '', startDate: '', endDate: '' }],
        experience: [{ id: 'default', title: '', company: '', startDate: '', endDate: '', description: '' }],
        projects: [{ id: 'default', title: '', link: '', description: '' }],
        skills: [{ id: 'default', name: '', level: '' }]
    };

    let currentStep = 1;
    let currentTemplate = 'modern-purple';
    const resumePreview = document.getElementById('resumePreview');

    function showStep(step) {
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.getElementById(`step-${step}`)?.classList.add('active');
        updateProgress();
        document.getElementById('next-btn').textContent = step === 5 ? 'Finish & Preview' : 'Next';
    }

    function updateProgress() {
        const stepItems = document.querySelectorAll('.step-item');
        const stepLines = document.querySelectorAll('.step-line');
        stepItems.forEach((item, index) => {
            const stepNum = parseInt(item.getAttribute('data-step'));
            const title = item.querySelector('.step-title');
            const circle = item.querySelector('.step-circle');
            if (stepNum < currentStep) {
                item.classList.add('completed');
                item.classList.remove('active');
                title.style.color = '#666';
                circle.style.backgroundColor = '#8c52ff';
                circle.style.color = '#fff';
                if (index < stepLines.length) stepLines[index].style.backgroundColor = '#8c52ff';
            } else if (stepNum === currentStep) {
                item.classList.add('active');
                item.classList.remove('completed');
                title.style.color = '#8c52ff';
                circle.style.backgroundColor = '#8c52ff';
                circle.style.color = '#fff';
            } else {
                item.classList.remove('active', 'completed');
                title.style.color = '#666';
                circle.style.backgroundColor = '#f0f0f0';
                circle.style.color = '#666';
                if (index < stepLines.length) stepLines[index].style.backgroundColor = '#f0f0f0';
            }
        });
    }

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentStep < 5) {
            currentStep++;
            showStep(currentStep);
        } else if (currentStep === 5) {
            showPreview();
        }
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    const basicInfoForm = document.getElementById('basic-info-form');
    basicInfoForm.addEventListener('change', (e) => {
        const { name, value } = e.target;
        resumeData[name] = value;
        if (name === 'fullName') {
            const resumeNameElement = document.querySelector('.resume-name');
            if (resumeNameElement) {
                resumeNameElement.textContent = value || 'Your Name';
            }
        }
    });
    function updateField(input, type, field, id) {
        const item = resumeData[type].find(i => i.id === id);
        if (item) item[field] = input.value;
        renderResume();
    }

    function addField(containerId, type, html) {
        const id = Date.now().toString();
        resumeData[type].push({ id, ...getDefaultItem(type) });
        const container = document.getElementById(containerId);
        if (container) {
            const newSection = document.createElement('div');
            newSection.className = 'section-box';
            newSection.id = `${type}-${id}`;
            newSection.innerHTML = html.replace(/{{id}}/g, id);
            container.appendChild(newSection);
        }
    }

    function getDefaultItem(type) {
        switch (type) {
            case 'references': return { name: '', contact: '' };
            case 'education': return { qualification: '', institute: '', startDate: '', endDate: '' };
            case 'experience': return { title: '', company: '', startDate: '', endDate: '', description: '' };
            case 'projects': return { title: '', link: '', description: '' };
            case 'skills': return { name: '', level: 'Intermediate' };
        }
    }

    function removeField(btn, type, id) {
        resumeData[type] = resumeData[type].filter(item => item.id !== id);
        const sectionBox = btn.closest('.section-box');
        if (sectionBox) sectionBox.remove();
        renderResume();
    }

    function showPreview() {
        currentStep = 6;
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        const previewElement = document.getElementById('step-preview');
        if (previewElement) previewElement.style.display = 'block';
        updateProgress();
        renderResume();
    }

    function renderResume() {
        const preview = document.getElementById('resumePreview');
        if (!preview) return;
        const profilePic = document.getElementById('profile-pic');
        const mainContent = preview.querySelector('.resume-main-content');
        const headerContent = preview.querySelector('.header-content');

        if (profilePic) {
            const initials = resumeData.fullName ? resumeData.fullName.match(/\b\w/g).join('').toUpperCase().slice(0, 2) : 'NA';
            profilePic.innerHTML = `<span class="initials">${initials}</span>`;
        }

        preview.querySelector('.resume-name')?.textContent = resumeData.fullName || 'Your Name';

        const contactDetailsContainer = preview.querySelector('.resume-contact-details');
        if (contactDetailsContainer) {
            contactDetailsContainer.innerHTML = `
                <div class="contact-line">
                    <span class="contact-item"><i class="fas fa-phone"></i> ${resumeData.phone || '+1 234 567 890'}</span>
                    <span class="contact-item"><i class="fas fa-envelope"></i> ${resumeData.email || 'michael@email.com'}</span>
                    <span class="contact-item"><i class="fab fa-linkedin"></i> ${resumeData.linkedin || 'linkedin.com/in/totok-michael'}</span>
                </div>
                <div class="contact-line">
                    <span class="contact-item"><i class="fas fa-map-marker-alt"></i> ${resumeData.address || '123 Main St, Anytown, USA'}</span>
                    <span class="contact-item"><i class="fab fa-github"></i> ${resumeData.github || 'github.com/totok-michael'}</span>
                </div>
            `;
        }

        if (mainContent) mainContent.innerHTML = '';

        let experienceHTML = '<div class="resume-section-title">WORK EXPERIENCE</div>';
        experienceHTML += resumeData.experience.map(exp => `
            <div class="experience-item">
                <p><span class="content-left role"><strong>${exp.title || 'Job Title'}</strong></span><span class="date-right">${exp.startDate || 'Month Year'} – ${exp.endDate || 'Month Year'}</span></p>
                <p class="company">${exp.company || 'Company Name'}</p>
                <p class="description">${exp.description || 'Responsibility/Achievement'}</p>
            </div>
        `).join('') || '<p class="resume-content-placeholder">No experience added</p>';
        mainContent.innerHTML += experienceHTML;

        let educationHTML = '<div class="resume-section-title">EDUCATION</div>';
        educationHTML += resumeData.education.map(edu => `
            <div class="education-item">
                <p><span class="content-left"><strong>${edu.qualification || 'Degree'}</strong></span><span class="date-right">${edu.startDate || 'Year'} – ${edu.endDate || 'Year'}</span></p>
                <p><span class="content-left">${edu.institute || 'University Name'}</span></p>
            </div>
        `).join('') || '<p class="resume-content-placeholder">No education added</p>';
        mainContent.innerHTML += educationHTML;

        let projectsHTML = '<div class="resume-section-title">PROJECTS</div>';
        projectsHTML += resumeData.projects.map(proj => `
            <div class="project-item">
                <p><span class="content-left"><strong>${proj.title || 'Project Title'}</strong></span><span class="date-right">${proj.link ? `<a href="${proj.link}" target="_blank">Link</a>` : 'No Link'}</span></p>
                <p class="content-left">${proj.description || 'Description'}</p>
            </div>
        `).join('') || '<p class="resume-content-placeholder">No projects added</p>';
        mainContent.innerHTML += projectsHTML;

        let skillsHTML = '<div class="resume-section-title">SKILLS</div>';
        skillsHTML += `<ul class="resume-skills">`;
        skillsHTML += resumeData.skills.map(skill => `<li>• ${skill.name ? skill.name + ' (' + skill.level + ')' : 'Skill (Intermediate)'}</li>`).join('');
        skillsHTML += `</ul>`;
        mainContent.innerHTML += skillsHTML;

        let referencesHTML = '<div class="resume-section-title">REFERENCES</div>';
        if (resumeData.references[0].name) {
            referencesHTML += `<ul class="resume-references">`;
            referencesHTML += resumeData.references.map(ref => `
                <li><div class="reference-name">${ref.name}</div><div class="reference-contact">${ref.contact}</div></li>
            `).join('');
            referencesHTML += `</ul>`;
        } else {
            referencesHTML += '<p class="resume-content-placeholder">Available upon request</p>';
        }
        mainContent.innerHTML += referencesHTML;

        const resumeHeader = preview.querySelector('.resume-header');
        if (resumeHeader) {
            switch (currentTemplate) {
                case 'modern-purple': resumeHeader.style.backgroundColor = '#6a0dad'; break;
                case 'classic-black': resumeHeader.style.backgroundColor = '#333'; break;
                case 'creative-wave': resumeHeader.style.backgroundColor = '#8B4513'; break;
                case 'minimalist-tech': resumeHeader.style.backgroundColor = '#228B22'; break;
            }
        }
    }

    document.querySelectorAll('.template-item')?.forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.template-item').forEach(i => i.classList.remove('active'));
            card.classList.add('active');
            currentTemplate = card.dataset.template;
            renderResume();
        });
    });

    document.getElementById('download-resume')?.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            console.error('jsPDF is not loaded. Please include jspdf library.');
            return;
        }
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [210, 297] });
        const resumePreviewElement = document.getElementById('resumePreview');
        if (!resumePreviewElement) {
            console.error('resumePreview element not found.');
            return;
        }

        document.body.classList.add('pdf-export-mode');
        if (currentTemplate) resumePreviewElement.classList.add(currentTemplate);

        resumePreviewElement.style.width = '210mm';
        resumePreviewElement.style.height = 'auto';
        resumePreviewElement.style.position = 'relative';
        resumePreviewElement.style.overflow = 'visible';

        html2canvas(resumePreviewElement, { scale: 1.2, useCORS: true, scrollY: -window.scrollY }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pageWidth = 210;
            const pageHeight = 297;
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const yOffset = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;

            doc.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
            doc.save('resume.pdf');

            document.body.classList.remove('pdf-export-mode');
            if (currentTemplate) resumePreviewElement.classList.remove(currentTemplate);
            resumePreviewElement.style.width = '';
            resumePreviewElement.style.height = '';
            resumePreviewElement.style.position = '';
            resumePreviewElement.style.overflow = '';
        }).catch(error => console.error('Error generating PDF:', error));
    });

    document.getElementById('save-resume')?.addEventListener('click', () => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        alert('Resume saved locally');
    });

    document.getElementById('edit-info')?.addEventListener('click', () => {
        currentStep = 1;
        showStep(1);
        document.getElementById('step-preview')?.style.display = 'none';
    });

    showStep(1);

    // Add field buttons
    document.getElementById('add-education')?.addEventListener('click', () => addField('education-container', 'education', `<div class="field-grid"><div class="field-row"><div class="field-item"><label>Qualification</label><input type="text" data-id="{{id}}" onchange="updateField(this, 'education', 'qualification', '{{id}}')"></div><div class="field-item"><label>Institute Name</label><input type="text" data-id="{{id}}" onchange="updateField(this, 'education', 'institute', '{{id}}')"></div></div><div class="field-row"><div class="field-item"><label>Start Date</label><input type="date" data-id="{{id}}" onchange="updateField(this, 'education', 'startDate', '{{id}}')"></div><div class="field-item"><label>End Date</label><input type="date" data-id="{{id}}" onchange="updateField(this, 'education', 'endDate', '{{id}}')"></div></div></div>`));
    document.getElementById('add-experience')?.addEventListener('click', () => addField('experience-container', 'experience', `<div class="field-grid"><div class="field-row"><div class="field-item"><label>Job Title / Designation</label><input type="text" data-id="{{id}}" onchange="updateField(this, 'experience', 'title', '{{id}}')"></div><div class="field-item"><label>Company Name</label><input type="text" data-id="{{id}}" onchange="updateField(this, 'experience', 'company', '{{id}}')"></div></div><div class="field-row"><div class="field-item"><label>Start Date</label><input type="date" data-id="{{id}}" onchange="updateField(this, 'experience', 'startDate', '{{id}}')"></div><div class="field-item"><label>End Date</label><input type="date" data-id="{{id}}" onchange="updateField(this, 'experience', 'endDate', '{{id}}')"></div></div><div class="field-item full-width"><label>Description of Role</label><textarea data-id="{{id}}" onchange="updateField(this, 'experience', 'description', '{{id}}')"></textarea></div></div>`));
    document.getElementById('add-project')?.addEventListener('click', () => addField('projects-container', 'projects', `<div class="field-grid"><div class="field-row"><div class="field-item"><label>Project Title</label><input type="text" data-id="{{id}}" onchange="updateField(this, 'projects', 'title', '{{id}}')"></div><div class="field-item"><label>Link (GitHub / Live)</label><input type="url" data-id="{{id}}" onchange="updateField(this, 'projects', 'link', '{{id}}')"></div></div><div class="field-item full-width"><label>Description</label><textarea data-id="{{id}}" onchange="updateField(this, 'projects', 'description', '{{id}}')"></textarea></div></div>`));
    document.getElementById('add-skill')?.addEventListener('click', () => addField('skills-container', 'skills', `<div class="field-grid"><div class="field-item"><label>Skill Name</label><input type="text" data-id="{{id}}" onchange="updateField(this, 'skills', 'name', '{{id}}')"></div><div class="field-item"><label>Skill Level</label><select data-id="{{id}}" onchange="updateField(this, 'skills', 'level', '{{id}}')"><option value="Beginner">Beginner</option><option value="Intermediate" selected>Intermediate</option><option value="Advanced">Advanced</option><option value="Expert">Expert</option></select></div><button class="remove-btn" onclick="removeField(this, 'skills', '{{id}}')">Remove</button></div>`));
});

// Helper functions (global scope for inline event handlers)
function updateField(input, type, field, id) {
    const item = window.resumeData[type].find(i => i.id === id);
    if (item) item[field] = input.value;
    renderResume();
}

function removeField(btn, type, id) {
    window.resumeData[type] = window.resumeData[type].filter(item => item.id !== id);
    const sectionBox = btn.closest('.section-box');
    if (sectionBox) sectionBox.remove();
    renderResume();
}