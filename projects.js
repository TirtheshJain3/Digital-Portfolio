document.addEventListener('DOMContentLoaded', function() {
    // Project data
    const projects = [
        {
            id: 'smart-home',
            title: 'Smart Home Lighting System',
            category: 'iot',
            date: 'May 2023',
            image: 'smart home lighting system.jpeg',
            description: 'An Arduino-based smart home lighting system that automatically adjusts brightness based on ambient light and occupancy. The system can be controlled remotely via a mobile app and includes energy monitoring features.',
            features: [
                'Automatic brightness adjustment based on ambient light',
                'Motion detection for occupancy-based control',
                'Remote control via mobile app (IoT)',
                'Energy consumption monitoring',
                'Scheduling and timer functionality'
            ],
            technologies: ['Arduino', 'C++', 'IoT', 'Bluetooth', 'PIR Sensor', 'LDR'],
            link: '#',
            code: '#'
        },
        {
            id: 'audio-amp',
            title: 'Audio Amplifier Circuit',
            category: 'electronics',
            date: 'December 2022',
            image: 'audio amplifier.jpg',
            description: 'Designed and built a high-quality audio amplifier circuit with 50W output power. The amplifier features low distortion, wide frequency response, and multiple input options.',
            features: [
                '50W RMS output power',
                'Low distortion (THD < 0.1%)',
                'Wide frequency response (20Hz - 20kHz)',
                'Multiple input options (RCA, 3.5mm jack)',
                'Overload and short-circuit protection'
            ],
            technologies: ['PCB Design', 'Analog Circuits', 'Transistors', 'Op-Amps', 'Power Supply'],
            link: '#',
            code: '#'
        },
        {
            id: 'green-energy',
            title: 'Green Energy Solutions',
            category: 'energy',
            date: 'Ongoing',
            image: 'green.jpg',
            description: 'Research project focused on developing affordable and efficient green energy solutions for rural areas. Exploring solar, wind, and hybrid systems with energy storage options.',
            features: [
                'Cost analysis of renewable energy systems',
                'Efficiency optimization techniques',
                'Battery storage solutions',
                'Hybrid system design',
                'Implementation case studies'
            ],
            technologies: ['Solar Power', 'Wind Energy', 'Battery Systems', 'Energy Efficiency', 'Renewables'],
            link: '#',
            code: '#'
        },
        
        {
            id: 'c-projects',
            title: 'C Programming Projects',
            category: 'programming',
            date: '2021 - 2023',
            image: 'C.jpg',
            description: 'Collection of various projects implemented in C programming language, including data structures, algorithms, and system programming concepts.',
            features: [
                'Implementation of data structures',
                'Algorithm visualization',
                'File handling systems',
                'Multithreading applications',
                'Network programming basics'
            ],
            technologies: ['C Programming', 'Data Structures', 'Algorithms', 'Linux', 'System Programming'],
            link: '#',
            code: '#'
        },
        
    ];

    // DOM elements
    const projectsContainer = document.getElementById('projects-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');

    // Display projects
    function displayProjects(filter = 'all') {
        projectsContainer.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = `project-card ${project.category}`;
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <h3>${project.title}</h3>
                        <p>${project.category.charAt(0).toUpperCase() + project.category.slice(1)} Project</p>
                        <button class="btn btn-small view-details" data-id="${project.id}">View Details</button>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="project-tech">
                        ${project.technologies.slice(0, 3).map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });

        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const projectId = this.getAttribute('data-id');
                openProjectModal(projectId);
            });
        });
    }

    // Open project modal
    function openProjectModal(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        // Set modal content
        document.getElementById('modal-project-image').src = project.image;
        document.getElementById('modal-project-image').alt = project.title;
        document.getElementById('modal-project-title').textContent = project.title;
        document.getElementById('modal-project-category').textContent = project.category.charAt(0).toUpperCase() + project.category.slice(1);
        document.getElementById('modal-project-date').textContent = project.date;
        document.getElementById('modal-project-description').textContent = project.description;
        
        // Set technologies
        const techTags = document.getElementById('modal-project-tech');
        techTags.innerHTML = '';
        project.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.textContent = tech;
            techTags.appendChild(tag);
        });
        
        // Set features
        const featuresList = document.getElementById('modal-project-features');
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Set links
        const projectLink = document.getElementById('modal-project-link');
        const codeLink = document.getElementById('modal-project-code');
        projectLink.href = project.link;
        codeLink.href = project.code;
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close project modal
    function closeProjectModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            displayProjects(filter);
        });
    });

    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close modal with button
    modalClose.addEventListener('click', closeProjectModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeProjectModal();
        }
    });

    // Initialize
    displayProjects();
});