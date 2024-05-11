const axios = require('axios');
const fs = require('fs');
const path = require('path');

const githubUrl = 'https://raw.githubusercontent.com/oto2020/e_ration_server/master/src/generated/graphql.tsx';
const targetPath = path.join(__dirname, 'src', 'graphql.tsx');

axios.get(githubUrl)
  .then(response => {
    fs.writeFile(targetPath, response.data, err => {
      if (err) {
        console.error('Ошибка при записи файла:', err);
      } else {
        console.log('Файл успешно обновлен!');
      }
    });
  })
  .catch(error => {
    console.error('Ошибка при загрузке файла:', error);
  });
