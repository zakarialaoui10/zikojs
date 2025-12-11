import { Matrix } from "../../math/matrix/index.js"
const csv2arr = (csv, delimiter = ",")=>csv.trim().trimEnd().split("\n").map(n=>n.split(delimiter));
const csv2matrix = (csv, delimiter = ",")=>new Matrix(csv2arr(csv,delimiter));
const csv2object = (csv, delimiter = ",") => {
    const [header, ...rows] = csv2arr(csv,delimiter);
    const result = rows.map(row => {
        const obj = {};
        header.forEach((key, index) => {
            obj[key] = row[index];
        });
        return obj;
    });
    return result;
};
const csv2json = (csv, delimiter = ",") => JSON.stringify(csv2object(csv,delimiter));
const csv2sql=(csv, Table)=>{
    const lines = csv.trim().trimEnd().split('\n').filter(n=>n);
    const columns = lines[0].split(',');
    let sqlQuery = `INSERT INTO ${Table} (${columns.join(', ')}) Values `
    let sqlValues = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      sqlValues.push(`(${values})`)
    }
    return sqlQuery+sqlValues.join(",\n");
  }
export{
    csv2arr,
    csv2matrix,
    csv2object,
    csv2json,
    csv2sql
}