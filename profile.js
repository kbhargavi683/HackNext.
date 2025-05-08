document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.activity-tab');
    const panes = document.querySelectorAll('.activity-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Edit profile button functionality
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            alert('Edit profile functionality would be implemented here');
        });
    }

    // Social media links could be added here
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // In a real implementation, these would link to actual profiles
            const platform = this.querySelector('i').className.split(' ')[1];
            console.log(`Navigating to ${platform} profile`);
            e.preventDefault();
        });
    });
});