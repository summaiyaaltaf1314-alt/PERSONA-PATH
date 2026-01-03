window.showDetail = showDetail;
window.setActiveCategory = setActiveCategory;
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

    // Set initial active state based on current page
    const currentPath = window.location.pathname.split('/').pop() || 'resource.html';
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPath) {
            // Remove all active classes first to ensure only one item is active
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
        }
    });
});


const resourcesData = {
    'Software Engineering': [
        { id: 'swe1', title: 'Advanced JavaScript Concepts', shortDescription: 'Master closures, prototypes, and asynchronous JavaScript.', longDescription: 'Dive deep into the core mechanics of JavaScript. This course covers advanced topics often missed by self-taught developers, including the event loop, scope chains, `this` binding, prototypal inheritance, and modern ES2021+ features. Perfect for preparing for technical interviews or leveling up your development skills.', link: 'https://www.udemy.com/course/javascript-advanced-concepts-tutorial/', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'swe2', title: 'Data Structures & Algorithms', shortDescription: 'Understand the fundamentals of data structures and algorithms.', longDescription: 'A comprehensive guide to common data structures like arrays, linked lists, trees, and graphs, along with essential algorithms for sorting, searching, and optimization. This knowledge is crucial for solving complex problems and passing technical interviews at top tech companies.', link: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'swe3', title: 'Modern React with Hooks', shortDescription: 'Build powerful, scalable web applications with React.', longDescription: 'Learn the latest patterns in React development, including functional components, hooks (useState, useEffect, useContext), state management with Redux Toolkit, and routing with React Router. You\'ll build several projects to solidify your understanding.', link: 'https://react.dev/learn', imageUrl: 'https://i.postimg.cc/8CggGpPL/Modern-React-with-Hooks.png' },
        { id: 'swe4', title: 'CI/CD with Docker & Jenkins', shortDescription: 'Automate your development pipeline for faster releases.', longDescription: 'Explore the world of DevOps by learning how to containerize applications with Docker and build automated testing and deployment pipelines with Jenkins. This course will teach you how to improve code quality and development speed.', link: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/', imageUrl: 'https://i.postimg.cc/CxYg8MkQ/CICD.png' },
        { id: 'swe5', title: 'Node.js and Express', shortDescription: 'Build fast and scalable server-side applications.', longDescription: 'Learn to build robust APIs and back-end services using Node.js and the Express framework. This course covers routing, middleware, database integration with MongoDB, and authentication.', link: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs', imageUrl: 'https://i.postimg.cc/qvm57pL2/Node-js-and-Express.png' },
        { id: 'swe6', title: 'Mastering SQL', shortDescription: 'Unlock the power of relational databases with SQL.', longDescription: 'From basic SELECT statements to complex JOINs and subqueries, this course will make you proficient in SQL. A fundamental skill for any developer working with data.', link: 'https://sqlbolt.com/', imageUrl: 'https://i.postimg.cc/Z5j1y8Th/Mastering-SQL.png' },
        { id: 'swe7', title: 'System Design Interviews', shortDescription: 'Prepare for system design questions in technical interviews.', longDescription: 'Learn how to approach system design problems by breaking them down into manageable components. This course covers concepts like scalability, load balancing, caching, and database design.', link: 'https://www.educative.io/courses/grokking-the-system-design-interview', imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop' },
    ],
    'Accounting & Finance': [
        { id: 'af1', title: 'Financial Modeling', shortDescription: 'Build financial models from scratch for business valuation.', longDescription: 'Learn to build robust financial models in Excel. This course covers everything from basic formulas to advanced techniques like DCF analysis, sensitivity analysis, and scenario planning. Essential for careers in corporate finance, investment banking, and equity research.', link: 'https://www.coursera.org/specializations/wharton-business-financial-modeling', imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop' },
        { id: 'af2', title: 'Intro to Corporate Finance', shortDescription: 'Understand the key concepts of corporate finance.', longDescription: 'A foundational course covering topics like capital budgeting, risk and return, cost of capital, and dividend policy. This course provides the framework for understanding how corporations make financial decisions to maximize shareholder value.', link: 'https://www.coursera.org/learn/corporate-finance-essentials', imageUrl: 'https://i.postimg.cc/qvgGjy89/Intro-to-Corporate-Finance.jpg' },
        { id: 'af3', title: 'Financial Accounting', shortDescription: 'Learn the principles of financial accounting and reporting.', longDescription: 'This course provides a thorough introduction to financial accounting, including the accounting cycle, financial statements, and the analysis of business transactions.', link: 'https://www.coursera.org/learn/wharton-accounting', imageUrl: 'https://i.postimg.cc/sxVYShfj/Financial-Accounting.jpg' },
        { id: 'af4', title: 'Investment Analysis', shortDescription: 'Learn how to analyze and value investment opportunities.', longDescription: 'Explore the tools and techniques used to evaluate stocks, bonds, and other financial assets. This course covers topics like portfolio theory, asset allocation, and security analysis.', link: 'https://www.coursera.org/specializations/investment-management', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop' },
        { id: 'af5', title: 'QuickBooks Pro Training', shortDescription: 'Master the leading accounting software for small businesses.', longDescription: 'Learn how to manage finances, track sales and expenses, and generate financial reports using QuickBooks. This practical course is perfect for business owners and aspiring bookkeepers.', link: 'https://quickbooks.intuit.com/global/training/', imageUrl: 'https://i.postimg.cc/44BtqnNg/Quick-Books-Pro-Training.png' },
        { id: 'af6', title: 'Risk Management', shortDescription: 'Identify, assess, and mitigate financial risks.', longDescription: 'This course introduces the principles of financial risk management, covering market risk, credit risk, and operational risk. Learn the strategies used by corporations to manage uncertainty.', link: 'https://www.coursera.org/learn/financial-risk-management', imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop' },
    ],
    'Admin & Office': [
        { id: 'ao1', title: 'Advanced Microsoft Excel', shortDescription: 'Become an Excel power user with advanced formulas and pivot tables.', longDescription: 'Go beyond the basics of Excel. Learn advanced functions like VLOOKUP, INDEX-MATCH, pivot tables, data validation, and macros to automate tasks and analyze data more effectively. This skill is highly valued in any office environment.', link: 'https://www.udemy.com/course/microsoft-excel-2013-from-beginner-to-advanced-and-beyond/', imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 'ao2', title: 'Effective Business Communication', shortDescription: 'Improve your professional writing and presentation skills.', longDescription: 'Learn how to communicate clearly and professionally in a business context. This course covers email etiquette, report writing, creating compelling presentations, and mastering verbal communication skills for meetings and negotiations.', link: 'https://www.coursera.org/specializations/business-communication', imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop' },
        { id: 'ao3', title: 'Project Management Foundations', shortDescription: 'Learn the basics of project planning and execution.', longDescription: 'This course introduces the project management lifecycle, from initiation and planning to execution, monitoring, and closure. Learn key concepts like scope, schedule, and budget management.', link: 'https://www.coursera.org/professional-certificates/google-project-management', imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop' },
        { id: 'ao4', title: 'Time Management Mastery', shortDescription: 'Boost your productivity and reduce stress.', longDescription: 'Discover proven techniques for prioritizing tasks, avoiding procrastination, and managing your workload effectively. This course will help you achieve a better work-life balance.', link: 'https://www.udemy.com/course/become-a-time-management-master/', imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop' },
        { id: 'ao5', title: 'Microsoft Office Suite', shortDescription: 'Become proficient in Word, PowerPoint, and Outlook.', longDescription: 'Master the essential tools for any office professional. This course provides comprehensive training on the most popular Microsoft Office applications.', link: 'https://support.microsoft.com/en-us/training', imageUrl: 'https://i.postimg.cc/MG9qqkcH/Microsoft-Office-Suiteeee.jpg' },
        { id: 'ao6', title: 'Executive Assistant Training', shortDescription: 'Develop the skills to be an invaluable executive assistant.', longDescription: 'Learn how to manage schedules, coordinate travel, and handle communications with professionalism and efficiency. This course covers the key responsibilities of a top-tier executive assistant.', link: 'https://www.linkedin.com/learning/paths/become-an-executive-assistant', imageUrl: 'https://i.postimg.cc/qRtRFBmr/Executive-Assistant-Training.jpg'},
    ],
    'Customer Service': [
        { id: 'cs1', title: 'Conflict Resolution', shortDescription: 'Learn to de-escalate conflicts and find positive solutions.', longDescription: 'Master the art of handling difficult customers and resolving conflicts effectively. This course teaches active listening, empathy, and proven de-escalation techniques to turn negative experiences into positive outcomes and retain customer loyalty.', link: 'https://www.coursera.org/learn/conflict-resolution-skills', imageUrl: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=2070&auto=format&fit=crop' },
        { id: 'cs2', title: 'Customer Service Foundations', shortDescription: 'Build rapport and provide exceptional customer experiences.', longDescription: 'This course covers the fundamentals of customer service, including communication skills, problem-solving, and building lasting customer relationships.', link: 'https://www.linkedin.com/learning/paths/become-a-customer-service-specialist', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop' },
        { id: 'cs3', title: 'Zendesk for Customer Support', shortDescription: 'Master the Zendesk platform for efficient customer service.', longDescription: 'Learn how to use Zendesk to manage tickets, build a knowledge base, and provide multichannel support. This course is perfect for anyone working in a modern customer support team.', link: 'https://training.zendesk.com/', imageUrl: 'https://i.postimg.cc/vHTPSJMF/Zendesk-for-Customer-Support.png' },
        { id: 'cs4', title: 'Building a Customer-Centric Culture', shortDescription: 'Learn how to put the customer at the heart of your business.', longDescription: 'This course is for leaders who want to build a company culture that prioritizes customer satisfaction. Learn how to empower your team to deliver outstanding service.', link: 'https://www.linkedin.com/learning/creating-a-customer-centric-culture', imageUrl: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=2070&auto=format&fit=crop' },
        { id: 'cs5', title: 'Technical Support Fundamentals', shortDescription: 'Provide effective technical support to customers.', longDescription: 'Learn how to troubleshoot technical issues, communicate complex information clearly, and provide excellent support for software and hardware products.', link: 'https://www.coursera.org/professional-certificates/google-it-support', imageUrl: 'https://i.postimg.cc/B6hTTvjb/Technical-Support-Fundamentals.png' },
        { id: 'cs6', title: 'Customer Success Management', shortDescription: 'Proactively help customers achieve their goals.', longDescription: 'Discover the principles of customer success, from onboarding new clients to driving adoption and identifying expansion opportunities. A key role in any SaaS business.', link: 'https://www.successhacker.co/customer-success-training-programs', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop' },
    ],
    'Human Resources': [
        { id: 'hr1', title: 'Talent Acquisition', shortDescription: 'Learn the fundamentals of recruiting and hiring top talent.', longDescription: 'Explore the full lifecycle of talent acquisition, from sourcing and screening candidates to interviewing, negotiating offers, and onboarding. This course provides practical skills for building a strong and diverse workforce.', link: 'https://www.linkedin.com/learning/paths/become-a-recruiter', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop' },
        { id: 'hr2', title: 'Employee Relations', shortDescription: 'Manage employee relations and create a positive work environment.', longDescription: 'Learn how to handle employee grievances, conduct investigations, and foster a workplace culture built on respect and fairness. This course covers key legal and ethical considerations.', link: 'https://www.shrm.org/resourcesandtools/tools-and-samples/pages/default.aspx', imageUrl: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop' },
        { id: 'hr3', title: 'Compensation and Benefits', shortDescription: 'Design competitive compensation and benefits packages.', longDescription: 'Understand the principles of total rewards. This course covers salary structures, incentive plans, health benefits, and retirement plans to attract and retain top talent.', link: 'https://www.coursera.org/learn/compensation-benefits', imageUrl: 'https://i.postimg.cc/JhxZ8hck/Compensation-and-Benefits.png' },
        { id: 'hr4', title: 'HR Analytics', shortDescription: 'Use data to make informed HR decisions.', longDescription: 'Learn how to collect, analyze, and interpret HR data to improve recruiting, engagement, and retention. This course introduces key metrics and data visualization techniques.', link: 'https://www.coursera.org/learn/wharton-people-analytics', imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop' },
        { id: 'hr5', title: 'Diversity, Equity, and Inclusion', shortDescription: 'Champion DEI initiatives in the workplace.', longDescription: 'Learn how to create a more inclusive and equitable workplace. This course covers topics like unconscious bias, inclusive leadership, and building effective DEI programs.', link: 'https://www.coursera.org/learn/diversity-inclusion-workplace', imageUrl: 'https://i.postimg.cc/C1tZMnZQ/Diversity-Equity-and-Inclusion.png' },
        { id: 'hr6', title: 'Performance Management', shortDescription: 'Develop effective performance review and feedback systems.', longDescription: 'Learn how to set clear goals, provide constructive feedback, and conduct meaningful performance reviews. This course will help you build a high-performance culture.', link: 'https://www.linkedin.com/learning/performance-management-setting-goals-and-managing-performance', imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop' },
    ],
    'Marketing': [
        { id: 'mkt1', title: 'Digital Marketing Fundamentals', shortDescription: 'Understand SEO, SEM, and social media marketing.', longDescription: 'Get a complete overview of the digital marketing landscape. This course covers search engine optimization (SEO), search engine marketing (SEM), content marketing, social media strategy, and email marketing to help you create effective online campaigns.', link: 'https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing', imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop' },
        { id: 'mkt2', title: 'Content Marketing Strategy', shortDescription: 'Create valuable content that attracts and converts customers.', longDescription: 'Learn how to develop a content strategy that aligns with your business goals. This course covers content creation, distribution, and measurement to drive engagement and leads.', link: 'https://academy.hubspot.com/courses/content-marketing', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop' },
        { id: 'mkt3', title: 'Social Media Marketing', shortDescription: 'Build and engage a community on social media platforms.', longDescription: 'Master the art of social media marketing. This course covers platform strategies, content creation, community management, and advertising on platforms like Instagram, Facebook, and LinkedIn.', link: 'https://www.facebook.com/business/learn/social-media-marketing-certificate-coursera', imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop' },
        { id: 'mkt4', title: 'SEO Essentials', shortDescription: 'Improve your website\'s visibility on search engines.', longDescription: 'Learn the fundamentals of search engine optimization, including keyword research, on-page SEO, link building, and technical SEO. Drive organic traffic to your website.', link: 'https://moz.com/beginners-guide-to-seo', imageUrl: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=2070&auto=format&fit=crop' },
        { id: 'mkt5', title: 'Google Ads & PPC', shortDescription: 'Launch and manage profitable pay-per-click campaigns.', longDescription: 'Learn how to create effective ad campaigns on Google Ads. This course covers keyword bidding, ad copywriting, and campaign optimization to maximize your return on investment.', link: 'https://skillshop.exceedlms.com/student/catalog/list?category_ids=2844-google-ads', imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop' },
        { id: 'mkt6', title: 'Email Marketing', shortDescription: 'Build and nurture relationships with email marketing.', longDescription: 'Discover how to create effective email campaigns, from building your list to writing compelling copy and automating workflows. A powerful tool for customer retention.', link: 'https://academy.hubspot.com/courses/email-marketing', imageUrl: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=2070&auto=format&fit=crop' },
    ],
    'Sales': [
        { id: 'sls1', title: 'Strategic Selling', shortDescription: 'Master the art of complex sales and relationship building.', longDescription: 'Learn proven methodologies for navigating complex B2B sales cycles. This course focuses on identifying key decision-makers, understanding customer needs, and building long-term relationships to close high-value deals.', link: 'https://academy.hubspot.com/courses/inbound-sales', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
        { id: 'sls2', title: 'Sales Foundations', shortDescription: 'Learn the core principles of effective selling.', longDescription: 'This course covers the fundamentals of the sales process, from prospecting and qualifying leads to overcoming objections and closing deals. Perfect for new sales professionals.', link: 'https://www.linkedin.com/learning/paths/master-in-demand-professional-soft-skills', imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974&auto=format&fit=crop' },
        { id: 'sls3', title: 'Negotiation Skills', shortDescription: 'Become a more effective negotiator in any situation.', longDescription: 'Learn the strategies and tactics of successful negotiation. This course will help you create win-win outcomes in sales, business, and your personal life.', link: 'https://www.coursera.org/learn/negotiation-skills', imageUrl: 'https://i.postimg.cc/JzmqZ0xs/Negotiation-Skills.png' },
        { id: 'sls4', title: 'Salesforce for Sales Reps', shortDescription: 'Manage your sales pipeline effectively with Salesforce.', longDescription: 'Learn how to use Salesforce to track leads, manage opportunities, and forecast sales. This course provides practical training for using the world\'s leading CRM.', link: 'https://trailhead.salesforce.com/en/users/strailhead/trails/sell-lightning-fast-with-sales-cloud', imageUrl: 'https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?q=80&w=2070&auto=format&fit=crop' },
        { id: 'sls5', title: 'Social Selling', shortDescription: 'Leverage social media to build relationships and find leads.', longDescription: 'Discover how to use platforms like LinkedIn to connect with prospects, build your personal brand, and generate new business opportunities.', link: 'https://www.linkedin.com/learning/social-selling-foundations', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop' },
        { id: 'sls6', title: 'Inside Sales', shortDescription: 'Master the art of selling remotely.', longDescription: 'Learn the best practices for inside sales, including cold calling, email outreach, and virtual presentations. A crucial skill in today\'s digital world.', link: 'https://academy.hubspot.com/lessons/developing-an-inside-sales-strategy', imageUrl: 'https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=2069&auto=format&fit=crop' },
    ],
    'Healthcare': [
        { id: 'hc1', title: 'Medical Terminology', shortDescription: 'Learn the language of healthcare professionals.', longDescription: 'A foundational course for anyone entering the healthcare field. You will learn to understand and use the complex terminology related to anatomy, physiology, diseases, and medical procedures.', link: 'https://www.coursera.org/learn/medical-terminology', imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop' },
        { id: 'hc2', title: 'Anatomy and Physiology', shortDescription: 'Explore the structure and function of the human body.', longDescription: 'This comprehensive course provides a detailed overview of the major body systems, from the skeletal system to the nervous system. Essential for any clinical role.', link: 'https://www.khanacademy.org/science/health-and-medicine', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
        { id: 'hc3', title: 'Healthcare Management', shortDescription: 'Learn the business side of healthcare.', longDescription: 'This course covers the principles of managing healthcare organizations, including finance, operations, and policy. Ideal for aspiring healthcare administrators.', link: 'https://www.coursera.org/browse/health/healthcare-management', imageUrl: 'https://i.postimg.cc/sDzS08W1/healthadmin.jpg' },
        { id: 'hc4', title: 'Medical Billing and Coding', shortDescription: 'Learn how to process medical claims for reimbursement.', longDescription: 'This course provides training on the coding systems used in healthcare (ICD-10, CPT) and the process of medical billing. A high-demand administrative skill.', link: 'https://www.coursera.org/learn/medical-billing-and-coding', imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
        { id: 'hc5', title: 'HIPAA Compliance', shortDescription: 'Understand the regulations protecting patient privacy.', longDescription: 'This course provides a thorough overview of the Health Insurance Portability and Accountability Act (HIPAA), ensuring you understand the legal requirements for handling patient information.', link: 'https://www.hhs.gov/hipaa/for-professionals/index.html', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop' },
        { id: 'hc6', title: 'Pharmacology', shortDescription: 'Learn about the uses and effects of drugs.', longDescription: 'This course introduces the principles of pharmacology, covering how drugs work in the body, their therapeutic uses, and potential side effects. Key for many clinical roles.', link: 'https://www.coursera.org/learn/pharmacology', imageUrl: 'https://i.postimg.cc/MpTnC8pS/pharmacist.jpg' },
    ],
    'Design': [
        { id: 'des1', title: 'UI/UX Design Principles', shortDescription: 'Create intuitive and beautiful user interfaces.', longDescription: 'Learn the fundamentals of user experience (UX) research and user interface (UI) design. This course covers wireframing, prototyping, user testing, and visual design principles to help you create products that users love.', link: 'https://www.coursera.org/professional-certificates/google-ux-design', imageUrl: 'https://i.postimg.cc/CLnyXBH2/UIUX.jpg' },
        { id: 'des2', title: 'Figma for UI Design', shortDescription: 'Master the industry-standard tool for interface design.', longDescription: 'This course provides a comprehensive guide to Figma, from basic tools to advanced features like auto layout, components, and prototyping. Build professional designs and collaborate with your team.', link: 'https://www.figma.com/learn/', imageUrl: 'https://i.postimg.cc/26N3LNjR/Figma-for-UI-Design.jpg' },
        { id: 'des3', title: 'Graphic Design Foundations', shortDescription: 'Learn the principles of color, typography, and layout.', longDescription: 'This course introduces the core concepts of graphic design. You will learn how to use visual elements to communicate effectively and create compelling designs for print and web.', link: 'https://www.coursera.org/specializations/graphic-design', imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop' },
        { id: 'des4', title: 'Adobe Illustrator for Beginners', shortDescription: 'Create stunning vector graphics and illustrations.', longDescription: 'Learn the essential tools and techniques of Adobe Illustrator. This course will guide you through creating logos, icons, and illustrations from scratch.', link: 'https://helpx.adobe.com/illustrator/tutorials.html', imageUrl: 'https://i.postimg.cc/ZnNsq3qV/Adobe-Illustrator-for-Beginners.png' },
        { id: 'des5', title: 'Motion Graphics with After Effects', shortDescription: 'Bring your designs to life with animation.', longDescription: 'This course introduces the fundamentals of motion graphics using Adobe After Effects. Learn how to animate text, create transitions, and add visual effects to your videos.', link: 'https://www.schoolofmotion.com/courses/after-effects-kickstart', imageUrl: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop' },
        { id: 'des6', title: 'User Research and Personas', shortDescription: 'Understand your users to create better products.', longDescription: 'Learn how to conduct effective user research, from interviews and surveys to creating detailed user personas. A critical step in the UX design process.', link: 'https://www.nngroup.com/articles/user-research-basics/', imageUrl: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop' },
    ],
    'Education': [
        { id: 'edu1', title: 'Instructional Design', shortDescription: 'Create effective and engaging learning experiences.', longDescription: 'Explore the principles of instructional design to create educational content that is effective and memorable. This course covers learning theories, curriculum development, and assessment strategies for both online and in-person environments.', link: 'https://www.coursera.org/specializations/instructional-design', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop' },
        { id: 'edu2', title: 'E-Learning Development', shortDescription: 'Build interactive online courses with Articulate Storyline.', longDescription: 'Learn how to create professional e-learning courses. This course covers the features of Articulate Storyline, from creating slides to adding interactivity and assessments.', link: 'https://community.articulate.com/h/e-learning-heroes', imageUrl: 'https://i.postimg.cc/vHSY6xb0/E-Learning-Development.jpg' },
        { id: 'edu3', title: 'Classroom Management', shortDescription: 'Create a positive and productive learning environment.', longDescription: 'This course provides teachers with practical strategies for managing their classrooms effectively. Learn how to set expectations, engage students, and handle challenging behavior.', link: 'https://www.edutopia.org/classroom-management', imageUrl: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=2070&auto=format&fit=crop' },
        { id: 'edu4', title: 'Online Teaching Strategies', shortDescription: 'Engage students in a virtual learning environment.', longDescription: 'Discover best practices for teaching online. This course covers how to design engaging virtual lessons, facilitate online discussions, and use technology to enhance learning.', link: 'https://www.coursera.org/collections/online-teaching-resources', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop' },
        { id: 'edu5', title: 'Corporate Training', shortDescription: 'Design and deliver effective training programs for employees.', longDescription: 'Learn how to conduct needs assessments, design training materials, and facilitate engaging workshops. This course is ideal for aspiring corporate trainers.', link: 'https://www.td.org/education', imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop' },
        { id: 'edu6', title: 'Curriculum Development', shortDescription: 'Design effective curriculum and learning materials.', longDescription: 'This course covers the process of curriculum design, from defining learning objectives to developing assessments. Learn how to create a cohesive and effective learning journey.', link: 'https://www.coursera.org/learn/curriculum-development', imageUrl: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1974&auto=format&fit=crop' },
    ],
};

let activeCategory = 'All Resources';
let selectedResource = null;

function renderCategories() {
    const categories = ['All Resources', ...Object.keys(resourcesData)];
    const buttonsContainer = document.getElementById('category-buttons');
    buttonsContainer.innerHTML = categories.map(category => `
        <button onclick="setActiveCategory('${category}')" class="${activeCategory === category ? 'active' : ''} px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 shadow-sm bg-white text-gray-700 border border-gray-300 hover:bg-indigo-50 hover:border-indigo-300">
            ${category}
        </button>
    `).join('');
}

function renderGrid() {
    const displayedResources = activeCategory === 'All Resources' ? Object.values(resourcesData).flat() : resourcesData[activeCategory] || [];
    const grid = document.getElementById('resources-grid');
    grid.innerHTML = displayedResources.map(resource => `
        <div class="resource-card" onclick="showDetail('${resource.id}')">
            <img src="${resource.imageUrl}" alt="${resource.title}" class="w-full h-40 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2 truncate">${resource.title}</h3>
                <p class="text-gray-500 text-sm h-10">${resource.shortDescription}</p>
                <a href="${resource.link}" target="_blank" rel="noopener noreferrer" class="mt-4 text-xs text-black">${new URL(resource.link).hostname}</a>
            </div>
        </div>
    `).join('');
}

function showDetail(id) {
    const allResources = Object.values(resourcesData).flat();
    selectedResource = allResources.find(r => r.id === id);
    if (selectedResource) {
        document.getElementById('category-buttons').style.display = 'none';
        document.getElementById('resources-grid').style.display = 'none';
        const detail = document.getElementById('resource-detail');
        detail.style.display = 'block';
        document.getElementById('detail-image').src = selectedResource.imageUrl;
        document.getElementById('detail-image').alt = selectedResource.title;
        document.getElementById('detail-title').textContent = selectedResource.title;
        document.getElementById('detail-description').textContent = selectedResource.longDescription;
        const viewResource = document.getElementById('view-resource');
        viewResource.href = selectedResource.link;
        viewResource.target = '_blank';
        viewResource.rel = 'noopener noreferrer';
    }
}




function setActiveCategory(category) {
    activeCategory = category;
    renderCategories();
    renderGrid();
}



document.getElementById('back-to-resources').addEventListener('click', () => {
    selectedResource = null;
    document.getElementById('resource-detail').style.display = 'none';
    document.getElementById('category-buttons').style.display = 'flex';
    document.getElementById('resources-grid').style.display = 'grid';
});

window.onload = () => {
    renderCategories();
    renderGrid();
};
 



