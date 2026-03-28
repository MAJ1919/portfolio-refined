# AI Usage Report

## Tools Used & Use Cases

### Claude (via antigravity IDE)
- **Code Generation**: Used Claude to scaffold the initial HTML structure for the portfolio page. I described the sections I needed (Hero, About, Skills, Projects, Contact) and reviewed the generated markup before integrating it.
- **CSS Design System**: Generated a CSS custom properties–based design system with color tokens, spacing scale, and typography. I customized the color palette and adjusted the gradient colors to match my preferred aesthetic.
- **JavaScript Features**: Got assistance generating the Intersection Observer–based scroll-reveal system, the localStorage-backed theme toggle, and the time-of-day greeting feature. I reviewed the logic and understood how the code works.
- **SVG Mockup Graphics**: Used AI to help create the SVG visuals for the project cards (URL Shortener & Email Tracker), which I refined to better represent each project's UI.
- **Debugging**: When responsive layout issues appeared on mobile (nav menu positioning, grid column collapse), I described the symptoms and received targeted CSS fixes that I verified and applied.
- **Documentation**: AI assisted in structuring the README and technical documentation. I reviewed all generated content and modified sections to accurately reflect my work and understanding.
- **Assignment 2 Interactivity**: Used AI to plan and implement the dynamic Project Search and Filtering functionality, including DOM manipulation logic and CSS states. Also used it to track down and resolve a CSS specificity bug related to the contact form's success message.

---

## Benefits & Challenges

### Benefits
- **Faster Scaffolding**: AI significantly reduced the time spent setting up boilerplate HTML/CSS, allowing me to focus on design decisions and interactivity.
- **Learning New APIs**: The AI introduced me to the Intersection Observer API for scroll-reveal animations, which I hadn't used before. I was able to understand the logic and adapt the code to my needs.
- **Code Quality**: AI suggestions helped me follow consistent naming conventions and organize CSS logically with a table of contents.
- **Cross-Browser Considerations**: AI recommended `-webkit-backdrop-filter` alongside `backdrop-filter` for Safari compatibility, which I wouldn't have known on my own.

### Challenges
- **Over-Engineering**: Some initial AI suggestions were overly complex for the assignment scope. I had to simplify several components to keep the codebase clean and maintainable.
- **Incorrect Defaults**: AI occasionally used deprecated CSS properties or incorrect SVG attributes that I had to identify and fix manually.
- **Context Limitations**: When asking follow-up questions, the AI sometimes lost context about earlier design decisions, requiring me to re-explain constraints.

---

## Learning Outcomes

1. **CSS Custom Properties**: Learned how to build a complete design token system with CSS variables, making it easy to implement dark mode by simply overriding variable values.
2. **Intersection Observer API**: Gained hands-on experience with this modern browser API for detecting element visibility, which is far more performant than scroll event listeners.
3. **Responsive Design Patterns**: Improved my understanding of mobile-first design, CSS Grid vs. Flexbox trade-offs, and breakpoint strategy.
4. **Semantic HTML**: Learned the importance of proper heading hierarchy (`<h1>` used only once), landmark elements (`<header>`, `<main>`, `<footer>`), and `aria-label` attributes for accessibility.

---

## Responsible Use & Modifications

- **Code Review**: Every piece of AI-generated code was reviewed line by line before integration. I ensured I understood most of  the behavior of each function and CSS rule.
- **Customization**: I significantly modified the AI's initial color palette, choosing a purple-blue gradient scheme (`#6C63FF` → `#3B82F6`) over the AI's default suggestion. All SVG project mockups were customized to accurately represent my preference.
- **Originality**: The overall page layout, section content, project descriptions, and bio are entirely my own. AI was used as a tool to accelerate development.
- **Academic Integrity**: I can explain most of the code in this project. Where AI provided a code pattern I was unfamiliar with, I researched it independently to deepen my understanding.
- **Transparency**: This report honestly documents all AI interactions. Every suggestion was checked, tested, and integrated with full comprehension.

