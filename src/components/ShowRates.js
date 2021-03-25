import React, { Fragment, useEffect, useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import './style.css';

export const App = () => {
    // const [containerRef, { width: containerWidth }] = useMeasure();
    // The chart that we want to download the PNG for.
    const URL = "http://localhost:3001";

    const [dataRates, setdataRates] = useState([]);
    const [rate, setCurrencyRates] = useState('USD');

    const Currency = ['AZN', 'BYN', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'GEL', 'HUF', 'ILS', 'JPY', 'KZT', 'MDL', 'NOK', 'PLZ', 'RUB', 'SEK', 'SGD', 'TMT', 'TRY', 'USD', 'UZS']

    function rates() {
        fetch(`${URL}/rates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rate }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data, rate);
                if (data.success) {
                    console.log(data.mas);
                    setdataRates(data.mas);
                }
            })
            .catch(err => {
                console.log(err.message);
                let error = new Error("Not Found");
                error.httpError = 404;
                throw error;
            });

    }

    function currency(event) {
        setCurrencyRates(event.target.value);
        console.log(event.target.value)
    }

    const renderCurrency = Currency.map((item, index) => {
        return (
            <input  type='text' readOnly class="dropdown-item" value={item} key={index} onClick={(event) => currency(event)}/>
        )
    });

    return (
        <Fragment>
            <a class="btn btn-primary" data-toggle="modal" data-target="#largeModal">Monitoring of courses </a>

            <div id="largeModal" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">Monitoring of courses of {rate}</h4>
                        </div>
                        <div class="modal-body">
                            <div id="container" >
                                <LineChart
                                    data={dataRates}
                                    height={300}
                                    width={600}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                                >
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="saleRate"
                                        stroke="#8884d8"
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line type="monotone" dataKey="purchaseRate" stroke="#82ca9d" />
                                </LineChart>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <span class="sr-only">Currency</span>
                                </button>
                                <div class="dropdown-menu scrollable">
                                    {renderCurrency}
                                </div>
                            </div>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => rates()}>Show rates</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default App;