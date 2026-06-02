// mark Work tab active on all project pages
document.querySelectorAll('.tab-nav .folder-tab').forEach(tab => {
  if (tab.getAttribute('href')?.includes('#work')) tab.classList.add('active');
});
