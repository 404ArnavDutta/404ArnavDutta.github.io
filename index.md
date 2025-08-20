---
layout: single
title: "Home"

home_cards:
  - title: "Projects"
    excerpt: "Code, models, and experiments."
    url: "/projects/"
    btn_label: "View projects →"
    btn_class: "btn--primary"
  - title: "Reports"
    excerpt: "Lab write-ups and technical notes."
    url: "/reports/"
    btn_label: "Read reports →"
    btn_class: "btn--primary"
  - title: "CV"
    excerpt: "Academic and professional experience."
    url: "/cv/"
    btn_label: "View CV →"
    btn_class: "btn--primary"
---

<!-- Hide masthead (nav bar) only on the Home page -->
<style>
  .masthead { display: none !important; }

  /* Make cards stack vertically and look like tidy boxes */
  .feature__wrapper { display: block !important; }
  .feature__item {
    width: 100% !important;
    margin: 0 0 1rem 0 !important;
    padding: 1rem 1.25rem !important;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,.08);
    background: var(--mm-color-bg-elevated, #1f2937);
  }
  .feature__item h2 { margin: 0 0 .25rem 0; }
  .feature__item p  { margin: 0 0 .75rem 0; }
</style>

# Hi, I’m Arnav Dutta 👋

Welcome to my portfolio!  
Here I’ll share selected **projects** and **reports**.

{% include feature_row id="home_cards" %}
