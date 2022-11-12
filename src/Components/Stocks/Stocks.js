import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from 'material-ui-search-bar';
import { stocksOriginalData } from '../../Constants.js/stocksData';
import './Stocks.css';
import { fetchStocksData } from './utils/fetchStocks';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Stocks() {
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState('');
  const classes = useStyles();

  useEffect(() => {
    fetchStocksData(setRows);
  }, []);

  const requestSearch = (searchVal) => {
    const filteredRows = stocksOriginalData.filter((row) => {
      return row.Symbol.toLowerCase().includes(searchVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  return (
    <div className="stock-container">
      <Paper id="stocks-table">
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} id="table" aria-label="simple table">
            <TableHead id="table-head">
              <TableRow>
                <TableCell id="table-head">Symbol</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Sector</TableCell>
                <TableCell align="center">Valid Till</TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="table-body">
              {rows.length ? (
                rows.map(
                  (row) =>
                    row.Symbol && (
                      <TableRow key={row.Name} id="table-row">
                        <TableCell component="th" scope="row" id="row">
                          <Link to={`/${row.Symbol}`}>
                            {row.Symbol || 'NA'}
                          </Link>
                        </TableCell>
                        <TableCell align="center" id="row">
                          {row.Name || 'NA'}{' '}
                        </TableCell>
                        <TableCell align="center" id="row">
                          {row.Sector || 'NA'}
                        </TableCell>
                        <TableCell align="center" id="row">
                          {row.Validtill || 'NA'}
                        </TableCell>
                      </TableRow>
                    )
                )
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={4} id="expired-text">
                    No Symbol Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
    </div>
  );
}

export default Stocks;
