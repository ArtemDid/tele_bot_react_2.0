import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import './style.css';


const App = () => {
    const URL = "http://localhost:3001/users";

    var [source, setSource] = useState([]);
    var [searchTerm, setSearchTerm] = useState("");


    const users = () => {
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
                    console.log(data.response.rows);
                    setSource(data.response.rows);
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
        users();
    }, [])

    const editSearchTerm = (e) => {
        setSearchTerm(e.target.value);
        console.log(dynamicSearch());
    }

    const dynamicSearch = () => {
        return source.filter(name => name.login.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    const renderCurrency = dynamicSearch().map((item, index) => {
        return (
            <tr key={index}>
                <th className="text-primary"> {index + 1} </th>
                <th className="text-success"> {item.login} </th>
                <th> <img src={item.path} className="round"></img> </th>
            </tr>
        )
    });


    return (
        <div className='main'>
            <NavLink to="/showpage" className="btn btn-primary" activeClassName="active">Main Page</NavLink>
            <form>
                <input type='text' className="search" value={searchTerm} onChange={(e) => editSearchTerm(e)} placeholder='Search for a login! &#128269;' />
            </form>
            <br></br>
            <h3>These are the important names:</h3>
            <div className="d-flex justify-content-center " >
                <div className="p-2">
                    <table className="table text-center" >
                        <thead >
                            <tr className="text-danger">
                                <td > id </td>
                                <td > login </td>
                                <td > ava </td>
                            </tr>
                        </thead>
                        <tbody >
                            {renderCurrency}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    );
};

export default App;