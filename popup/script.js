// popup/script.js
var emailList = document.getElementById('email-list');
var downloadCsvBtn = document.getElementById('download-csv');
var emails = [];

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    var tabUrl = tab.url;

    // Fetch the page's HTML
    fetch(tabUrl)
        .then(response => response.text())
        .then(html => {
            // Extract all email addresses from the HTML
            emails = extractEmails(html);
            // Remove duplicates from the emails array
            emails = [...new Set(emails)];

            // Display the emails in the popup
            for (var i = 0; i < emails.length; i++) {
                var email = emails[i];
                var emailListItem = document.createElement('li');
                var emailLink = document.createElement('a');
                var emailIcon = document.createElement('img');
                emailIcon.src = 'mail.png';
                emailIcon.alt = 'Email Icon';
                emailLink.href = 'mailto:' + email;
                emailLink.appendChild(emailIcon);
                emailListItem.appendChild(emailLink);
                emailListItem.appendChild(document.createTextNode(email));
                emailList.appendChild(emailListItem);
            }
        });
});

// popup/script.js
downloadCsvBtn.addEventListener('click', function() {
    // Convert emails array to CSV string
    var csv = "Email\n" + emails.join('\n');

    // Create a hidden link and click it to trigger the download
    var link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = 'emails.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


function extractEmails(text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}
