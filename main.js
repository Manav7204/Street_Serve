// Sample data for materials
const sampleMaterials = [
  {
    id: 1,
    name: "Premium Basmati Rice",
    price: "₹85 per kg",
    quantity: "500kg available",
    location: "Mumbai, Maharashtra",
    supplier: "Rice Traders Co.",
    trustScore: 4.8,
    image: "🌾",
    description: "High-quality aged basmati rice, perfect for biryanis and pulao",
  },
  {
    id: 2,
    name: "Fresh Red Onions",
    price: "₹25 per kg",
    quantity: "1000kg available",
    location: "Nashik, Maharashtra",
    supplier: "Onion Suppliers Ltd.",
    trustScore: 4.5,
    image: "🧅",
    description: "Fresh red onions, directly from farms",
  },
  {
    id: 3,
    name: "Organic Tomatoes",
    price: "₹40 per kg",
    quantity: "300kg available",
    location: "Pune, Maharashtra",
    supplier: "Green Farms",
    trustScore: 4.9,
    image: "🍅",
    description: "Organic tomatoes, pesticide-free",
  },
  {
    id: 4,
    name: "Wheat Flour",
    price: "₹35 per kg",
    quantity: "800kg available",
    location: "Delhi, NCR",
    supplier: "Flour Mills Inc.",
    trustScore: 4.3,
    image: "🌾",
    description: "Fine quality wheat flour for all cooking needs",
  },
  {
    id: 5,
    name: "Cooking Oil",
    price: "₹120 per liter",
    quantity: "200L available",
    location: "Bangalore, Karnataka",
    supplier: "Oil Distributors",
    trustScore: 4.6,
    image: "🛢️",
    description: "Refined sunflower oil, healthy and pure",
  },
  {
    id: 6,
    name: "Green Chilies",
    price: "₹60 per kg",
    quantity: "150kg available",
    location: "Chennai, Tamil Nadu",
    supplier: "Spice Traders",
    trustScore: 4.4,
    image: "🌶️",
    description: "Fresh green chilies, perfect spice level",
  },
]

// Sample sales history data
const salesHistory = [
  {
    id: 1,
    name: "Premium Basmati Rice",
    price: "₹85 per kg",
    quantity: "100kg sold",
    location: "Mumbai, Maharashtra",
    status: "Active",
    image: "🌾",
    postedDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Wheat Flour",
    price: "₹35 per kg",
    quantity: "200kg sold",
    location: "Mumbai, Maharashtra",
    status: "Sold Out",
    image: "🌾",
    postedDate: "2024-01-08",
  },
]

// Pagination variables
let currentPage = 1
const itemsPerPage = 6
let filteredMaterials = [...sampleMaterials]

// Navigation functions
function goHome() {
  // Determine which home page to go to based on current page
  const currentPath = window.location.pathname
  if (
    currentPath.includes("supplier") ||
    currentPath.includes("post_supply") ||
    currentPath.includes("sales_history")
  ) {
    window.location.href = "supplier.html"
  } else {
    window.location.href = "index.html"
  }
}

// Marketplace functions
function loadMaterials() {
  const materialsGrid = document.getElementById("materialsGrid")
  if (!materialsGrid) return

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const materialsToShow = filteredMaterials.slice(startIndex, endIndex)

  materialsGrid.innerHTML = ""

  materialsToShow.forEach((material) => {
    const materialCard = createMaterialCard(material)
    materialsGrid.appendChild(materialCard)
  })

  updatePagination()
}

function createMaterialCard(material) {
  const card = document.createElement("div")
  card.className = "material-card"

  const stars = "⭐".repeat(Math.floor(material.trustScore))

  card.innerHTML = `
        <div class="material-image">${material.image}</div>
        <div class="material-info">
            <h3>${material.name}</h3>
            <div class="material-price">${material.price}</div>
            <div class="material-details">${material.quantity}</div>
            <div class="material-location">📍 ${material.location}</div>
            <div class="trust-score">
                <span class="stars">${stars}</span>
                <span>${material.trustScore} (${material.supplier})</span>
            </div>
            <div class="button-group">
              <button class="contact-btn" onclick="contactSupplier('${material.supplier}')">Contact Supplier</button>
               <button class="buy-btn" onclick="buyMaterial('${material.name}')">Buy Now</button>
            </div>
        </div>
    `

  return card
}

function filterMaterials() {
  const searchInput = document.getElementById("searchInput")
  if (!searchInput) return

  const searchTerm = searchInput.value.toLowerCase()
  filteredMaterials = sampleMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchTerm) ||
      material.location.toLowerCase().includes(searchTerm) ||
      material.supplier.toLowerCase().includes(searchTerm),
  )

  currentPage = 1
  loadMaterials()
}

function changePage(direction) {
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage)
  const newPage = currentPage + direction

  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage
    loadMaterials()
  }
}

function updatePagination() {
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage)
  const pageInfo = document.getElementById("pageInfo")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`
  if (prevBtn) prevBtn.disabled = currentPage === 1
  if (nextBtn) nextBtn.disabled = currentPage === totalPages
}

function contactSupplier(supplierName) {
  alert(`Contacting ${supplierName}... In a real app, this would open a chat or show contact details.`)
}

// Sales history functions
function loadSalesHistory() {
  const salesGrid = document.getElementById("salesGrid")
  if (!salesGrid) return

  salesGrid.innerHTML = ""

  salesHistory.forEach((item) => {
    const card = createSalesCard(item)
    salesGrid.appendChild(card)
  })
}

function createSalesCard(item) {
  const card = document.createElement("div")
  card.className = "material-card"

  const statusColor = item.status === "Active" ? "#27ae60" : "#e74c3c"

  card.innerHTML = `
        <div class="material-image">${item.image}</div>
        <div class="material-info">
            <h3>${item.name}</h3>
            <div class="material-price">${item.price}</div>
            <div class="material-details">${item.quantity}</div>
            <div class="material-location">📍 ${item.location}</div>
            <div style="color: ${statusColor}; font-weight: bold; margin: 0.5rem 0;">
                Status: ${item.status}
            </div>
            <div style="color: #7f8c8d; font-size: 0.9rem;">
                Posted: ${item.postedDate}
            </div>
        </div>
    `

  return card
}

// Form submission functions
function submitRequirement(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const requirement = {
    material: formData.get("material"),
    quantity: formData.get("quantity"),
    location: formData.get("location"),
    deliveryDate: formData.get("deliveryDate"),
    budget: formData.get("budget"),
    notes: formData.get("notes"),
  }

  console.log("Requirement posted:", requirement)
  alert("Requirement posted successfully! Suppliers will be notified.")

  // Reset form
  event.target.reset()
}

function submitSupply(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const supply = {
    materialName: formData.get("materialName"),
    availableQuantity: formData.get("availableQuantity"),
    pricePerUnit: formData.get("pricePerUnit"),
    supplierLocation: formData.get("supplierLocation"),
    description: formData.get("description"),
    minOrder: formData.get("minOrder"),
  }

  console.log("Supply added:", supply)
  alert("Material added to inventory successfully! It will appear in the marketplace.")

  // Reset form
  event.target.reset()
}

// Review functions
let selectedRating = 0

function initializeStarRating() {
  const stars = document.querySelectorAll(".star")
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      selectedRating = index + 1
      updateStarDisplay()
      document.getElementById("rating").value = selectedRating
    })

    star.addEventListener("mouseover", () => {
      highlightStars(index + 1)
    })
  })

  const starRating = document.querySelector(".star-rating")
  if (starRating) {
    starRating.addEventListener("mouseleave", () => {
      updateStarDisplay()
    })
  }
}

function highlightStars(rating) {
  const stars = document.querySelectorAll(".star")
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active")
    } else {
      star.classList.remove("active")
    }
  })
}

function updateStarDisplay() {
  highlightStars(selectedRating)
}

function submitReview(event) {
  event.preventDefault()

  if (selectedRating === 0) {
    alert("Please select a rating before submitting.")
    return
  }

  const formData = new FormData(event.target)
  const review = {
    rating: selectedRating,
    onTime: formData.get("onTime"),
    quantityAccurate: formData.get("quantityAccurate"),
    reviewText: formData.get("reviewText"),
  }

  console.log("Review submitted:", review)
  alert("Thank you for your review! This helps build trust in our community.")

  // Reset form
  event.target.reset()
  selectedRating = 0
  updateStarDisplay()
}

// Initialize page-specific functionality
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname

  if (currentPath.includes("marketplace.html")) {
    loadMaterials()
  } else if (currentPath.includes("sales_history.html")) {
    loadSalesHistory()
  } else if (currentPath.includes("review.html")) {
    initializeStarRating()
  }
})

// Utility functions
function showAlert(message, type = "info") {
  // Simple alert for now, can be enhanced with custom modal
  alert(message)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN")
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}
// ADD-Product
document.getElementById("productForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("materialName", document.getElementById("materialName").value);
  formData.append("availableQuantity", document.getElementById("availableQuantity").value);
  formData.append("pricePerUnit", document.getElementById("pricePerUnit").value);
  formData.append("supplierLocation", document.getElementById("supplierLocation").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("minOrder", document.getElementById("minOrder").value);
  const imageInput = document.getElementById("image");
  if (imageInput.files.length > 0) {
    formData.append("image", imageInput.files[0]);
  }

  const res = await fetch("http://localhost:8000/add_product", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    alert("Product added");
    window.location.href = "marketplace.html";
  } else {
    alert("Failed to add product");
  }
});
