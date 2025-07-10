document.addEventListener('DOMContentLoaded', function() {
    // Sample image data - replace with your actual images
    const imageData = [
        {
            id: 1,
            title: "Golden Hour in Delhi",
            location: "Delhi, India",
            tags: ["Delhi", "Connaught Place", "Urban"],
            url: "https://res.cloudinary.com/dt69t3xbw/image/upload/v1752154566/IMG20250623194907_as2t4v.jpg",
            downloadUrl: "https://res.cloudinary.com/dt69t3xbw/image/upload/v1752154566/IMG20250623194907_as2t4v.jpg"
        },
        {
            id: 2,
            title: "Delhi Metro Night Phtographs",
            location: "Delhi Metro, India",
            tags: ["Delhi", "Dark", "Metro"],
            url: "https://res.cloudinary.com/dt69t3xbw/image/upload/v1752154591/IMG20250710112504_zkvhpa.jpg",
            downloadUrl: "https://res.cloudinary.com/dt69t3xbw/image/upload/v1752154591/IMG20250710112504_zkvhpa.jpg"
        },
        {
            id: 3,
            title: "Bihar Landscape",
            location: "Bihar, India",
            tags: ["Bihar", "Rural", "Village", "Landscape"],
            url: "https://res.cloudinary.com/dt69t3xbw/image/upload/v1752154392/IMG20250702191344_ntk4qn.jpg",
            downloadUrl: "https://res.cloudinary.com/dt69t3xbw/image/upload/v1752154392/IMG20250702191344_ntk4qn.jpg"
        },
        {
            id: 4,
            title: "Railway Tracks",
            location: "New Delhi",
            tags: ["Railway", "Black & White", "Minimal"],
            url: "https://res.cloudinary.com/dt69t3xbw/image/upload/v1752154496/IMG20250627131334_puqpfj.jpg",
            downloadUrl: "https://res.cloudinary.com/dt69t3xbw/image/upload/v1752154496/IMG20250627131334_puqpfj.jpg"
        },
        {
            id: 5,
            title: "Beach Sunset",
            location: "Goa, India",
            tags: ["Beach", "Sunset", "Nature"],
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
            downloadUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"
        },
        {
            id: 6,
            title: "Street Life",
            location: "Delhi, India",
            tags: ["Street", "Urban", "People"],
            url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
            downloadUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
        },
        {
            id: 7,
            title: "Misty Mountains",
            location: "Himalayas, India",
            tags: ["Nature", "Mountains", "Fog"],
            url: "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            downloadUrl: "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 8,
            title: "Desert Road",
            location: "Rajasthan, India",
            tags: ["Desert", "Road", "Minimal"],
            url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
            downloadUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
        }
    ];

    // Extract all unique tags
    const allTags = [...new Set(imageData.flatMap(img => img.tags))];

    // DOM Elements
    const imageGrid = document.getElementById('image-grid');
    const filterChips = document.getElementById('filter-chips');
    const searchInput = document.getElementById('search-input');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const imageTitle = document.getElementById('image-title');
    const imageLocation = document.getElementById('image-location');
    const modalTags = document.getElementById('modal-tags');
    const closeModal = document.querySelector('.close-modal');
    const downloadBtn = document.querySelector('.download-btn');
    const shareBtn = document.querySelector('.share-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const fabDownload = document.querySelector('.download-fab');
    const fabShare = document.querySelector('.share-fab');

    // State
    let currentImages = [];
    let filteredImages = [];
    let activeFilters = [];
    let currentSearch = '';
    let currentImageIndex = 0;
    let isLoading = false;
    let imagesPerLoad = 8;
    let loadedImagesCount = 0;

    // Initialize
    function init() {
        currentImages = [...imageData];
        filteredImages = [...imageData];
        loadedImagesCount = Math.min(imagesPerLoad, currentImages.length);
        
        renderFilterChips();
        renderImages(currentImages.slice(0, loadedImagesCount));
        setupEventListeners();
    }

    // Render filter chips
    function renderFilterChips() {
        filterChips.innerHTML = '';
        
        // Add "All" filter
        const allChip = document.createElement('div');
        allChip.classList.add('filter-chip', 'active');
        allChip.textContent = 'All';
        allChip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
            allChip.classList.add('active');
            activeFilters = [];
            applyFilters();
        });
        filterChips.appendChild(allChip);
        
        // Add tag filters
        allTags.forEach(tag => {
            const chip = document.createElement('div');
            chip.classList.add('filter-chip');
            chip.textContent = tag;
            chip.addEventListener('click', () => {
                chip.classList.toggle('active');
                if (chip.classList.contains('active')) {
                    activeFilters.push(tag);
                } else {
                    activeFilters = activeFilters.filter(t => t !== tag);
                }
                applyFilters();
            });
            filterChips.appendChild(chip);
        });
    }

    // Render images
    function renderImages(images) {
        imageGrid.innerHTML = '';
        
        images.forEach((image, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item', 'fade-in');
            gridItem.style.animationDelay = `${index * 0.1}s`;
            
            gridItem.innerHTML = `
                <img src="${image.url}" alt="${image.title}" loading="lazy">
                <div class="grid-item-info">
                    <h4 class="grid-item-title">${image.title}</h4>
                    <p class="grid-item-location">${image.location}</p>
                    <div class="grid-item-tags">
                        ${image.tags.map(tag => `<span class="grid-item-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            gridItem.addEventListener('click', () => openModal(image));
            imageGrid.appendChild(gridItem);
        });
    }

    // Apply filters and search
    function applyFilters() {
        let filtered = [...imageData];
        
        // Apply tag filters
        if (activeFilters.length > 0) {
            filtered = filtered.filter(image => 
                image.tags.some(tag => activeFilters.includes(tag))
            );
        }
        
        // Apply search
        if (currentSearch.trim() !== '') {
            const searchTerm = currentSearch.toLowerCase();
            filtered = filtered.filter(image => 
                image.title.toLowerCase().includes(searchTerm) ||
                image.location.toLowerCase().includes(searchTerm) ||
                image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        filteredImages = filtered;
        loadedImagesCount = Math.min(imagesPerLoad, filteredImages.length);
        renderImages(filteredImages.slice(0, loadedImagesCount));
        
        // Update "All" chip
        const allChip = document.querySelector('.filter-chip:first-child');
        if (activeFilters.length === 0 && currentSearch.trim() === '') {
            allChip.classList.add('active');
        } else {
            allChip.classList.remove('active');
        }
    }

    // Open image modal
    function openModal(image) {
        modalImage.src = image.url;
        imageTitle.textContent = image.title;
        imageLocation.textContent = image.location;
        
        modalTags.innerHTML = '';
        image.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.classList.add('image-tag');
            tagEl.textContent = tag;
            modalTags.appendChild(tagEl);
        });
        
        // Set download and share URLs
        downloadBtn.onclick = () => downloadImage(image.downloadUrl);
        shareBtn.onclick = () => shareImage(image.url, image.title);
        fabDownload.onclick = () => downloadImage(image.downloadUrl);
        fabShare.onclick = () => shareImage(image.url, image.title);
        
        // Set current image index
        currentImageIndex = filteredImages.findIndex(img => img.id === image.id);
        
        // Show modal
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Extract dominant color and set as background
        extractDominantColor(image.url);
    }

    // Close modal
    function closeModalHandler() {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Download image
    function downloadImage(url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = `seenbysaif-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Share image
    function shareImage(url, title) {
        if (navigator.share) {
            navigator.share({
                title: `${title} | SeenBySaif`,
                text: `Check out this amazing photo by @seenbysaif`,
                url: url
            }).catch(err => {
                console.log('Error sharing:', err);
                copyToClipboard(url);
            });
        } else {
            copyToClipboard(url);
        }
    }

    // Copy to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Link copied to clipboard!');
        });
    }

    // Extract dominant color from image
    function extractDominantColor(imageUrl) {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        
        img.onload = function() {
            const colorThief = new ColorThief();
            let color;
            
            try {
                color = colorThief.getColor(img);
            } catch (e) {
                console.log('Error extracting color:', e);
                return;
            }
            
            // Convert RGB to HSL for better color manipulation
            const [r, g, b] = color;
            const hsl = rgbToHsl(r, g, b);
            
            // Create a darker shade for the background
            const darkerHsl = [hsl[0], hsl[1], Math.max(5, hsl[2] - 15)];
            const darkerRgb = hslToRgb(...darkerHsl);
            
            // Apply the color to modal background
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.backgroundColor = `rgba(${darkerRgb[0]}, ${darkerRgb[1]}, ${darkerRgb[2]}, 0.7)`;
        };
    }

    // RGB to HSL conversion
    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    }

    // HSL to RGB conversion
    function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    // Load more images
    function loadMoreImages() {
        if (isLoading) return;
        
        isLoading = true;
        loadMoreBtn.classList.add('loading');
        
        // Simulate loading delay
        setTimeout(() => {
            const newImages = filteredImages.slice(loadedImagesCount, loadedImagesCount + imagesPerLoad);
            renderMoreImages(newImages);
            loadedImagesCount += newImages.length;
            
            isLoading = false;
            loadMoreBtn.classList.remove('loading');
            
            // Hide load more button if all images are loaded
            if (loadedImagesCount >= filteredImages.length) {
                loadMoreBtn.style.display = 'none';
            }
        }, 1000);
    }

    // Render additional images
    function renderMoreImages(images) {
        images.forEach((image, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item', 'fade-in');
            gridItem.style.animationDelay = `${index * 0.1}s`;
            
            gridItem.innerHTML = `
                <img src="${image.url}" alt="${image.title}" loading="lazy">
                <div class="grid-item-info">
                    <h4 class="grid-item-title">${image.title}</h4>
                    <p class="grid-item-location">${image.location}</p>
                    <div class="grid-item-tags">
                        ${image.tags.map(tag => `<span class="grid-item-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            gridItem.addEventListener('click', () => openModal(image));
            imageGrid.appendChild(gridItem);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search input
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            applyFilters();
        });
        
        // Load more button
        loadMoreBtn.addEventListener('click', loadMoreImages);
        
        // Close modal
        closeModal.addEventListener('click', closeModalHandler);
        document.querySelector('.modal-backdrop').addEventListener('click', closeModalHandler);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (imageModal.style.display === 'flex') {
                if (e.key === 'Escape') {
                    closeModalHandler();
                } else if (e.key === 'ArrowRight') {
                    navigateModal(1);
                } else if (e.key === 'ArrowLeft') {
                    navigateModal(-1);
                }
            }
        });
        
        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);
        
        // Swipe gestures for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (imageModal.style.display !== 'flex') return;
            
            if (touchEndX < touchStartX - 50) {
                navigateModal(1); // Swipe left
            } else if (touchEndX > touchStartX + 50) {
                navigateModal(-1); // Swipe right
            }
        }
    }

    // Navigate between images in modal
    function navigateModal(direction) {
        const newIndex = currentImageIndex + direction;
        
        if (newIndex >= 0 && newIndex < filteredImages.length) {
            currentImageIndex = newIndex;
            openModal(filteredImages[currentImageIndex]);
        }
    }

    // Toggle dark/light theme
    function toggleTheme() {
        const html = document.documentElement;
        const isDark = html.classList.contains('dark');
        
        if (isDark) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Check for saved theme preference
    function checkThemePreference() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const html = document.documentElement;
        
        if (savedTheme === 'dark') {
            html.classList.add('dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            html.classList.remove('dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Initialize the app
    checkThemePreference();
    init();
});
