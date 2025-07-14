// Sample menu data
const menuItems = [{
        id: 1,
        name: "Pour Over",
        description: "Single-origin coffee brewed to perfection with our V60 method",
        price: 4.50,
        category: "coffee",
        image: "https://plus.unsplash.com/premium_photo-1670333242751-0c517a2ce0d6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        name: "Cold Brew",
        description: "Smooth, rich cold brew steeped for 18 hours",
        price: 5.00,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?q=80&w=419&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        name: "Latte",
        description: "Espresso with steamed milk and light foam",
        price: 4.75,
        category: "espresso",
        image: "https://images.unsplash.com/photo-1550948309-0d8983dbdcc3?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 4,
        name: "Cappuccino",
        description: "Equal parts espresso, steamed milk, and foam",
        price: 4.50,
        category: "espresso",
        image: "https://media.istockphoto.com/id/1366672341/photo/glass-with-ice-and-coffee.jpg?s=1024x1024&w=is&k=20&c=CnG5bD2gXWo3ACbeNWrjhDI8gMh5qdgx6jI2p3i7UYU="
    },
    {
        id: 5,
        name: "Matcha Latte",
        description: "Ceremonial grade matcha with steamed milk",
        price: 5.25,
        category: "tea",
        image: "https://media.istockphoto.com/id/1862460349/photo/a-cup-of-latte-and-matcha-latte-on-white-table.jpg?s=1024x1024&w=is&k=20&c=JRyGqaFl8xjBr9EphuIdtoQSd7Hlm9cD_NjLyF7KCqY="
    },
    {
        id: 6,
        name: "Chai Latte",
        description: "Spiced chai tea with steamed milk",
        price: 4.75,
        category: "tea",
        image: "https://images.unsplash.com/photo-1561336526-2914f13ceb36?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 7,
        name: "Almond Croissant",
        description: "Flaky croissant filled with almond cream",
        price: 3.75,
        category: "pastry",
        image: "https://media.istockphoto.com/id/1615993303/photo/croissants-on-a-grid-in-bakery-filled-with-cream-chocolate-topping-and-almond-flakes.jpg?s=1024x1024&w=is&k=20&c=Heev6T6G9yoN3XpD4mTRghRnmeviLhX9EFyTaotq92I="
    },
    {
        id: 8,
        name: "Blueberry Muffin",
        description: "Moist muffin packed with fresh blueberries",
        price: 3.50,
        category: "pastry",
        image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
];

// DOM elements
const menuItemsContainer = document.getElementById('menu-items');
const menuCategoryBtns = document.querySelectorAll('.menu-category-btn');
const menuItemModal = document.querySelector('.modal');
const menuItemModalContent = document.getElementById('menu-item-modal-content');
const openMobileMenuBtn = document.querySelector('.open-mobile-menu');
const closeMobileMenuBtn = document.querySelector('.close-mobile-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const closeModalBtn = document.querySelector('.close-modal');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderMenuItems('all');
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Menu category buttons
    menuCategoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            menuCategoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderMenuItems(category);
        });
    });

    // Mobile menu
    openMobileMenuBtn.addEventListener('click', toggleMobileMenu);
    closeMobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Modal
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    menuItemModal.addEventListener('click', function(e) {
        if (e.target === menuItemModal) {
            closeModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuItemModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Render menu items based on category
function renderMenuItems(category) {
    menuItemsContainer.innerHTML = '';

    const filteredItems = category === 'all' ?
        menuItems :
        menuItems.filter(item => item.category === category);

    if (filteredItems.length === 0) {
        menuItemsContainer.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <h3 class="text-xl font-bold mb-2">No items found</h3>
                        <p class="text-gray-600">Try selecting a different category</p>
                    </div>
                `;
        return;
    }

    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item bg-white rounded-lg overflow-hidden';
        menuItem.innerHTML = `
                    <div class="relative h-48 overflow-hidden">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold">${item.name}</h3>
                            <span class="text-lg font-semibold text-[#6F4E37]">$${item.price.toFixed(2)}</span>
                        </div>
                        <p class="text-gray-600 mb-4">${item.description}</p>
                        <button class="w-full py-2 bg-[#6F4E37] text-white rounded-lg font-medium hover:bg-[#5a3d2a] transition view-item-btn"
                            data-item-id="${item.id}">
                            View Details
                        </button>
                    </div>
                `;
        menuItemsContainer.appendChild(menuItem);
    });

    // Add event listeners to view buttons
    document.querySelectorAll('.view-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.itemId);
            showMenuItemDetails(itemId);
        });
    });
}

// Show menu item details in modal
function showMenuItemDetails(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    menuItemModalContent.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-gray-100 rounded-lg overflow-hidden">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold mb-2">${item.name}</h2>
                        <div class="text-xl font-semibold text-[#6F4E37] mb-4">$${item.price.toFixed(2)}</div>
                        <p class="text-gray-600 mb-6">${item.description}</p>
                        
                        <div class="mb-6">
                            <h3 class="font-semibold mb-2">Customize Your Order</h3>
                            <div class="space-y-3">
                                <div class="flex items-center">
                                    <input type="radio" id="size-small" name="size" class="mr-2" checked>
                                    <label for="size-small">Small (12oz)</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="radio" id="size-medium" name="size" class="mr-2">
                                    <label for="size-medium">Medium (16oz) +$0.50</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="radio" id="size-large" name="size" class="mr-2">
                                    <label for="size-large">Large (20oz) +$1.00</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col sm:flex-row gap-3">
                            <button class="flex-1 py-3 bg-[#6F4E37] text-white rounded-lg font-medium hover:bg-[#5a3d2a] transition">
                                Add to Order
                            </button>
                            <button class="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition close-modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            `;

    openModal();
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
}

// Open modal
function openModal() {
    menuItemModal.classList.add('active');
    document.body.classList.add('overflow-hidden');
}

// Close modal
function closeModal() {
    menuItemModal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
    });
});
