document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("a[href^='#']");
    for (let link of links) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".btn-category");
    const sections = document.querySelectorAll(".category-section");

    function hideAllSections() {
        sections.forEach(section => {
            section.classList.remove("active-section");
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            hideAllSections();
            const targetClass = button.getAttribute("data-target");
            const targetSection = document.querySelector(targetClass);
            if (targetSection) {
                targetSection.classList.add("active-section");
            }
        });
    });

    // Show the first section by default
    if (sections.length > 0) {
        sections[0].classList.add("active-section");
    }
});
