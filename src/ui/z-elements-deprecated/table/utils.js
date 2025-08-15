import { td,tr } from "./elements.js";
export const MatrixToTableUI=matrix=>{
    var Tr = new Array(matrix.rows).fill(null).map(() => tr());
    var Td = matrix.arr.map((n) => n.map(() => null));
    for (let i = 0; i < Td.length; i++) {
        for (let j = 0; j < Td[0].length; j++) {
            Td[i][j] = td(matrix.arr[i][j]);
            Tr[i].append(Td[i][j]);
        }
    }
    return Tr
}