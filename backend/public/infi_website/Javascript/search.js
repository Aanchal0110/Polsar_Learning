// Website Search Functionality
class WebsiteSearch {
    constructor() {
        this.searchData = [];
        this.searchResults = [];
        this.isSearchOpen = false;
        this.init();
    }

    async init() {
        await this.loadSearchData();
        this.setupSearchForm();
        this.createSearchResultsContainer();
    }

    async loadSearchData() {
        // Define searchable pages and their content
        this.searchData = [
            {
                title: "Home",
                url: "/infi_website/HTML/home.html",
                keywords: ["remote sensing", "microwave", "optical", "satellite", "earth observation", "geospatial", "radar", "SAR", "polarimetry"],
                description: "Learn about remote sensing fundamentals, microwave and optical remote sensing techniques"
            },
            {
                title: "Fundamentals",
                url: "/infi_website/HTML/Fundamental.html",
                keywords: ["fundamentals", "basics", "principles", "theory", "electromagnetic spectrum", "sensors", "platforms"],
                description: "Basic principles and fundamentals of remote sensing technology"
            },
            {
                title: "Books",
                url: "/infi_website/HTML/Books.html",
                keywords: ["books", "literature", "textbooks", "references", "reading", "study materials", "publications"],
                description: "Comprehensive collection of books and literature on remote sensing"
            },
            {
                title: "Videos",
                url: "/infi_website/HTML/Videos.html",
                keywords: ["videos", "tutorials", "lectures", "youtube", "learning", "visual", "multimedia"],
                description: "Educational videos and tutorials on remote sensing topics"
            },
            {
                title: "Academicians",
                url: "/infi_website/HTML/academicians.html",
                keywords: ["academicians", "professors", "researchers", "experts", "faculty", "academia"],
                description: "Meet leading academicians and researchers in remote sensing"
            },
            {
                title: "Industry Personnel",
                url: "/infi_website/HTML/Industry Personnel.html",
                keywords: ["industry", "professionals", "experts", "practitioners", "commercial", "business"],
                description: "Industry experts and professionals in remote sensing applications"
            },
            {
                title: "Researchers",
                url: "/infi_website/HTML/Researchers.html",
                keywords: ["researchers", "scientists", "research", "publications", "studies", "investigations"],
                description: "Leading researchers and their contributions to remote sensing"
            },
            {
                title: "Data Download",
                url: "/infi_website/HTML/datadownload.html",
                keywords: ["data", "download", "datasets", "satellite data", "free data", "open data", "resources"],
                description: "Download satellite data and remote sensing datasets"
            },
            {
                title: "Open Source Software",
                url: "/infi_website/HTML/opensource.html",
                keywords: ["software", "open source", "tools", "applications", "processing", "analysis", "GIS", "ENVI", "SNAP"],
                description: "Open source and proprietary software for remote sensing analysis"
            },
            {
                title: "Education",
                url: "/infi_website/HTML/education.html",
                keywords: ["education", "universities", "colleges", "courses", "programs", "degrees", "institutions"],
                description: "Educational institutions offering remote sensing programs"
            },
            {
                title: "Career",
                url: "/infi_website/HTML/career.html",
                keywords: ["career", "jobs", "opportunities", "employment", "professions", "career paths"],
                description: "Career opportunities and job prospects in remote sensing"
            },
            {
                title: "Events",
                url: "/infi_website/HTML/event.html",
                keywords: ["events", "conferences", "workshops", "seminars", "meetings", "symposiums"],
                description: "Upcoming events and conferences in remote sensing"
            },
            {
                title: "Contact Us",
                url: "/infi_website/HTML/contact.html",
                keywords: ["contact", "support", "help", "inquiry", "feedback", "communication"],
                description: "Get in touch with us for support and inquiries"
            }
        ];
    }

    setupSearchForm() {
        const searchForm = document.querySelector('.search-form');
        const searchInput = searchForm.querySelector('input');
        const searchButton = searchForm.querySelector('button');

        // Prevent form submission and handle search
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.performSearch(searchInput.value);
        });

        // Real-time search as user types
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length >= 2) {
                this.performSearch(query);
            } else {
                this.hideSearchResults();
            }
        });

        // Handle search button click
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.performSearch(searchInput.value);
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target) && !this.searchResultsContainer.contains(e.target)) {
                this.hideSearchResults();
            }
        });
    }

    createSearchResultsContainer() {
        this.searchResultsContainer = document.createElement('div');
        this.searchResultsContainer.className = 'search-results-container';
        this.searchResultsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-height: 400px;
            overflow-y: auto;
            z-index: 1001;
            display: none;
        `;
        
        const searchForm = document.querySelector('.search-form');
        searchForm.style.position = 'relative';
        searchForm.appendChild(this.searchResultsContainer);
    }

    performSearch(query) {
        if (!query.trim()) {
            this.hideSearchResults();
            return;
        }

        const searchTerm = query.toLowerCase();
        this.searchResults = [];

        // Search through all data
        this.searchData.forEach(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const keywordMatch = item.keywords.some(keyword => 
                keyword.toLowerCase().includes(searchTerm)
            );
            const descriptionMatch = item.description.toLowerCase().includes(searchTerm);

            if (titleMatch || keywordMatch || descriptionMatch) {
                let score = 0;
                if (titleMatch) score += 3;
                if (keywordMatch) score += 2;
                if (descriptionMatch) score += 1;

                this.searchResults.push({
                    ...item,
                    score,
                    matchedTerm: searchTerm
                });
            }
        });

        // Sort by relevance score
        this.searchResults.sort((a, b) => b.score - a.score);
        this.displaySearchResults();
    }

    displaySearchResults() {
        if (this.searchResults.length === 0) {
            this.searchResultsContainer.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #666;">
                    <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
                    <p>No results found</p>
                    <p style="font-size: 12px; margin-top: 5px;">Try different keywords</p>
                </div>
            `;
        } else {
            const resultsHTML = this.searchResults.map(result => `
                <div class="search-result-item" style="
                    padding: 12px 16px;
                    border-bottom: 1px solid #f0f0f0;
                    cursor: pointer;
                    transition: background-color 0.2s;
                " onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='white'">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="
                            width: 40px;
                            height: 40px;
                            background: #003366;
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 16px;
                        ">
                            <i class="fas fa-${this.getIconForPage(result.title)}"></i>
                        </div>
                        <div style="flex: 1;">
                            <div style="
                                font-weight: 600;
                                color: #003366;
                                margin-bottom: 4px;
                                font-size: 14px;
                            ">${this.highlightMatch(result.title, result.matchedTerm)}</div>
                            <div style="
                                color: #666;
                                font-size: 12px;
                                line-height: 1.4;
                            ">${result.description}</div>
                        </div>
                        <div style="
                            color: #999;
                            font-size: 12px;
                            margin-left: 8px;
                        ">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            `).join('');

            this.searchResultsContainer.innerHTML = `
                <div style="
                    padding: 8px 16px;
                    background: #f8f9fa;
                    border-bottom: 1px solid #e9ecef;
                    font-size: 12px;
                    color: #666;
                    font-weight: 500;
                ">
                    ${this.searchResults.length} result${this.searchResults.length !== 1 ? 's' : ''} found
                </div>
                ${resultsHTML}
            `;

            // Add click handlers to results
            this.searchResultsContainer.querySelectorAll('.search-result-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    window.location.href = this.searchResults[index].url;
                });
            });
        }

        this.searchResultsContainer.style.display = 'block';
    }

    highlightMatch(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark style="background: #ffeb3b; padding: 1px 2px; border-radius: 2px;">$1</mark>');
    }

    getIconForPage(title) {
        const iconMap = {
            'Home': 'home',
            'Fundamentals': 'book-open',
            'Books': 'book',
            'Videos': 'video',
            'Academicians': 'user-graduate',
            'Industry Personnel': 'user-tie',
            'Researchers': 'user-edit',
            'Data Download': 'download',
            'Open Source Software': 'code',
            'Education': 'graduation-cap',
            'Career': 'briefcase',
            'Events': 'calendar',
            'Contact Us': 'envelope'
        };
        return iconMap[title] || 'file';
    }

    hideSearchResults() {
        this.searchResultsContainer.style.display = 'none';
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WebsiteSearch();
}); 