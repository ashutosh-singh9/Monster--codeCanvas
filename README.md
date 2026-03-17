# Monster Energy Experience 

**Live Demo: [monster.dinomae.in](https://monster.dinomae.in/)**

This is a passion project I built to experiment with immersive web experiences. It's a high-energy, single-page site for Monster Energy that leans heavily into glassmorphism, GSAP animations, and interactive mini-games. The goal was to make a site that feels as "monstrous" as the brand itself—fast, dark, and visually intense.

---

##  The Vibe  

I wanted the site to feel "alive," so I used **GSAP ScrollTrigger** to handle the flow. As you scroll, the product stays central, morphing and reacting to your position. Everything on the site—from the custom cursor tracking your every move to the glowing liquid-crystal buttons—is meant to keep the user engaged.

### What's inside:
*   **Dynamic Flavour Swapping:** Switch between Original, Blue, Purple, and Red. The whole site's theme (glows, accents, text shadows) shifts instantly to match the can. 
*   **Can Catcher Mini-Game:** A quick throwback arcade game built on HTML5 Canvas. Catch the logos, keep your lives, and beat your high score.
*   **News & Events:** Custom-built glassmorphic modals that pop out with smooth transitions. I even built a "More News" side panel to keep the main page clean.
*   **Magnetic Navigation:** A sticky navbar that tracks where you are on the page and lets you jump around with smooth-as-silk anchor scrolling.

---

##  How it's built  

I kept this project "old school" but with modern logic. No heavy frameworks or complex build steps—just solid HTML, CSS, and Vanilla JavaScript.

*   **CSS:** Organized into modules (Base, Sections, Components) so it’s easy to tweak.
*   **JS:** Split into 5 distinct modules (`cart.js`, `game.js`, `news-events.js`, etc.) to keep the logic clean and readable.
*   **GSAP:** The real muscle behind the animations and scroll-spy effects.

---

##  Structure 

```text
organized_code/
├── index.html          # The main stage
├── assets/images/      # All the high-res cans and backgrounds
├── css/                # Modular styling (main.css pulls everything together)
└── js/modules/         # The logic behind the magic
```


**Unleash the Beast.** 
