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

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
            const link = this.querySelector('a');
            if (link && link.href) {
                window.location.href = link.href;
            }
        });
    });

    const currentPath = window.location.pathname.split('/').pop() || 'career.html';
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPath) {
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
        }
    });

    const careerCards = document.querySelectorAll('.career-card');
    const careerSelectionSection = document.getElementById('career-selection-section');
    const roadmapSection = document.getElementById('roadmap-section');
    const backButton = document.getElementById('back-to-main-button');

    careerCards.forEach(card => {
        card.addEventListener('click', () => {
            const careerId = card.getAttribute('data-career');
            careerSelectionSection.classList.remove('active');
            roadmapSection.classList.add('active');
            const header = document.querySelector('.main-header .header-left');
            header.querySelector('.greetres').textContent = 'Career Resources';
            header.querySelector('.subtitle').textContent = 'Explore curated resources to help you grow in your field.';
        });
    });

    if (backButton) {
        backButton.addEventListener('click', () => {
            roadmapSection.classList.remove('active');
            careerSelectionSection.classList.add('active');
            const header = document.querySelector('.main-header .header-left');
            header.querySelector('.greetres').textContent = 'Career Resources';
            header.querySelector('.subtitle').textContent = 'Explore curated resources to help you grow in your field.';
        });
    }
});

// Career Data and Roadmap Logic
const careerCategoriesData = [
    {
        categoryTitle: "Software & Technology Careers",
        categoryIcon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>',
        careers: [
            {
                id: 'web-development',
                title: 'Web Development',
                description: 'Frontend, Backend, Full Stack',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'HTML & CSS Foundations', description: 'Build the structural and stylistic backbone of web pages.', points: ['Learn semantic HTML5 tags.', 'Master CSS selectors, Flexbox, and Grid.', 'Build a personal portfolio website.'] },
                    { month: 'Month 2', title: 'JavaScript Fundamentals', description: 'Bring interactivity and logic to your websites.', points: ['Understand variables, data types, and functions.', 'Learn DOM manipulation and event handling.', 'Complete a simple JavaScript project like a to-do list app.'] },
                    { month: 'Month 3', title: 'Intro to Frontend Frameworks', description: 'Learn modern tools for building complex user interfaces.', points: ['Choose a framework (React, Vue, or Angular).', 'Learn about components, state management, and props.', 'Build a single-page application (SPA).'] },
                    { month: 'Month 4', title: 'Backend Development with Node.js', description: 'Build the server-side logic and APIs for your applications.', points: ['Learn Node.js and Express framework.', 'Understand RESTful APIs and how to build them.', 'Connect your application to a database (MongoDB).'] },
                    { month: 'Month 5', title: 'Databases & Full Stack Integration', description: 'Master data storage and connect your frontend and backend.', points: ['Deep dive into database concepts (SQL/NoSQL).', 'Implement user authentication and authorization.', 'Deploy a full-stack MERN/MEVN application.'] },
                    { month: 'Month 6', title: 'Deployment & Advanced Topics', description: 'Go live with your projects and learn advanced skills.', points: ['Learn about deployment platforms (Vercel, Netlify, Heroku).', 'Understand version control with Git and GitHub.', 'Explore topics like testing, CI/CD, and web performance.'] },
                ]
            },
            {
                id: 'data-science',
                title: 'Data Science',
                description: 'Python, ML, Visualization',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5v15m4.5-15v12m4.5-12v9m4.5-9v15m4.5-15v6" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Python for Data Science', description: 'Master the core programming language for data analysis.', points: ['Learn Python basics: data types, loops, functions.', 'Master libraries like NumPy and Pandas for data manipulation.', 'Complete data cleaning and exploration projects.'] },
                    { month: 'Month 2', title: 'Data Visualization & Storytelling', description: 'Learn to communicate insights effectively through visuals.', points: ['Use Matplotlib and Seaborn for static plots.', 'Create interactive visualizations with Plotly.', 'Develop a dashboard to present findings.'] },
                    { month: 'Month 3', title: 'Statistics & Probability', description: 'Understand the mathematical foundation of data science.', points: ['Learn descriptive and inferential statistics.', 'Master probability distributions and hypothesis testing.', 'Apply statistical concepts to real-world datasets.'] },
                    { month: 'Month 4', title: 'Introduction to Machine Learning', description: 'Build your first predictive models.', points: ['Understand supervised vs. unsupervised learning.', 'Implement linear/logistic regression and decision trees.', 'Learn about model evaluation metrics.'] },
                    { month: 'Month 5', title: 'Advanced Machine Learning', description: 'Explore more complex algorithms and techniques.', points: ['Study ensemble methods like Random Forests and Gradient Boosting.', 'Learn the basics of Neural Networks.', 'Participate in a Kaggle competition.'] },
                    { month: 'Month 6', title: 'Specialization & Deployment', description: 'Deepen your knowledge in a specific area.', points: ['Choose a specialization (NLP, Computer Vision, etc.).', 'Learn to deploy models using Flask or FastAPI.', 'Build an end-to-end portfolio project.'] },
                ]
            },
            {
                id: 'artificial-intelligence',
                title: 'Artificial Intelligence (AI)',
                description: 'Deep Learning, NLP',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'AI Foundations', description: 'Learn the basics of artificial intelligence.', points: ['Understand AI concepts and history.', 'Explore tools like TensorFlow and PyTorch.', 'Set up a development environment.'] },
                    { month: 'Month 2', title: 'Machine Learning Basics', description: 'Build foundational ML skills.', points: ['Learn supervised and unsupervised learning.', 'Implement basic models (regression, clustering).', 'Work on a small ML project.'] },
                    { month: 'Month 3', title: 'Neural Networks', description: 'Explore deep learning fundamentals.', points: ['Study neural network architecture.', 'Learn backpropagation and optimization.', 'Build a simple neural network model.'] },
                    { month: 'Month 4', title: 'Natural Language Processing (NLP)', description: 'Work with text and language data.', points: ['Learn tokenization and word embeddings.', 'Implement NLP models (e.g., sentiment analysis).', 'Use libraries like NLTK or SpaCy.'] },
                    { month: 'Month 5', title: 'Advanced AI Techniques', description: 'Deepen your AI expertise.', points: ['Explore reinforcement learning.', 'Study computer vision with CNNs.', 'Participate in an AI challenge.'] },
                    { month: 'Month 6', title: 'Deployment & Career Prep', description: 'Prepare for an AI career.', points: ['Deploy an AI model using cloud services.', 'Build a portfolio with AI projects.', 'Practice for AI job interviews.'] },
                ]
            },
            {
                id: 'cybersecurity',
                title: 'Cybersecurity',
                description: 'Ethical Hacking, Risk Mgmt.',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Cybersecurity Basics', description: 'Learn the fundamentals of cybersecurity.', points: ['Understand threats and vulnerabilities.', 'Explore security tools (Wireshark, Nmap).', 'Study basic networking concepts.'] },
                    { month: 'Month 2', title: 'Network Security', description: 'Secure network infrastructure.', points: ['Learn firewalls and intrusion detection.', 'Configure VPNs and encryption.', 'Perform a network security audit.'] },
                    { month: 'Month 3', title: 'Ethical Hacking', description: 'Practice penetration testing.', points: ['Study ethical hacking principles.', 'Use tools like Metasploit and Kali Linux.', 'Conduct a simulated hack.'] },
                    { month: 'Month 4', title: 'Risk Management', description: 'Assess and mitigate risks.', points: ['Learn risk assessment frameworks.', 'Develop a risk management plan.', 'Analyze real-world breach cases.'] },
                    { month: 'Month 5', title: 'Advanced Security', description: 'Deepen your cybersecurity skills.', points: ['Study malware analysis and forensics.', 'Learn about security policies and compliance.', 'Work on a security project.'] },
                    { month: 'Month 6', title: 'Certification & Career Prep', description: 'Prepare for a cybersecurity career.', points: ['Prepare for CEH or CISSP certification.', 'Build a security portfolio.', 'Practice for cybersecurity interviews.'] },
                ]
            },
            {
                id: 'mobile-app-development',
                title: 'Mobile App Development',
                description: 'Android, iOS, Flutter',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Mobile Development Basics', description: 'Learn the foundations of mobile app development.', points: ['Understand Android and iOS ecosystems.', 'Learn basic programming (Java/Kotlin, Swift).', 'Set up development environments.'] },
                    { month: 'Month 2', title: 'UI Design & Layouts', description: 'Build user interfaces for mobile apps.', points: ['Learn XML layouts (Android) or Storyboards (iOS).', 'Use design tools like Sketch or Figma.', 'Create a simple app UI.'] },
                    { month: 'Month 3', title: 'Core App Functionality', description: 'Add features to your apps.', points: ['Implement navigation and data storage.', 'Learn about APIs and networking.', 'Build a simple app with a backend.'] },
                    { month: 'Month 4', title: 'Cross-Platform Development', description: 'Explore Flutter or React Native.', points: ['Learn Dart and Flutter basics.', 'Build a cross-platform app prototype.', 'Compare with native development.'] },
                    { month: 'Month 5', title: 'Advanced Features', description: 'Enhance app capabilities.', points: ['Add push notifications and offline support.', 'Implement security features.', 'Optimize app performance.'] },
                    { month: 'Month 6', title: 'Deployment & Career Prep', description: 'Launch your app and prepare for a career.', points: ['Publish to Google Play and App Store.', 'Build a portfolio with multiple apps.', 'Practice for mobile development interviews.'] },
                ]
            },
            {
                id: 'software-qa',
                title: 'Software Quality Assurance (QA)',
                description: 'Manual & Automation',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'QA Fundamentals', description: 'Learn the basics of software testing.', points: ['Understand QA roles and processes.', 'Learn about test cases and bug reporting.', 'Use tools like Jira for tracking.'] },
                    { month: 'Month 2', title: 'Manual Testing', description: 'Master manual testing techniques.', points: ['Perform functional and regression testing.', 'Learn usability and compatibility testing.', 'Test a small application manually.'] },
                    { month: 'Month 3', title: 'Automation Basics', description: 'Introduce automation testing.', points: ['Learn Selenium or Appium basics.', 'Write your first automated test script.', 'Set up a test automation framework.'] },
                    { month: 'Month 4', title: 'Advanced Automation', description: 'Enhance automation skills.', points: ['Integrate with CI/CD pipelines.', 'Learn about test data management.', 'Automate a complex application feature.'] },
                    { month: 'Month 5', title: 'Performance & Security Testing', description: 'Test beyond functionality.', points: ['Learn performance testing with JMeter.', 'Study security testing basics.', 'Conduct a combined test scenario.'] },
                    { month: 'Month 6', title: 'Certification & Career Prep', description: 'Prepare for a QA career.', points: ['Prepare for ISTQB certification.', 'Build a QA portfolio with test reports.', 'Practice for QA job interviews.'] },
                ]
            },
            {
                id: 'ui-ux-design',
                title: 'UI/UX Design',
                description: 'Wireframing, Prototyping',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12Zm0 0h7.5" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Design Fundamentals', description: 'Learn the basics of UI/UX design.', points: ['Understand design principles (color, typography, layout).', 'Learn to use tools like Figma or Adobe XD.', 'Create your first wireframe.'] },
                    { month: 'Month 2', title: 'User Research', description: 'Gather insights to inform your designs.', points: ['Conduct user interviews and surveys.', 'Learn to create user personas.', 'Develop a simple user journey map.'] },
                    { month: 'Month 3', title: 'Prototyping & Interaction Design', description: 'Build interactive prototypes.', points: ['Master prototyping tools (Figma, InVision).', 'Learn about microinteractions and animations.', 'Design a clickable prototype.'] },
                    { month: 'Month 4', title: 'Usability Testing', description: 'Test and refine your designs.', points: ['Conduct usability testing sessions.', 'Analyze feedback and iterate designs.', 'Improve accessibility in your prototypes.'] },
                    { month: 'Month 5', title: 'Advanced Design Systems', description: 'Create scalable and consistent designs.', points: ['Develop a design system (components, guidelines).', 'Collaborate with developers on handoff.', 'Work on a real-world project with a team.'] },
                    { month: 'Month 6', title: 'Portfolio & Career Prep', description: 'Prepare for a UI/UX career.', points: ['Build a professional portfolio website.', 'Learn to present your work effectively.', 'Practice for design interviews and internships.'] },
                ]
            },
            {
                id: 'cloud-computing',
                title: 'Cloud Computing',
                description: 'AWS, Azure, Google Cloud',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Cloud Basics', description: 'Learn the fundamentals of cloud computing.', points: ['Understand IaaS, PaaS, and SaaS.', 'Explore cloud providers (AWS, Azure, GCP).', 'Set up a free tier account.'] },
                    { month: 'Month 2', title: 'Core Services', description: 'Master essential cloud services.', points: ['Learn compute (EC2, VMs) and storage (S3).', 'Configure networking (VPC, subnets).', 'Build a simple cloud-based app.'] },
                    { month: 'Month 3', title: 'Security & Identity', description: 'Secure your cloud environment.', points: ['Study IAM and access control.', 'Learn encryption and key management.', 'Implement a security policy.'] },
                    { month: 'Month 4', title: 'Advanced Services', description: 'Explore advanced cloud features.', points: ['Learn about serverless (Lambda, Functions).', 'Use databases (RDS, Cosmos DB).', 'Set up a multi-region application.'] },
                    { month: 'Month 5', title: 'Automation & DevOps', description: 'Automate cloud operations.', points: ['Learn Infrastructure as Code (Terraform).', 'Integrate with CI/CD pipelines.', 'Optimize costs with monitoring tools.'] },
                    { month: 'Month 6', title: 'Certification & Career Prep', description: 'Prepare for a cloud career.', points: ['Prepare for AWS Certified Solutions Architect.', 'Build a cloud portfolio project.', 'Practice for cloud job interviews.'] },
                ]
            },
            {
                id: 'devops-engineering',
                title: 'DevOps Engineering',
                description: 'CI/CD, Docker, Kubernetes',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.896-.461m14.5-.461l-1.5-.461m-1.5 2.457a6.75 6.75 0 01-1.5-.461m-14.5 2.457a6.75 6.75 0 011.5-.461m7.5 0a6.75 6.75 0 011.5.461m.75-3.75a6.75 6.75 0 01-.75 3.75m-.75-3.75h.001m.749 3.75h-.001" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'DevOps Basics', description: 'Understand the fundamentals of DevOps.', points: ['Learn about CI/CD pipelines.', 'Understand version control with Git.', 'Set up a basic repository on GitHub.'] },
                    { month: 'Month 2', title: 'Containerization with Docker', description: 'Master container technology.', points: ['Learn Docker basics and commands.', 'Create your first Docker image.', 'Deploy a simple app using Docker.'] },
                    { month: 'Month 3', title: 'Orchestration with Kubernetes', description: 'Manage containerized applications at scale.', points: ['Understand Kubernetes concepts (Pods, Services).', 'Set up a Kubernetes cluster.', 'Deploy a simple multi-container application.'] },
                    { month: 'Month 4', title: 'CI/CD Implementation', description: 'Automate your development workflow.', points: ['Set up Jenkins or GitHub Actions.', 'Configure automated testing and deployment.', 'Integrate with Docker and Kubernetes.'] },
                    { month: 'Month 5', title: 'Infrastructure as Code', description: 'Automate infrastructure management.', points: ['Learn Terraform or Ansible.', 'Write scripts to provision cloud resources.', 'Manage infrastructure changes with version control.'] },
                    { month: 'Month 6', title: 'Monitoring & Optimization', description: 'Ensure system reliability and performance.', points: ['Set up monitoring with Prometheus and Grafana.', 'Optimize resource usage and scalability.', 'Prepare a DevOps portfolio project.'] },
                ]
            },
        ]
    },
    {
        categoryTitle: "Medical & Healthcare Careers",
        categoryIcon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.079 0-2.15.26-3.136.75A11.947 11.947 0 003.55 15.113a10.048 10.048 0 0110.113 3.615 11.947 11.947 0 007.66-.711V8.25c0-1.079-.26-2.15-.75-3.136a8.967 8.967 0 00-6.255-3.655L12 6.042zM12 6.042V3.75m0 0A2.25 2.25 0 0010.75 1.5H8.25a2.25 2.25 0 00-2.25 2.25v2.292M12 6.042v2.292" /></svg>',
        careers: [
            {
                id: 'nursing',
                title: 'Nursing',
                description: 'Patient Care, Medical Asst.',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Nursing Basics', description: 'Learn the fundamentals of nursing.', points: ['Understand patient care principles.', 'Learn basic anatomy and physiology.', 'Study healthcare ethics.'] },
                    { month: 'Month 2', title: 'Clinical Skills', description: 'Develop hands-on nursing skills.', points: ['Practice vital signs monitoring.', 'Learn wound care and medication administration.', 'Assist in a simulated clinical setting.'] },
                    { month: 'Month 3', title: 'Patient Interaction', description: 'Enhance communication with patients.', points: ['Learn effective communication techniques.', 'Study patient education methods.', 'Conduct mock patient interviews.'] },
                    { month: 'Month 4', title: 'Specialized Care', description: 'Focus on specific nursing areas.', points: ['Explore pediatrics or geriatrics.', 'Learn emergency response procedures.', 'Work on a specialized care project.'] },
                    { month: 'Month 5', title: 'Advanced Clinical Practice', description: 'Deepen clinical expertise.', points: ['Study advanced procedures (IV therapy).', 'Participate in clinical rotations.', 'Collaborate with healthcare teams.'] },
                    { month: 'Month 6', title: 'Certification & Career Prep', description: 'Prepare for a nursing career.', points: ['Prepare for NCLEX-RN exam.', 'Build a nursing portfolio.', 'Practice for nursing job interviews.'] },
                ]
            },
            {
                id: 'pharmacy',
                title: 'Pharmacy',
                description: 'Medicines, Dosage',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Pharmacy Basics', description: 'Learn the fundamentals of pharmacy.', points: ['Understand drug classifications and uses.', 'Learn about dosage forms and administration.', 'Study basic pharmacology principles.'] },
                    { month: 'Month 2', title: 'Pharmacology & Drug Interactions', description: 'Master drug effects and interactions.', points: ['Study common drug interactions.', 'Learn about side effects and contraindications.', 'Complete a drug interaction project.'] },
                    { month: 'Month 3', title: 'Pharmacy Practice', description: 'Gain practical pharmacy skills.', points: ['Learn dispensing and compounding techniques.', 'Understand prescription processing.', 'Practice patient counseling scenarios.'] },
                    { month: 'Month 4', title: 'Regulatory & Legal Aspects', description: 'Understand pharmacy laws and regulations.', points: ['Study pharmacy laws and ethics.', 'Learn about controlled substances regulations.', 'Complete a compliance training module.'] },
                    { month: 'Month 5', title: 'Clinical Pharmacy', description: 'Apply pharmacy in clinical settings.', points: ['Learn patient care and medication therapy management.', 'Work on case studies with real patient data.', 'Collaborate with healthcare professionals.'] },
                    { month: 'Month 6', title: 'Certification & Career Prep', description: 'Prepare for a pharmacy career.', points: ['Prepare for certification exams (e.g., PTCB).', 'Build a professional resume and portfolio.', 'Practice for pharmacy job interviews.'] },
                ]
            },
            {
                id: 'medical-lab-technology',
                title: 'Medical Laboratory Technology',
                description: 'Testing & Diagnostics',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Lab Technology Basics', description: 'Learn the fundamentals of medical lab technology.', points: ['Understand lab safety and equipment.', 'Study basic lab techniques.', 'Explore specimen collection methods.'] },
                    { month: 'Month 2', title: 'Hematology & Biochemistry', description: 'Master blood and chemical analysis.', points: ['Learn blood cell counting and staining.', 'Study biochemical tests (glucose, lipids).', 'Perform a basic blood analysis project.'] },
                    { month: 'Month 3', title: 'Microbiology', description: 'Work with microorganisms.', points: ['Learn culturing and staining techniques.', 'Study bacterial identification.', 'Conduct a microbiology experiment.'] },
                    { month: 'Month 4', title: 'Immunology & Serology', description: 'Explore immune system testing.', points: ['Learn about antibodies and antigens.', 'Perform serological tests.', 'Analyze immune response data.'] },
                    { month: 'Month 5', title: 'Advanced Diagnostics', description: 'Deepen diagnostic skills.', points: ['Study molecular diagnostics (PCR).', 'Learn histopathology basics.', 'Work on a diagnostic case study.'] },
                    { month: 'Month 6', title: 'Certification & Career Prep', description: 'Prepare for a lab tech career.', points: ['Prepare for MLT certification.', 'Build a portfolio with lab reports.', 'Practice for lab tech job interviews.'] },
                ]
            },
        ]
    },
    {
        categoryTitle: "Business & Management Careers",
        categoryIcon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375H12.75M19.5 14.25a2.25 2.25 0 002.25-2.25V9.562a3.375 3.375 0 00-3.375-3.375H12.75M19.5 14.25h-6.75m-10.5-4.25h6.75M4.5 14.25h6.75M12 10.75V4.5M12 10.75L9 7.75M12 10.75L15 7.75M4.5 19.25V6.75a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25V19.25a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25z" /></svg>',
        careers: [
            {
                id: 'business-analyst',
                title: 'Business Analyst',
                description: 'Reporting, Power BI',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'BA Fundamentals', description: 'Learn the basics of business analysis.', points: ['Understand business processes.', 'Learn requirements gathering techniques.', 'Study stakeholder analysis.'] },
                    { month: 'Month 2', title: 'Data Analysis', description: 'Master data analysis skills.', points: ['Learn Excel and SQL basics.', 'Use Power BI for data visualization.', 'Analyze a sample business dataset.'] },
                    { month: 'Month 3', title: 'Requirements Engineering', description: 'Develop requirements documentation.', points: ['Learn to write user stories and use cases.', 'Create process models (BPMN).', 'Collaborate on a requirements project.'] },
                    { month: 'Month 4', title: 'Process Improvement', description: 'Optimize business processes.', points: ['Study process mapping and analysis.', 'Learn Lean and Six Sigma basics.', 'Propose a process improvement plan.'] },
                    { month: 'Month 5', title: 'Advanced Tools', description: 'Use advanced BA tools.', points: ['Master Jira or Confluence.', 'Learn about ERP systems (SAP).', 'Work on an end-to-end BA project.'] },
                    { month: 'Month 6', title: 'Certification & Career Prep', description: 'Prepare for a BA career.', points: ['Prepare for CBAP or ECBA certification.', 'Build a BA portfolio.', 'Practice for business analyst interviews.'] },
                ]
            },
            {
                id: 'digital-marketing',
                title: 'Digital Marketing',
                description: 'SEO, Social Media',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3a2.25 2.25 0 00-2.166 1.638c-.14.433-.52.75-1.013.75H5.25a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 17.25v-9a2.25 2.25 0 00-2.25-2.25h-1.071c-.493 0-.873-.317-1.013-.75a2.25 2.25 0 00-2.166-1.638zM15.75 7.5h3a.75.75 0 01.75.75v2.992l-1.5.752-1.5-.752V8.25a.75.75 0 01.75-.75zm-8.25 0h-3a.75.75 0 00-.75.75v2.992l1.5.752 1.5-.752V8.25a.75.75 0 00-.75-.75z" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Marketing Basics', description: 'Learn the fundamentals of digital marketing.', points: ['Understand marketing channels (SEO, PPC, Social).', 'Learn about target audiences and campaigns.', 'Set up a basic Google Analytics account.'] },
                    { month: 'Month 2', title: 'SEO & Content Strategy', description: 'Optimize for search engines and content creation.', points: ['Learn on-page and off-page SEO techniques.', 'Create a content plan and blog posts.', 'Use keyword research tools like Google Keyword Planner.'] },
                    { month: 'Month 3', title: 'Social Media Marketing', description: 'Master social media advertising.', points: ['Learn dispensing platforms (Facebook, Instagram, LinkedIn).', 'Run a paid ad campaign.', 'Analyze performance with social media insights.'] },
                    { month: 'Month 4', title: 'PPC & Email Marketing', description: 'Explore pay-per-click and email campaigns.', points: ['Set up Google Ads campaigns.', 'Learn email marketing with tools like Mailchimp.', 'Optimize conversion rates.'] },
                    { month: 'Month 5', title: 'Analytics & Optimization', description: 'Measure and improve marketing efforts.', points: ['Deep dive into Google Analytics and Tag Manager.', 'Conduct A/B testing on campaigns.', 'Develop a marketing dashboard.'] },
                    { month: 'Month 6', title: 'Portfolio & Career Prep', description: 'Prepare for a digital marketing career.', points: ['Build a portfolio with real campaigns.', 'Earn certifications (Google Ads, HubSpot).', 'Practice for marketing job interviews.'] },
                ]
            },
            {
                id: 'project-management',
                title: 'Project Management',
                description: 'Agile, Scrum, PMP',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8c52ff"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
                roadmap: [
                    { month: 'Month 1', title: 'Project Management Basics', description: 'Learn the fundamentals of project management.', points: ['Understand project lifecycle and phases.', 'Learn key terms (scope, budget, timeline).', 'Study project management methodologies (Waterfall, Agile).'] },
                    { month: 'Month 2', title: 'Planning & Scheduling', description: 'Master project planning techniques.', points: ['Create Gantt charts and timelines.', 'Learn resource allocation and risk management.', 'Use tools like MS Project or Trello.'] },
                    { month: 'Month 3', title: 'Agile & Scrum Fundamentals', description: 'Explore Agile and Scrum frameworks.', points: ['Learn Agile principles and Scrum roles.', 'Practice sprint planning and daily stand-ups.', 'Complete a small Agile project.'] },
                    { month: 'Month 4', title: 'Team Collaboration', description: 'Enhance team management skills.', points: ['Improve communication and stakeholder management.', 'Resolve conflicts and manage team dynamics.', 'Use collaboration tools (Slack, Jira).'] },
                    { month: 'Month 5', title: 'Advanced Techniques', description: 'Deepen your project management expertise.', points: ['Study PMP or PRINCE2 certification concepts.', 'Learn about budget forecasting and cost control.', 'Manage a simulated large-scale project.'] },
                    { month: 'Month 6', title: 'Certification & Career Prep', description: 'Prepare for a project management career.', points: ['Prepare for PMP or CAPM certification.', 'Build a project management portfolio.', 'Practice for job interviews and case studies.'] },
                ]
            },
        ]
    },
];

// Populate default roadmap for careers without specific roadmaps
careerCategoriesData.forEach(category => {
    category.careers.forEach(career => {
        if (career.roadmap.length === 0) {
            career.roadmap = [
                { month: 'Month 1', title: 'Foundations', description: 'Getting started in the field.', points: ['Understand core concepts.', 'Explore fundamental tools.'] },
                { month: 'Month 2', title: 'Core Skills', description: 'Building practical abilities.', points: ['Take introductory courses.', 'Work on small exercises.'] },
                { month: 'Month 3', title: 'Intermediate Concepts', description: 'Diving deeper into the subject.', points: ['Learn advanced techniques.', 'Start a guided project.'] },
                { month: 'Month 4', title: 'Practical Application', description: 'Applying your knowledge to real problems.', points: ['Build a portfolio project.', 'Collaborate with peers.'] },
                { month: 'Month 5', title: 'Specialization', description: 'Focusing on a niche area.', points: ['Choose a specialization path.', 'Take advanced courses.'] },
                { month: 'Month 6', title: 'Career Prep', description: 'Getting ready for the job market.', points: ['Prepare your resume and portfolio.', 'Practice for interviews.'] },
            ];
        }
    });
});

// Function to render all career categories and cards
function renderCareerCategories() {
    const mainCareerSelection = document.getElementById('career-selection-section');
    mainCareerSelection.innerHTML = ''; // Clear existing content

    careerCategoriesData.forEach(category => {
        const categorySection = document.createElement('section');
        categorySection.className = 'career-category';

        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.innerHTML = category.categoryIcon + '<h2>' + category.categoryTitle + '</h2>';
        categorySection.appendChild(categoryHeader);

        const careerCardsGrid = document.createElement('div');
        careerCardsGrid.className = 'career-cards-grid';

        category.careers.forEach(career => {
            const careerCard = document.createElement('div');
            careerCard.className = 'career-card';
            careerCard.setAttribute('data-career', career.id);
            careerCard.innerHTML = `
                <div class="card-icon">${career.icon}</div>
                <h3>${career.title}</h3>
                <p>${career.description}</p>
            `;
            careerCardsGrid.appendChild(careerCard);
        });

        categorySection.appendChild(careerCardsGrid);
        mainCareerSelection.appendChild(categorySection);
    });

    // Re-attach event listeners to new cards
    const newCareerCards = document.querySelectorAll('.career-card');
    newCareerCards.forEach(card => {
        card.addEventListener('click', () => {
            const careerId = card.getAttribute('data-career');
            const selectedCareer = careerCategoriesData
                .flatMap(cat => cat.careers)
                .find(c => c.id === careerId);
            renderRoadmap(selectedCareer);
            careerSelectionSection.classList.remove('active');
            roadmapSection.classList.add('active');
            const header = document.querySelector('.main-header .header-left');
            header.querySelector('.greetres').textContent = 'Career Resources';
            header.querySelector('.subtitle').textContent = 'Explore curated resources to help you grow in your field.';
        });
    });
}

// Function to render roadmap
function renderRoadmap(career) {
    const roadmapTimeline = document.querySelector('.roadmap-timeline');
    roadmapTimeline.innerHTML = ''; // Clear existing timeline

    career.roadmap.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';

        const monthDiv = document.createElement('div');
        monthDiv.className = 'timeline-month';
        monthDiv.textContent = item.month;
        timelineItem.appendChild(monthDiv);

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'timeline-content-wrapper';
        if (index % 2 === 0) {
            contentWrapper.classList.add('left');
        } else {
            contentWrapper.classList.add('right');
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'timeline-content';
        contentDiv.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <ul>
                ${item.points.map(point => `<li>${point}</li>`).join('')}
            </ul>
        `;
        contentWrapper.appendChild(contentDiv);
        timelineItem.appendChild(contentWrapper);

        roadmapTimeline.appendChild(timelineItem);
    });
}

// Initial render
renderCareerCategories();