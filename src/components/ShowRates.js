import React, { Fragment, useEffect, useState } from "react";
import { useMeasure } from "react-use";
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
    const [containerRef, { width: containerWidth }] = useMeasure();
    // The chart that we want to download the PNG for.
    const URL = "http://localhost:3001";


    const [dataRates, setdataRates] = useState([]);

    const rate = "USD";

    function auth(){
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
               console.log(data);
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

    useEffect(() => {
        auth();
      }, []);

    return (
        <Fragment>
            <a href="#myModal1" class="btn btn-primary" data-toggle="modal">Открыть модальное окно 1</a>



            <div id="myModal1" class="modal fade">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">Заголовок модального окна 1</h4>
                        </div>
                        <div class="modal-body">
                            <div id="container" ref={containerRef}>
                                <h2>recharts-to-png example with FileSaver</h2>
                                <br />
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
                               <br />
                                <p>Source</p>
                                <embed
                                    type="text/html"
                                    src="https://codesandbox.io/embed/busy-lake-dyy8q?autoresize=1&fontsize=14&hidenavigation=1&theme=light&view=editor"
                                    width={containerWidth}
                                    height={600}
                                />
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                            <button type="button" class="btn btn-primary" >Сохранить изменения</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default App;