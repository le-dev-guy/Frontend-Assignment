import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Instruments.css';
import { filterExpiredInstruments } from './utils/utils';
import { dummyData } from './testData/data';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Instruments() {
  const params = useParams();
  const [quotes, setQuotes] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const classes = useStyles();
  let interval;
  var quotesData = [];

  useEffect(() => {
    const fetchQuotes = () => {
      fetch(`https://prototype.sbulltech.com/api/v2/quotes/${params.symbol}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.payload) {
            let rawData = data.payload[`${params.symbol}`];
            rawData = [...rawData, ...dummyData]
            rawData = filterExpiredInstruments(rawData, 'api use effect');
            rawData.sort((a, b) => new Date(b.time) - new Date(a.time));
            setQuotes(rawData);
          }
        });
    };
    if (!quotes.length) {
      fetchQuotes();
    }

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (quotes.length) {
      interval = setInterval(deleteExpiredInstruments, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [quotes]);

  const deleteExpiredInstruments = () => {
    quotesData = filterExpiredInstruments(quotes, 'deleteExpiredInstruments');
    if (quotesData.length) {
      setQuotes(quotesData);
    } else {
      setQuotes([]);
      clearInterval(interval);
    }
  };

  const sortQuotesByTime = () => {
    setIsAscending(!isAscending);
    const data = quotes;
    if (isAscending) {
      setQuotes(data.sort((a, b) => new Date(a.time) - new Date(b.time)));
    } else {
      setQuotes(data.sort((a, b) => new Date(b.time) - new Date(a.time)));
    }
  };
  return (
    <div className="quotes-container">
      <h2 className="quotes-title">{params.symbol || null}</h2>
      <Paper id="table-container">
        <TableContainer>
          <Table className={classes.table} id="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" id="table-head">
                  Price
                </TableCell>
                <TableCell align="center" id="table-head">
                  Time
                  <p onClick={sortQuotesByTime}>
                    <i className={`arrow ${isAscending ? 'down' : 'up'}`}></i>
                  </p>
                </TableCell>
                <TableCell align="center" id="table-head">
                  Valid
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotes.length ? (
                quotes.map((row) => (
                  <TableRow key={row.price} id="table-row">
                    <TableCell align="center">{row.price.toFixed(2) || 'NA'} </TableCell>
                    <TableCell align="center">{row.time || 'NA'} </TableCell>
                    <TableCell align="center">
                      {row.valid_till || 'NA'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={3} id="expired-text">
                    All Instruments Expired <br/>
                    <p className='expired-text-note'>Note: Valid Till Column's value is less than current time i.e expired.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default Instruments;
