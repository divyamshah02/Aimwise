// =======================
// Utilities
// =======================
const $ = (s, d = document) => d.querySelector(s)
const $$ = (s, d = document) => Array.from(d.querySelectorAll(s))

// ===== Mobile Nav =====
$(".nav-toggle")?.addEventListener("click", () => {
  $(".nav-list")?.classList.toggle("show")
})

// Close nav when clicking link (mobile)
$$(".nav-list a").forEach((a) => a.addEventListener("click", () => $(".nav-list")?.classList.remove("show")))

// ===== Smooth hash scrolling =====
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href")
    if (id.length > 1) {
      e.preventDefault()
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
      history.pushState(null, "", id)
    }
  })
})

// =======================
// Cursor
// =======================
// ===== Cursor Follow Animation =====
const dot = $(".cursor-dot")
const ring = $(".cursor-ring")
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
const ringPos = { x: mouse.x, y: mouse.y }

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  dot.style.transform = `translate(${mouse.x - 12}px, ${mouse.y - 12}px)`
})

function animateRing() {
  // springy lerp
  const speed = 0.08
  ringPos.x += (mouse.x - ringPos.x) * speed
  ringPos.y += (mouse.y - ringPos.y) * speed
  ring.style.transform = `translate(${ringPos.x - 18}px, ${ringPos.y - 18}px)`
  requestAnimationFrame(animateRing)
}
animateRing()

// Scale ring on hover of interactive elements
;["a", "button", ".btn", "input", "textarea", "select", "label"].forEach((sel) => {
  $$(sel).forEach((el) => {
    el.addEventListener("mouseenter", () => (ring.style.transform += " scale(1.3)"))
    el.addEventListener(
      "mouseleave",
      () => (ring.style.transform = `translate(${ringPos.x - 18}px, ${ringPos.y - 18}px)`),
    )
  })
})

// ===== Scroll reveal =====
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        io.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 },
)

$$(".reveal-up, .reveal-fade").forEach((el) => io.observe(el))

// ===== Year in footer =====
$("#year").textContent = new Date().getFullYear()

// Add hover detection for interactive elements
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    const cursorRing = document.querySelector(".cursor-ring")
    if (cursorRing) cursorRing.classList.add("active")
  })
  el.addEventListener("mouseleave", () => {
    const cursorRing = document.querySelector(".cursor-ring")
    if (cursorRing) cursorRing.classList.remove("active")
  })
})

// Add click shrink effect
window.addEventListener("mousedown", () => {
  const cursorRing = document.querySelector(".cursor-ring")
  if (cursorRing) cursorRing.classList.add("click")
})
window.addEventListener("mouseup", () => {
  const cursorRing = document.querySelector(".cursor-ring")
  if (cursorRing) cursorRing.classList.remove("click")
})

// =======================
// Ripple
// =======================
// Ripple effect on click
function createRipple(x, y) {
  const ripple = document.createElement("div")
  ripple.classList.add("ripple")
  ripple.style.left = x + "px"
  ripple.style.top = y + "px"
  document.body.appendChild(ripple)
  setTimeout(() => {
    ripple.remove()
  }, 600)
}

window.addEventListener("click", (e) => {
  createRipple(e.clientX, e.clientY)
})

// Parallax scroll effect
window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax").forEach((section) => {
    const speed = section.getAttribute("data-speed") || 0.4
    const offset = window.scrollY * speed
    section.style.backgroundPositionY = offset + "px"
  })
})

// Fade-in animation for footer credits
document.addEventListener("DOMContentLoaded", () => {
  const credits = document.querySelector(".credits")
  if (credits) {
    credits.style.opacity = 0
    credits.style.transition = "opacity 1s ease-out, transform 1s ease-out"
    credits.style.transform = "translateY(20px)"

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            credits.style.opacity = 1
            credits.style.transform = "translateY(0)"
            observer.unobserve(credits)
          }
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(credits)
  }
})

// Animate "Start a Project" button on scroll
document.addEventListener("DOMContentLoaded", () => {
  const projectBtnWrapper = document.querySelector(".project-btn-wrapper")
  if (projectBtnWrapper) {
    const btn = projectBtnWrapper.querySelector(".project-btn")
    btn.style.opacity = 0
    btn.style.transform = "scale(0.8)"
    btn.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            btn.style.opacity = 1
            btn.style.transform = "scale(1)"
            // little bounce effect
            setTimeout(() => {
              btn.style.transform = "scale(1.05)"
              setTimeout(() => (btn.style.transform = "scale(1)"), 200)
            }, 800)
            observer.unobserve(projectBtnWrapper)
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(projectBtnWrapper)
  }
})

// Animate contact form fields with staggered fade-in
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form")
  if (form) {
    const fields = form.querySelectorAll("input, textarea, button")
    fields.forEach((field) => {
      field.style.opacity = 0
      field.style.transform = "translateY(20px)"
      field.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fields.forEach((field, i) => {
              setTimeout(() => {
                field.style.opacity = 1
                field.style.transform = "translateY(0)"
              }, i * 150) // stagger delay
            })
            observer.unobserve(form)
          }
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(form)
  }
})

// Animate images in Work/Portfolio section
document.addEventListener("DOMContentLoaded", () => {
  const workImages = document.querySelectorAll(".work img, .portfolio img")
  if (workImages.length > 0) {
    workImages.forEach((img) => {
      img.style.opacity = 0
      img.style.transform = "scale(0.9)"
      img.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.style.opacity = 1
            img.style.transform = "scale(1)"
            observer.unobserve(img)
          }
        })
      },
      { threshold: 0.2 },
    )

    workImages.forEach((img) => observer.observe(img))
  }
})

// Parallax hover effect for Work/Portfolio images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".work img, .portfolio img")

  images.forEach((img) => {
    img.addEventListener("mousemove", (e) => {
      const rect = img.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * 5 // max 5deg tilt
      const rotateY = ((x - centerX) / centerX) * -5
      img.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) rotateX(0) rotateY(0)"
    })
  })
})

// ==== About Stats Count-Up ====
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".about-stats .stat-num")
  const duration = 700 // total duration in ms (e.g., 2000 = 2 seconds)
  const frameRate = 30 // updates per second

  const animateCount = (el) => {
    const target = +el.getAttribute("data-target")
    let current = 0
    const increment = target / ((duration / 1000) * frameRate)

    const updateCount = () => {
      current += increment
      if (current < target) {
        el.innerText = Math.floor(current)
        setTimeout(updateCount, 1000 / frameRate) // control update speed
      } else {
        el.innerText = target
      }
    }

    updateCount()
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target)
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => observer.observe(counter))
})

// =======================
// Scroll To Top
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const goTopBtn = document.querySelector(".back-to-top")

  // Show/Hide Scroll-to-Top Button on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      goTopBtn.classList.add("show")
    } else {
      goTopBtn.classList.remove("show")
    }
  })

  // Scroll to the top when the button is clicked
  goTopBtn.addEventListener("click", (e) => {
    e.preventDefault() // Prevent default link behavior
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
})

// =======================
// Footer Fade-in on Scroll
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer")
  if (footer) {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add("visible")
          }
        })
      },
      { threshold: 0.2 },
    )
    footerObserver.observe(footer)
  }
})

// =======================
// Navbar Shrink on Scroll
// =======================
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 50) {
    header.classList.add("shrink")
  } else {
    header.classList.remove("shrink")
  }
})
