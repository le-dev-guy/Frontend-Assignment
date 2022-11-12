export const csvToJSON = (csv, setFilteredRows, setOriginalRows) => {
  const lines = csv.split('\n');
  const result = [];
  let headers;
  headers = lines[0].split(',');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};

    if (lines[i] == undefined || lines[i].trim() == '') {
      continue;
    }

    var words = lines[i].split(',');
    for (var j = 0; j < words.length; j++) {
      obj[headers[j].trim()] = words[j];
    }
    result.push(obj);
  }
  result.push();
  setFilteredRows(result);
  setOriginalRows(result);
};
