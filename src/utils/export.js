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
