import React, { Fragment, useState } from "react";
import './style.css';

export const App = () => {
    const URL = "http://localhost:3001/rates/today";

    const [dataRates, setdataRates] = useState([]);

    function rates() {
        fetch(`${URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    console.log(data.itemUSD);
                    data.itemUSD.shift();
                    setdataRates(data.itemUSD);
                }
            })
            .catch(err => {
                console.log(err.message);
                let error = new Error("Not Found");
                error.httpError = 404;
                throw error;
            });

    }

    const renderCurrency = dataRates.map((item, index) => {
        return (
            <tr key={index} >
                <th class="text-primary"> {item.baseCurrency} </th>
                <th class="text-success"> {item.currency} </th>
                <th class="text-primary"> {item.saleRate?item.saleRate:item.saleRateNB} </th>
                <th class="text-info"> {item.purchaseRate?item.purchaseRate:item.purchaseRateNB} </th>
            </tr>
        )
    });

    return (
        <Fragment>
            <a class="btn btn-primary" data-toggle="modal" data-target="#largeModal2">Course for today </a>

            <div id="largeModal2" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">Monitoring of course for today</h4>
                        </div>
                        <div class="modal-body">
                            <div id="container" >
                                <table className="table text-center" >
                                    <thead >
                                        <tr class="text-danger">
                                            <td > baseCurrency </td>
                                            <td > currency </td>
                                            <td > saleRate </td>
                                            <td > purchaseRate </td>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {renderCurrency}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <div class="modal-footer">
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