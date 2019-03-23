const parse = require('csv-parse')
const fs = require('fs')

const readFile = (file) => new Promise( ( resolve, reject ) => {
  let result = [];
  fs.createReadStream(file)
  .pipe(parse())
  .on('data', data => {
    result.push(data[0])
  })
  .on('end', () => {
    resolve(result)
  })
  .on('error', reject);
});

const createFile = async () => {
  const data = await readFile('../files/sudoku.csv')
  fs.writeFileSync('../files/sudoku.json', JSON.stringify({data}))
}

createFile()
