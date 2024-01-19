function changeTab(tabId) {
    var tabButtons = document.querySelectorAll('.tabButton');
    var tabContents = document.querySelectorAll('.tabContent');

    tabContents.forEach(content => content.classList.remove('active'));
    tabButtons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="openTab('${tabId}']`).classList.add('active');
}