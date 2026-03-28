# Mahdi's Portfolio Website

A responsive, modern personal portfolio web application built with **HTML5**, **CSS3**, and **vanilla JavaScript** as part of SWE363 (Web Engineering) Assignment 2 at KFUPM.

![Portfolio Preview](assets/images/preview.png)

---

## 🚀 Features

- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile devices
- **Dark / Light Mode** — Toggle theme with preference saved in localStorage
- **Smooth Scroll Navigation** — Animated scrolling to page sections
- **Dynamic Greeting** — Time-of-day greeting that changes based on the current hour
- **Scroll-Reveal Animations** — Content fades in as you scroll using Intersection Observer
- **Contact Form Validation** — Client-side validation with real-time error feedback
- **Floating Particles** — Dynamic animated particles in the hero section
- **Active Nav Highlighting** — Automatically highlights the current section in the navbar
- **Dynamic Project Filtering** — Search projects by title and filter by tags (Python, Web Apps, Analytics)

---

## 📁 Project Structure

```
SWE363 HW1/
├── README.md                         # This file
├── index.html                        # Main HTML page
├── css/
│   └── styles.css                    # All styles with CSS custom properties
├── js/
│   └── script.js                     # Interactive features
├── assets/
│   └── images/                       # Image assets
├── docs/
│   ├── ai-usage-report.md            # AI tools usage documentation
│   └── technical-documentation.md    # Technical details & architecture
└── .gitignore                        # Git ignore rules
```

---

## 🛠️ Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No build tools, frameworks, or package installations are required

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/id-name-assignment2.git
   cd id-name-assignment2
   ```

2. **Open in browser:**
   - Double-click `index.html` to open in your default browser, **or**
   - Use VS Code's **Live Server** extension for hot-reloading:
     1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
     2. Right-click `index.html` → "Open with Live Server"

3. **Test responsiveness:**
   - Open browser DevTools (`F12` or `Ctrl+Shift+I`)
   - Toggle the device toolbar (`Ctrl+Shift+M`) to simulate mobile/tablet views

---

## 📝 Sections Included

| Section      | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| **Hero**     | Full-viewport intro with dynamic greeting, name, tagline, and CTA buttons  |
| **About Me** | Short bio, profile avatar, and key statistics                              |
| **Skills**   | Technology cards (HTML, CSS, JavaScript, Python, Git, FastAPI)              |
| **Projects** | Two featured projects with SVG mockup visuals and tech tags                 |
| **Contact**  | Form with Name, Email, and Message fields (client-side validation only)    |
| **Footer**   | Social links (GitHub, LinkedIn, Email) and copyright                       |

---

## 🤖 AI Usage Summary

AI-assisted development tools (Claude/antigravity) were used during this project for:

- **Code generation** — creating the initial HTML structure and CSS design system
- **Debugging** — Identifying CSS layout issues for responsive breakpoints
- **Documentation** — Generating structured README and technical documentation
- **Design suggestions** — Refining color palette and micro-animation choices

> For a detailed breakdown, see [`docs/ai-usage-report.md`](docs/ai-usage-report.md).

---

## 🎨 Technologies Used

- **HTML5** — Semantic markup, SEO meta tags
- **CSS3** — Custom properties, Flexbox, CSS Grid, media queries, animations
- **JavaScript (ES6+)** — DOM manipulation, Intersection Observer, localStorage
- **Google Fonts** — Inter typeface


