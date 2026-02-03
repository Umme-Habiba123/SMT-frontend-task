// Modal functionality
const modal = document.getElementById("bookingModal");
const bookNowBtns = document.querySelectorAll(".book-now-btn");
const closeBtn = document.querySelector(".close");
const bookingForm = document.getElementById("bookingForm");

// Open modal when any "Book Now" button is clicked
bookNowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

// Close modal when X is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Handle form submission and Google Calendar integration
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const message = document.getElementById("message").value;

  // Create Google Calendar event
  createGoogleCalendarEvent(name, email, phone, service, date, time, message);
});

function createGoogleCalendarEvent(
  name,
  email,
  phone,
  service,
  date,
  time,
  message,
) {
  // Format the date and time for Google Calendar
  const eventDate = new Date(date + "T" + time);
  const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

  // Format dates to ISO string format required by Google Calendar
  const startDateTime = formatDateForGoogle(eventDate);
  const endDateTime = formatDateForGoogle(endDate);

  // Create event title and description
  const title = Cleanora - `${service}`;
  const description = `Cleaning Service Booking
    
Client Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
- Service: ${service}

Additional Notes:
${message || "No additional notes"}

Please arrive on time and bring all necessary cleaning equipment.`;

  const location = "Client Location (Address to be confirmed)";

  // Create Google Calendar URL
  const googleCalendarUrl = generateGoogleCalendarUrl(
    title,
    description,
    location,
    startDateTime,
    endDateTime,
  );

  // Show success message
  showSuccessMessage();

  // Open Google Calendar in new tab
  setTimeout(() => {
    window.open(googleCalendarUrl, "_blank");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    bookingForm.reset();
  }, 1500);
}

function formatDateForGoogle(date) {
  // Format: YYYYMMDDTHHmmssZ
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

function generateGoogleCalendarUrl(
  title,
  description,
  location,
  startDateTime,
  endDateTime,
) {
  const baseUrl = "https://calendar.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${startDateTime}/${endDateTime}`,
    details: description,
    location: location,
    sf: "true",
    output: "xml",
  });

  return `${baseUrl}?${params.toString()}`;
}

function showSuccessMessage() {
  // Create success message element
  const successDiv = document.createElement("div");
  successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #00C853;
        color: white;
        padding: 30px 50px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 200, 83, 0.4);
        z-index: 3000;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        animation: successFadeIn 0.3s ease;
    `;
  successDiv.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 10px;">✓</div>
        <div>Booking Confirmed!</div>
        <div style="font-size: 14px; font-weight: 400; margin-top: 10px;">Opening Google Calendar...</div>
    `;

  document.body.appendChild(successDiv);

  // Remove success message after 2 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 2000);
}

// Add CSS animation for success message
const style = document.createElement("style");
style.textContent = `
    @keyframes successFadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Set minimum date to today for date input
const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

// Add hover effects for pricing cards
const pricingCards = document.querySelectorAll(".pricing-card");
pricingCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 15px 40px rgba(0,0,0,0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Add animation to sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Handle "Choose Plan" buttons
const choosePlanBtns = document.querySelectorAll(
  ".pricing-card .btn-outline, .pricing-card .btn-primary",
);
choosePlanBtns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    // Don't trigger if it's already a book-now button
    if (!btn.classList.contains("book-now-btn")) {
      // Get the service type from the pricing card
      const pricingCard = btn.closest(".pricing-card");
      const serviceLabel =
        pricingCard.querySelector(".pricing-label").textContent;

      // Open modal
      modal.style.display = "block";
      document.body.style.overflow = "hidden";

      // Pre-select the service
      const serviceSelect = document.getElementById("service");
      const serviceName = serviceLabel.split(" ")[0] + " Plan";

      // Set the select value after a short delay to ensure modal is visible
      setTimeout(() => {
        for (let option of serviceSelect.options) {
          if (option.value.includes(serviceName)) {
            serviceSelect.value = option.value;
            break;
          }
        }
      }, 100);
    }
  });
});

// Add loading state to form submission
bookingForm.addEventListener("submit", function () {
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Processing...";
  submitBtn.disabled = true;

  // Re-enable button after processing
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

console.log("Cleanora Booking System Initialized");
console.log("Google Calendar Integration Active");