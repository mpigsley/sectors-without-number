export const generateCSV = (table = []) =>
  table.reduce(
    (csvString, infoArray) =>
      `${csvString}${infoArray.map(item => `"${item}"`).join(',')}\n`,
    'data:text/csv;charset=utf-8,',
  );

export const createCSVDownload = (csvContent, fileName = 'data') => {
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link); // Required for FF
  link.click();
};

export const createImageDownlaod = canvasId => {
  const canvas = document.getElementById(canvasId);
  const image = canvas
    .toDataURL('image/jpg')
    .replace('image/jpg', 'image/octet-stream');
  const link = document.createElement('a');
  link.setAttribute('href', image);
  link.setAttribute('download', 'sector-map.jpg');
  document.body.appendChild(link); // Required for FF
  link.click();
};

export const createJSONDownload = (jsonContent, fileName = 'data') => {
  const str = JSON.stringify(jsonContent, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
    str,
  )}`;
  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', `${fileName}.json`);
  document.body.appendChild(link); // Required for FF
  link.click();
};
