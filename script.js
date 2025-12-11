// Initial Setup: Add 3 empty link fields by default
document.addEventListener('DOMContentLoaded', () => {
    addLinkField();
    addLinkField();
    addLinkField();
});

// Function to add a new Name + URL input row
function addLinkField() {
    const container = document.getElementById('links-form');

    const row = document.createElement('div');
    row.className = 'link-row';

    row.innerHTML = `
        <input type="text" class="link-name" placeholder="Link Name (e.g. Instagram)">
        <input type="text" class="link-url" placeholder="URL (https://...)">
    `;

    container.appendChild(row);
}

// Function to Generate the Profile
function generateProfile() {
    // 1. Get User Details
    const name = document.getElementById('input-name').value;
    const bio = document.getElementById('input-bio').value;

    // Basic validation
    if (!name) {
        alert("Please enter a profile name!");
        return;
    }

    // 2. Get All Links
    const linkRows = document.querySelectorAll('.link-row');
    const linksData = [];

    linkRows.forEach(row => {
        const linkName = row.querySelector('.link-name').value;
        const linkUrl = row.querySelector('.link-url').value;

        if (linkName && linkUrl) {
            linksData.push({ name: linkName, url: linkUrl });
        }
    });

    if (linksData.length === 0) {
        alert("Please add at least one link!");
        return;
    }

    // 3. Update the Preview Section
    document.getElementById('profile-name').innerText = name;
    document.getElementById('profile-bio').innerText = bio || "";

    // Clear old links
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = '';

    // Create new links
    linksData.forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = formatUrl(link.url);
        anchor.className = 'link-card';
        anchor.target = '_blank';
        anchor.innerHTML = `🔗 &nbsp; ${link.name}`;
        linksContainer.appendChild(anchor);
    });

    // 4. Switch Views
    document.getElementById('editor-section').classList.add('hidden');
    document.getElementById('preview-section').classList.remove('hidden');
}

// Function to Go Back to Edit
function editProfile() {
    document.getElementById('preview-section').classList.add('hidden');
    document.getElementById('editor-section').classList.remove('hidden');
}

// Helper: Ensure URL has http/https
function formatUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}
