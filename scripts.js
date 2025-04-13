document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector(".header")
  const isHomePage = document.body.classList.contains("home-page")

  if (isHomePage) {
    header.classList.add("header-transparent")
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.remove("header-transparent")
    } else if (isHomePage) {
      header.classList.add("header-transparent")
    }
  })

  // Mobile menu
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenuCloseButton = document.querySelector(".mobile-menu-close")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.add("open")
    })
  }

  if (mobileMenuCloseButton && mobileMenu) {
    mobileMenuCloseButton.addEventListener("click", () => {
      mobileMenu.classList.remove("open")
    })
  }

  // Tabs
  const tabs = document.querySelectorAll(".tab")
  const tabContents = document.querySelectorAll(".tab-content")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab")

      // Remove active class from all tabs and contents
      tabs.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active")
      document.getElementById(target).classList.add("active")
    })
  })

  // Vehicle gallery
  const mainImage = document.querySelector(".main-image")
  const thumbnails = document.querySelectorAll(".thumbnail")
  const prevButton = document.querySelector(".gallery-prev")
  const nextButton = document.querySelector(".gallery-next")

  if (mainImage && thumbnails.length > 0) {
    let currentIndex = 0
    const images = Array.from(thumbnails).map((thumb) => thumb.querySelector("img").src)

    // Set initial active thumbnail
    thumbnails[0].classList.add("active")

    // Thumbnail click
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        mainImage.src = images[index]
        currentIndex = index

        // Update active thumbnail
        thumbnails.forEach((t) => t.classList.remove("active"))
        thumb.classList.add("active")
      })
    })

    // Previous button
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length
        mainImage.src = images[currentIndex]

        // Update active thumbnail
        thumbnails.forEach((t) => t.classList.remove("active"))
        thumbnails[currentIndex].classList.add("active")
      })
    }

    // Next button
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length
        mainImage.src = images[currentIndex]

        // Update active thumbnail
        thumbnails.forEach((t) => t.classList.remove("active"))
        thumbnails[currentIndex].classList.add("active")
      })
    }
  }

  // Reservation form
  const reservationForm = document.getElementById("reservation-form")
  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(reservationForm)
      const reservation = {
        id: Date.now().toString(),
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        vehicleId: formData.get("vehicle"),
        date: formData.get("date"),
        pickupTime: {
          hour: formData.get("hour"),
          minute: formData.get("minute"),
        },
        pickupLocation: formData.get("pickup-location"),
        additionalInfo: formData.get("additional-info") || "",
        createdAt: new Date().toISOString(),
        status: "pending",
      }

      // Validate form data
      if (
        !reservation.firstName ||
        !reservation.lastName ||
        !reservation.email ||
        !reservation.phone ||
        !reservation.vehicleId ||
        !reservation.date ||
        !reservation.pickupTime.hour ||
        !reservation.pickupTime.minute ||
        !reservation.pickupLocation
      ) {
        showFormMessage("Wszystkie wymagane pola muszą być wypełnione", false)
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(reservation.email)) {
        showFormMessage("Podaj prawidłowy adres email", false)
        return
      }

      // Phone validation
      const phoneRegex = /^\+?[0-9\s-]{9,15}$/
      if (!phoneRegex.test(reservation.phone)) {
        showFormMessage("Podaj prawidłowy numer telefonu", false)
        return
      }

      // Get existing reservations
      let reservations = []
      const storedReservations = localStorage.getItem("goldencar_reservations")

      if (storedReservations) {
        reservations = JSON.parse(storedReservations)
      }

      // Add new reservation
      reservations.push(reservation)

      // Save to localStorage
      localStorage.setItem("goldencar_reservations", JSON.stringify(reservations))

      // Show success message
      showFormMessage(
        "Dziękujemy za Twoją prośbę o rezerwację! Skontaktujemy się z Tobą wkrótce, aby potwierdzić szczegóły.",
        true,
      )

      // Reset form
      reservationForm.reset()
    })

    function showFormMessage(message, isSuccess) {
      const messageElement = document.getElementById("form-message")
      if (messageElement) {
        messageElement.textContent = message
        messageElement.className = "form-message " + (isSuccess ? "form-message-success" : "form-message-error")
        messageElement.style.display = "block"

        // Scroll to message
        messageElement.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    }
  }

  // Admin login
  const adminLoginForm = document.getElementById("admin-login-form")
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const password = document.getElementById("password").value
      const errorElement = document.getElementById("login-error")

      // Simple password check (in a real app, this would be server-side)
      if (password === "golden123") {
        // Set logged in status
        localStorage.setItem("admin_logged_in", "true")

        // Redirect to dashboard
        window.location.href = "admin-dashboard.html"
      } else {
        if (errorElement) {
          errorElement.textContent = "Nieprawidłowe hasło. Spróbuj ponownie."
          errorElement.style.display = "block"
        }
      }
    })
  }

  // Check admin login status
  const adminPages = document.body.classList.contains("admin-page")
  if (adminPages && !document.body.classList.contains("admin-login-page")) {
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true"

    if (!isLoggedIn) {
      window.location.href = "admin-login.html"
    }
  }

  // Admin logout
  const logoutButton = document.getElementById("admin-logout")
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("admin_logged_in")
      window.location.href = "admin-login.html"
    })
  }

  // Load vehicles
  function loadVehicles() {
    // Default vehicles data
    const defaultVehicles = [
      {
        id: "rolls-royce-wraith",
        name: "Rolls-Royce Wraith",
        description: "Kwintesencja luksusu i elegancji, idealny do efektownego wjazdu w dniu ślubu.",
        year: 2022,
        color: "Biały",
        seats: 4,
        pricePerDay: 3500,
        image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=2574&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=2574&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=2574&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=2574&auto=format&fit=crop",
        ],
        features: [
          "Profesjonalny kierowca",
          "Czerwony dywan",
          "Szampan gratis",
          "Niestandardowa dekoracja",
          "Klimatyzacja",
          "System audio premium",
        ],
        available: true,
        featured: true,
        homePage: true,
        reviewCount: 48,
      },
      {
        id: "rolls-royce-phantom",
        name: "Rolls-Royce Phantom",
        description:
          "Idealne połączenie sportowego charakteru i luksusu, Rolls-Royce Phantom oferuje wyrafinowaną jazdę na Twój ślub.",
        year: 2021,
        color: "Czarny",
        seats: 4,
        pricePerDay: 2800,
        image: "https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=2574&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=2574&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=2574&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1632548260498-b7246fa466ea?q=80&w=2574&auto=format&fit=crop",
        ],
        features: [
          "Profesjonalny kierowca",
          "Niestandardowa dekoracja",
          "Klimatyzacja",
          "System audio premium",
          "Skórzane wnętrze",
        ],
        available: true,
        featured: true,
        homePage: true,
        reviewCount: 36,
      },
      {
        id: "mercedes-s-class",
        name: "Mercedes Klasy S",
        description: "Elegancki i wyrafinowany, Mercedes Klasy S zapewnia komfortowe i luksusowe doświadczenie.",
        year: 2023,
        color: "Czarny",
        seats: 4,
        pricePerDay: 1800,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vd5ev5QohHT5CzxtIQrN2AT08dEbyM.png",
        gallery: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vd5ev5QohHT5CzxtIQrN2AT08dEbyM.png",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vd5ev5QohHT5CzxtIQrN2AT08dEbyM.png",
        ],
        features: [
          "Profesjonalny kierowca",
          "Niestandardowa dekoracja",
          "Klimatyzacja",
          "System audio premium",
          "Panoramiczny dach",
        ],
        available: true,
        featured: true,
        homePage: true,
        reviewCount: 52,
      },
    ]

    // Get vehicles from localStorage or use default
    let vehicles = []
    const storedVehicles = localStorage.getItem("goldencar_vehicles")

    if (storedVehicles) {
      vehicles = JSON.parse(storedVehicles)
    } else {
      vehicles = defaultVehicles
      localStorage.setItem("goldencar_vehicles", JSON.stringify(vehicles))
    }

    return vehicles
  }

  // Display vehicles on homepage
  const homeVehiclesContainer = document.getElementById("home-vehicles")
  if (homeVehiclesContainer) {
    const vehicles = loadVehicles()
    const homeVehicles = vehicles.filter((vehicle) => vehicle.homePage)

    let html = ""
    homeVehicles.forEach((vehicle) => {
      html += `
        <div class="card">
          <div class="card-image-container">
            <img src="${vehicle.image}" alt="${vehicle.name}" class="card-image">
            ${vehicle.featured ? '<span class="card-badge">Polecany</span>' : ""}
          </div>
          <div class="card-content">
            <h3 class="card-title">${vehicle.name}</h3>
            <p class="card-description">${vehicle.description}</p>
            <div class="card-meta">
              <div class="card-price">
                ${vehicle.pricePerDay} PLN
                <span class="card-price-unit">/ dzień</span>
              </div>
              <div class="card-details">
                ${vehicle.year} • ${vehicle.color}
              </div>
            </div>
          </div>
          <div class="card-footer">
            <a href="vehicle-detail.html?id=${vehicle.id}" class="btn btn-outline w-100">Szczegóły</a>
          </div>
        </div>
      `
    })

    homeVehiclesContainer.innerHTML = html
  }

  // Display all vehicles
  const allVehiclesContainer = document.getElementById("all-vehicles")
  if (allVehiclesContainer) {
    const vehicles = loadVehicles()
    // Sort vehicles - featured first
    vehicles.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })

    let html = ""
    vehicles.forEach((vehicle) => {
      html += `
        <div class="card">
          <div class="card-image-container">
            <img src="${vehicle.image}" alt="${vehicle.name}" class="card-image">
            ${vehicle.featured ? '<span class="card-badge">Polecany</span>' : ""}
          </div>
          <div class="card-content">
            <h3 class="card-title">${vehicle.name}</h3>
            <p class="card-description">${vehicle.description}</p>
            <div class="card-meta">
              <div class="card-price">
                ${vehicle.pricePerDay} PLN
                <span class="card-price-unit">/ dzień</span>
              </div>
              <div class="card-details">
                ${vehicle.year} • ${vehicle.color}
              </div>
            </div>
          </div>
          <div class="card-footer">
            <a href="vehicle-detail.html?id=${vehicle.id}" class="btn btn-outline w-100">Szczegóły</a>
          </div>
        </div>
      `
    })

    allVehiclesContainer.innerHTML = html
  }

  // Vehicle detail page
  const vehicleDetailContainer = document.getElementById("vehicle-detail")
  if (vehicleDetailContainer) {
    // Get vehicle ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const vehicleId = urlParams.get("id")

    if (vehicleId) {
      const vehicles = loadVehicles()
      const vehicle = vehicles.find((v) => v.id === vehicleId)

      if (vehicle) {
        // Update page title
        document.title = `${vehicle.name} - GOLDEN CAR`

        // Update vehicle detail content
        vehicleDetailContainer.innerHTML = `
          <div class="vehicle-gallery">
            <div class="main-image-container">
              <img src="${vehicle.image}" alt="${vehicle.name}" class="main-image">
              <button class="gallery-nav gallery-prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button class="gallery-nav gallery-next">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
            <div class="thumbnails">
              ${[vehicle.image, ...(vehicle.gallery || [])]
                .map(
                  (img, index) => `
                <div class="thumbnail ${index === 0 ? "active" : ""}">
                  <img src="${img}" alt="${vehicle.name} - Zdjęcie ${index + 1}">
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
          <div class="vehicle-info">
            <div>
              <h1 class="vehicle-title">${vehicle.name}</h1>
              <div class="vehicle-rating">
                ${"★".repeat(5)}
                <span class="vehicle-rating-count">(${vehicle.reviewCount} opinii)</span>
              </div>
            </div>
            
            <div class="vehicle-price">
              ${vehicle.pricePerDay} PLN
              <span class="vehicle-price-unit">za dzień</span>
            </div>
            
            <div class="vehicle-description">
              <p>${vehicle.description}</p>
            </div>
            
            <div class="vehicle-features">
              <div class="vehicle-feature">
                <span class="vehicle-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </span>
                <span class="vehicle-feature-text">Rok: ${vehicle.year}</span>
              </div>
              <div class="vehicle-feature">
                <span class="vehicle-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </span>
                <span class="vehicle-feature-text">Kolor: ${vehicle.color}</span>
              </div>
              <div class="vehicle-feature">
                <span class="vehicle-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </span>
                <span class="vehicle-feature-text">Miejsca: ${vehicle.seats}</span>
              </div>
              <div class="vehicle-feature">
                <span class="vehicle-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </span>
                <span class="vehicle-feature-text">Dostępność: Na zapytanie</span>
              </div>
            </div>
            
            <div class="tabs">
              <div class="tab-list">
                <div class="tab active" data-tab="tab-reservation">Zarezerwuj</div>
                <div class="tab" data-tab="tab-features">Wyposażenie</div>
              </div>
              
              <div id="tab-reservation" class="tab-content active">
                <form id="reservation-form" class="reservation-form">
                  <input type="hidden" name="vehicle" value="${vehicle.id}">
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="first-name" class="form-label">Imię</label>
                      <input type="text" id="first-name" name="first-name" class="form-input" required>
                    </div>
                    <div class="form-group">
                      <label for="last-name" class="form-label">Nazwisko</label>
                      <input type="text" id="last-name" name="last-name" class="form-input" required>
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" id="email" name="email" class="form-input" required>
                    </div>
                    <div class="form-group">
                      <label for="phone" class="form-label">Telefon</label>
                      <input type="tel" id="phone" name="phone" class="form-input" required>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="date" class="form-label">Data Ślubu</label>
                    <input type="date" id="date" name="date" class="form-input" required>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="pickup-time" class="form-label">Godzina Odbioru</label>
                      <div class="form-row">
                        <select id="hour" name="hour" class="form-select" required>
                          <option value="">Godz.</option>
                          ${Array.from({ length: 9 })
                            .map((_, i) => {
                              const hour = i + 8 // 8-16
                              return `<option value="${hour.toString().padStart(2, "0")}">${hour.toString().padStart(2, "0")}</option>`
                            })
                            .join("")}
                        </select>
                        <select id="minute" name="minute" class="form-select" required>
                          <option value="">Min.</option>
                          <option value="00">00</option>
                          <option value="15">15</option>
                          <option value="30">30</option>
                          <option value="45">45</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="pickup-location" class="form-label">Miejsce Odbioru</label>
                      <input type="text" id="pickup-location" name="pickup-location" class="form-input" required>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="additional-info" class="form-label">Dodatkowe Informacje</label>
                    <textarea id="additional-info" name="additional-info" class="form-textarea"></textarea>
                  </div>
                  
                  <button type="submit" class="btn btn-primary w-100">Wyślij Prośbę o Rezerwację</button>
                  
                  <p class="text-center mt-4 font-sans">
                    Złożenie rezerwacji nie jest wiążące — skontaktujemy się z Tobą, by potwierdzić dostępność.
                  </p>
                  
                  <div id="form-message" class="form-message" style="display: none;"></div>
                </form>
              </div>
              
              <div id="tab-features" class="tab-content">
                <ul class="feature-list">
                  ${(vehicle.features || [])
                    .map(
                      (feature) => `
                    <li class="feature-list-item">
                      <span class="feature-list-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      ${feature}
                    </li>
                  `,
                    )
                    .join("")}
                </ul>
              </div>
            </div>
          </div>
        `

        // Initialize tabs and gallery after content is loaded
        const tabs = document.querySelectorAll(".tab")
        const tabContents = document.querySelectorAll(".tab-content")

        tabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-tab")

            // Remove active class from all tabs and contents
            tabs.forEach((t) => t.classList.remove("active"))
            tabContents.forEach((c) => c.classList.remove("active"))

            // Add active class to clicked tab and corresponding content
            tab.classList.add("active")
            document.getElementById(target).classList.add("active")
          })
        })

        // Initialize gallery
        const mainImage = document.querySelector(".main-image")
        const thumbnails = document.querySelectorAll(".thumbnail")
        const prevButton = document.querySelector(".gallery-prev")
        const nextButton = document.querySelector(".gallery-next")

        if (mainImage && thumbnails.length > 0) {
          let currentIndex = 0
          const images = Array.from(thumbnails).map((thumb) => thumb.querySelector("img").src)

          // Thumbnail click
          thumbnails.forEach((thumb, index) => {
            thumb.addEventListener("click", () => {
              mainImage.src = images[index]
              currentIndex = index

              // Update active thumbnail
              thumbnails.forEach((t) => t.classList.remove("active"))
              thumb.classList.add("active")
            })
          })

          // Previous button
          if (prevButton) {
            prevButton.addEventListener("click", () => {
              currentIndex = (currentIndex - 1 + images.length) % images.length
              mainImage.src = images[currentIndex]

              // Update active thumbnail
              thumbnails.forEach((t) => t.classList.remove("active"))
              thumbnails[currentIndex].classList.add("active")
            })
          }

          // Next button
          if (nextButton) {
            nextButton.addEventListener("click", () => {
              currentIndex = (currentIndex + 1) % images.length
              mainImage.src = images[currentIndex]

              // Update active thumbnail
              thumbnails.forEach((t) => t.classList.remove("active"))
              thumbnails[currentIndex].classList.add("active")
            })
          }
        }
      } else {
        vehicleDetailContainer.innerHTML = '<p class="text-center">Nie znaleziono pojazdu.</p>'
      }
    }
  }

  // Admin dashboard - reservations
  const adminReservationsTable = document.getElementById("admin-reservations")
  if (adminReservationsTable) {
    // Get reservations from localStorage
    let reservations = []
    const storedReservations = localStorage.getItem("goldencar_reservations")

    if (storedReservations) {
      reservations = JSON.parse(storedReservations)
      // Sort by date (newest first)
      reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    // Get vehicles for names
    const vehicles = loadVehicles()

    if (reservations.length === 0) {
      adminReservationsTable.innerHTML =
        '<tr><td colspan="7" class="text-center">Brak rezerwacji do wyświetlenia</td></tr>'
    } else {
      let html = ""
      reservations.forEach((reservation) => {
        const vehicle = vehicles.find((v) => v.id === reservation.vehicleId) || { name: reservation.vehicleId }
        const date = new Date(reservation.date)
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`

        html += `
          <tr>
            <td>${new Date(reservation.createdAt).toLocaleString("pl-PL")}</td>
            <td>
              <div class="font-medium">${reservation.firstName} ${reservation.lastName}</div>
              <div class="text-sm text-muted-foreground">${reservation.email}</div>
              <div class="text-sm text-muted-foreground">${reservation.phone}</div>
            </td>
            <td>${vehicle.name}</td>
            <td>${formattedDate}</td>
            <td>${reservation.pickupTime.hour}:${reservation.pickupTime.minute}</td>
            <td>
              <span class="admin-badge ${
                reservation.status === "confirmed"
                  ? "admin-badge-primary"
                  : reservation.status === "cancelled"
                    ? "admin-badge-outline"
                    : "admin-badge-outline"
              }">
                ${
                  reservation.status === "pending"
                    ? "Oczekująca"
                    : reservation.status === "confirmed"
                      ? "Potwierdzona"
                      : "Anulowana"
                }
              </span>
            </td>
            <td>
              <div class="admin-actions">
                <button class="btn btn-outline" data-action="confirm" data-id="${reservation.id}">Potwierdź</button>
                <button class="btn btn-outline" data-action="cancel" data-id="${reservation.id}">Anuluj</button>
              </div>
            </td>
          </tr>
        `
      })

      adminReservationsTable.innerHTML = html

      // Add event listeners to action buttons
      const actionButtons = document.querySelectorAll("[data-action]")
      actionButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const action = this.getAttribute("data-action")
          const id = this.getAttribute("data-id")

          // Update reservation status
          const updatedReservations = reservations.map((reservation) => {
            if (reservation.id === id) {
              return {
                ...reservation,
                status: action === "confirm" ? "confirmed" : "cancelled",
              }
            }
            return reservation
          })

          // Save to localStorage
          localStorage.setItem("goldencar_reservations", JSON.stringify(updatedReservations))

          // Reload page to show updated status
          window.location.reload()
        })
      })
    }
  }

  // Admin vehicles
  const adminVehiclesTable = document.getElementById("admin-vehicles")
  if (adminVehiclesTable) {
    const vehicles = loadVehicles()

    if (vehicles.length === 0) {
      adminVehiclesTable.innerHTML = '<tr><td colspan="6" class="text-center">Brak pojazdów do wyświetlenia</td></tr>'
    } else {
      let html = ""
      vehicles.forEach((vehicle) => {
        html += `
          <tr>
            <td>
              <div class="thumbnail" style="width: 60px; height: 60px; position: relative; overflow: hidden; border-radius: 4px;">
                <img src="${vehicle.image}" alt="${vehicle.name}" style="position: absolute; width: 100%; height: 100%; object-fit: cover;">
              </div>
            </td>
            <td>
              <div class="font-medium">${vehicle.name}</div>
              <div class="text-sm text-muted-foreground line-clamp-1">${vehicle.description}</div>
            </td>
            <td>${vehicle.year}</td>
            <td>${vehicle.pricePerDay} PLN</td>
            <td>
              <div>
                ${vehicle.featured ? '<span class="admin-badge admin-badge-primary">Wyróżniony</span>' : ""}
                ${vehicle.homePage ? '<span class="admin-badge admin-badge-primary">Strona Główna</span>' : ""}
              </div>
            </td>
            <td>
              <div class="admin-actions">
                <a href="admin-vehicle-edit.html?id=${vehicle.id}" class="btn btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </a>
                <button class="btn btn-outline" data-action="delete" data-id="${vehicle.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
            </td>
          </tr>
        `
      })

      adminVehiclesTable.innerHTML = html

      // Add event listeners to delete buttons
      const deleteButtons = document.querySelectorAll('[data-action="delete"]')
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id")

          if (confirm("Czy na pewno chcesz usunąć ten pojazd?")) {
            // Remove vehicle from array
            const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id)

            // Save to localStorage
            localStorage.setItem("goldencar_vehicles", JSON.stringify(updatedVehicles))

            // Reload page to show updated list
            window.location.reload()
          }
        })
      })
    }
  }

  // Admin vehicle form (add/edit)
  const vehicleForm = document.getElementById("vehicle-form")
  if (vehicleForm) {
    // Check if editing (URL has id parameter)
    const urlParams = new URLSearchParams(window.location.search)
    const vehicleId = urlParams.get("id")

    if (vehicleId) {
      // Editing existing vehicle
      const vehicles = loadVehicles()
      const vehicle = vehicles.find((v) => v.id === vehicleId)

      if (vehicle) {
        // Fill form with vehicle data
        document.getElementById("name").value = vehicle.name || ""
        document.getElementById("description").value = vehicle.description || ""
        document.getElementById("year").value = vehicle.year || ""
        document.getElementById("color").value = vehicle.color || ""
        document.getElementById("seats").value = vehicle.seats || ""
        document.getElementById("price-per-day").value = vehicle.pricePerDay || ""
        document.getElementById("image").value = vehicle.image || ""

        // Gallery images
        if (vehicle.gallery && vehicle.gallery.length > 0) {
          for (let i = 0; i < Math.min(vehicle.gallery.length, 3); i++) {
            document.getElementById(`gallery-${i}`).value = vehicle.gallery[i] || ""
          }
        }

        // Features
        if (vehicle.features && vehicle.features.length > 0) {
          for (let i = 0; i < Math.min(vehicle.features.length, 5); i++) {
            document.getElementById(`feature-${i}`).value = vehicle.features[i] || ""
          }
        }

        document.getElementById("review-count").value = vehicle.reviewCount || ""
        document.getElementById("featured").checked = vehicle.featured || false
        document.getElementById("home-page").checked = vehicle.homePage || false

        // Update form title
        document.getElementById("form-title").textContent = "Edytuj Pojazd"
        document.getElementById("form-submit").textContent = "Zapisz zmiany"
      }
    }

    // Form submission
    vehicleForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(vehicleForm)
      const name = formData.get("name")
      const description = formData.get("description")
      const year = Number.parseInt(formData.get("year"), 10)
      const color = formData.get("color")
      const seats = Number.parseInt(formData.get("seats"), 10)
      const pricePerDay = Number.parseInt(formData.get("price-per-day"), 10)
      const image = formData.get("image")
      const reviewCount = Number.parseInt(formData.get("review-count"), 10) || 0
      const featured = formData.get("featured") === "on"
      const homePage = formData.get("home-page") === "on"

      // Gallery images
      const gallery = []
      for (let i = 0; i < 3; i++) {
        const galleryImage = formData.get(`gallery-${i}`)
        if (galleryImage) {
          gallery.push(galleryImage)
        }
      }

      // Features
      const features = []
      for (let i = 0; i < 5; i++) {
        const feature = formData.get(`feature-${i}`)
        if (feature) {
          features.push(feature)
        }
      }

      // Validate required fields
      if (!name || !description || !image) {
        alert("Wypełnij wszystkie wymagane pola (nazwa, opis, zdjęcie główne)")
        return
      }

      // Create vehicle object
      const vehicleData = {
        id:
          vehicleId ||
          name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, ""),
        name,
        description,
        year,
        color,
        seats,
        pricePerDay,
        image,
        gallery,
        features,
        available: true,
        featured,
        homePage,
        reviewCount,
      }

      // Get existing vehicles
      const vehicles = loadVehicles()

      if (vehicleId) {
        // Update existing vehicle
        const index = vehicles.findIndex((v) => v.id === vehicleId)
        if (index !== -1) {
          vehicles[index] = vehicleData
        } else {
          vehicles.push(vehicleData)
        }
      } else {
        // Add new vehicle
        vehicles.push(vehicleData)
      }

      // Save to localStorage
      localStorage.setItem("goldencar_vehicles", JSON.stringify(vehicles))

      // Redirect to vehicles list
      window.location.href = "admin-vehicles.html"
    })
  }
})
