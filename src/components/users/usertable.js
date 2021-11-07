import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {TextField,Button,Grid} from "@mui/material"
import {Link} from "react-router-dom"
const columns = [
  { id: 'username', label: 'Username', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'usertype', label: 'User type', minWidth: 50 },
  { id: 'branch', label: 'Branch', minWidth: 50 },
  { id: 'admissionno', label: 'Admission no', minWidth: 50 },
  
];



const rows = [
  {
      username:"john",
      name:"john",
      usertype:"student",
      branch:"cse",
      admissionno:"286286",
  },
  {
    username:"john",
    name:"john",
    usertype:"student",
    branch:"cse",
    admissionno:"286286",
},
{
    username:"john",
    name:"robert",
    usertype:"student",
    branch:"cse",
    admissionno:"286286",
},
{
    username:"john",
    name:"robert",
    usertype:"student",
    branch:"cse",
    admissionno:"286286",
},
{
    username:"john",
    name:"spike",
    usertype:"student",
    branch:"cse",
    admissionno:"286286",
},
{
  username:"john",
  name:"spike",
  usertype:"student",
  branch:"cse",
  admissionno:"286286",
},
{
  username:"john",
  name:"peter",
  usertype:"student",
  branch:"cse",
  admissionno:"286286",
},
{
  username:"john",
  name:"peter",
  usertype:"student",
  branch:"cse",
  admissionno:"286286",
},
{
    username:"john",
    name:"john",
    usertype:"student",
    branch:"cse",
    admissionno:"286286",
},
{
  username:"john",
  name:"john",
  usertype:"student",
  branch:"cse",
  admissionno:"286286",
},
{
  username:"john",
  name:"john",
  usertype:"student",
  branch:"cse",
  admissionno:"286286",
},
{
  username:"john",
  name:"john",
  usertype:"student",
  branch:"cse",
  admissionno:"286286",
},
];

const findResults = (query,rows) => {
    var results = []
    if(!query)return rows;
    var iquery = query.toLowerCase(); 
    for(var row of rows){
        //console.log(row.name.toLowerCase().search(iquery))
        if(row.name && row.name.toLowerCase().search(iquery)!=-1){
            results.push(row)
        }
    }
    return results;
}

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [query,setQuery] = React.useState("");
  const [results,setResults] = React.useState(rows);
  React.useEffect(()=>{
    setResults(findResults(query,rows));
  },[query])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden',fontFamily:"arvo" }}>
      <Grid container alignItems="center" justifyContent="center" style={{padding:"20px"}}>
          <Grid container item alignItems="center" justifyContent="center">
              <TextField
                value={query}
                placeholder={"Search user"}
                onChange={(e)=>setQuery(e.target.value)}
              />
              <Button>Search</Button>
          </Grid>
      </Grid>
      <TableContainer style={{padding:"50px"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} component={Link} to={"/profile"}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
