/* eslint-disable no-unreachable */
import './App.css';
import React, { useState, useEffect } from 'react';
import { COLUMS } from './COLUMS';
import { useTable } from 'react-table';

var ccxt = require ('ccxt');
const proxy = 'https://cors-anywhere.herokuapp.com/'
const binance = new ccxt.binance ({ enableRateLimit: false  })
const ftx = new ccxt.ftx ({ enableRateLimit: false , proxy: proxy , timeout: 30000 })
const mexc = new ccxt.mexc({ enableRateLimit: false , proxy: proxy , timeout: 30000 })
/*const bybit = new ccxt.bybit({ enableRateLimit: false , proxy: proxy , timeout: 30000 })*/
const gateio = new ccxt.gateio({ enableRateLimit: false , proxy: proxy , timeout: 30000 })


const App = () => {

  const [resBinance, setResBinance] = useState();
  const [resFTX, setResFTX] = useState();
  const [resMEXC, setResMEXC] = useState();
  /*const [resByBit, setResByBit] = useState();
  const [loadingByBit, setLoadingByBit] = useState();*/
  const [resGateIo, setResGateIo] = useState();
  const [loadingGateIo, setLoadingGateIo] = useState(false);
  const [loadingBinance, setLoadingBinance] = useState(false);
  const [loadingFTX, setLoadingFTX] = useState(false);
  const [loadingMEXC, setLoadingMEXC] = useState(false);

  useEffect(() => {
    async function binanceset () {
      const result = await Promise.all ([
        binance.fetchOrderBook ('BTC/USDT', 1),
        binance.fetchOrderBook ('ETH/USDT', 1),
        binance.fetchOrderBook ('ETH/BTC', 1),
      ])
      await new Promise (resolve => setTimeout (resolve, 3000))
      if(result !== undefined && loadingBinance !== true){
        setResBinance(result);
        setLoadingBinance(true);
      }
    }
    binanceset();
  }, [loadingBinance])
    
  useEffect(() => {
    async function FTXset () {
      const result = await Promise.all ([
        ftx.fetchOrderBook ('BTC/USDT', 1),
        ftx.fetchOrderBook ('ETH/USDT', 1),
        ftx.fetchOrderBook ('ETH/BTC', 1),
      ])
      await new Promise (resolve => setTimeout (resolve, 3000))
      if(result !== undefined && loadingFTX !== true){
        setResFTX(result);
        setLoadingFTX(true);
      }
    }
    FTXset();
  }, [loadingFTX])

  useEffect(() => {
    async function MEXCset () {
      const result = await Promise.all ([
        mexc.fetchOrderBook ('BTC/USDT', 1),
        mexc.fetchOrderBook ('ETH/USDT', 1),
        mexc.fetchOrderBook ('ETH/BTC', 1),
        
      ])
      await new Promise (resolve => setTimeout (resolve, 3000))
      if(result !== undefined && loadingMEXC !== true){
        setResMEXC(result);
        setLoadingMEXC(true);
      } 
    }
    MEXCset();
  }, [loadingMEXC])

  useEffect(() => {
    async function GateIoset () {
      const result = await Promise.all ([
        gateio.fetchOrderBook ('BTC/USDT', 1),
        gateio.fetchOrderBook ('ETH/USDT', 1),
        gateio.fetchOrderBook ('ETH/BTC', 1),
        
      ])
      await new Promise (resolve => setTimeout (resolve, 3000))
      if(result !== undefined && loadingGateIo !== true){
        setResGateIo(result);
        setLoadingGateIo(true);
      } 
    }
    GateIoset();
  }, [loadingGateIo])

  /*useEffect(() => {
    async function ByBitset () {
      const result = await Promise.all ([
        bybit.fetchOrderBook ('BTC/USDT', 1),
        bybit.fetchOrderBook ('ETH/USDT', 1),
        bybit.fetchOrderBook ('ETH/BTC', 1),
        
      ])
      await new Promise (resolve => setTimeout (resolve, 3000))
      if(result !== undefined && loadingByBit !== true){
        setResByBit(result);
        setLoadingByBit(true);
      } 
    }
    ByBitset();
  }, [loadingByBit])*/
  
  if(resBinance !== undefined){
    console.log(resBinance);
  }
  if(resFTX !== undefined){
    console.log(resFTX);
  }
  if(resMEXC !== undefined){
    console.log(resMEXC);
  }
  /*if(resByBit !== undefined){
    console.log(resByBit);
  }*/
  if(resGateIo !== undefined){
    console.log(resGateIo);
  }

  const Table = () => {
    const tableInstance = useTable({
      columns: COLUMS,
      data: resBinance,
    });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    return(
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getFooterGroupProps()}>
                {
                  headerGroup.headers.map( column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map(row => {
              prepareRow(row)
                return(
                  <tr{...row.getRowProps()}>
                    {
                      row.cells.map((cell)  => {
                        return (
                          <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
                        ) 
                      })
                    }
                  </tr>
                )
            })
          }
        </tbody>
      </table>
    )
  }

  return (
    <div className="app">
      <Table/>
    </div>
  );
}

export default App;
