// const MimeParser = require('emailjs-mime-parser').default;

document.addEventListener('DOMContentLoaded', () => {
  console.log('LOADED')
  const dropZone = document.getElementById('drop-zone');
  const emailInfo = document.getElementById('email-info');

  dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.style.borderColor = '#000';
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = '#ccc';
  });

  dropZone.addEventListener('drop', async (event) => {
    event.preventDefault();
    dropZone.style.borderColor = '#ccc';

    const files = event.dataTransfer.files;
    console.log('FILES', files)
    if (files.length > 0) {
      const file = files[0];
      const emailContent = await file.text();
      displayEmailInfo(emailContent);
    }
  });

  function displayEmailInfo(emailContent) {
      console.log('EMAIL', typeof emailContent)
      fetch('/',{
        method: 'post',
        body: JSON.stringify({ data: emailContent }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
          .then(res => res.json())
          .then(response => {
            console.log(response.success.parsed)
            emailInfo.append(`To: ${response.success.parsed.to}`);
            emailInfo.append(`Subject: ${response.success.parsed.subject}`);
            emailInfo.append(`Message: ${response.success.parsed.text}`);
          })
          .catch(error => {
            console.log(error)
          });
  }
});