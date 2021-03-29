import _ from 'lodash'
import faker from 'faker'
import React, { Fragment, useState } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
// import NamesContainer from './NamesContainer';


class App extends React.Component {

    state = {
        names: [
            'John', 'Abigail', 'X Æ A-Xii', 'Beyonce', 'Khloe Kardashian', 'George Bush', 'Queen Elizabeth', 'Yeezy', 'Ivanka Trump', 'Leonardo DiCaprio',
        ],
        searchTerm: ''
    }

    editSearchTerm = (e) => {
        this.setState({ searchTerm: e.target.value })
        console.log(this.dynamicSearch());
    }

    dynamicSearch = () => {
        return this.state.names.filter(name => name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }



    render() {
        return (
            <div style={{ textAlign: 'center', paddingTop: '30vh' }}>
                <input type='text' value={this.state.searchTerm} onChange={this.editSearchTerm} placeholder='Search for a name!' />
                <br></br>
                <h3>These are the important names:</h3>
                <div>
                    {this.dynamicSearch().map(name => <div>{name}</div>)}
                </div>

            </div>
        );
    }
}

export default App;
// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);

// const URL = "http://localhost:3001/users";


// // const source = _.times(5, () => ({
// //     title: faker.company.companyName(),
// //     description: faker.company.catchPhrase(),
// //     image: faker.internet.avatar(),
// //     price: faker.finance.amount(0, 100, 2, '$'),
// // }))

// const initialState = {
//     loading: false,
//     results: [],
//     value: '',
// }

// function exampleReducer(state, action) {
//     switch (action.type) {
//         case 'CLEAN_QUERY':
//             return initialState
//         case 'START_SEARCH':
//             return { ...state, loading: true, value: action.query }
//         case 'FINISH_SEARCH':
//             return { ...state, loading: false, results: action.results }
//         case 'UPDATE_SELECTION':
//             return { ...state, value: action.selection }

//         default:
//             throw new Error()
//     }
// }

// function SearchExampleStandard() {
//     const [state, dispatch] = React.useReducer(exampleReducer, initialState)
//     const { loading, results, value } = state
//     var [source, setSource] = useState([]);

//     function users() {
//         fetch(`${URL}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//             .then(response => {
//                 return response.json();
//             })
//             .then(data => {
//                 if (data.success) {
//                     console.log(data.response.rows);
//                     setSource(data.response.rows);
//                 }
//             })
//             .catch(err => {
//                 console.log(err.message);
//                 let error = new Error("Not Found");
//                 error.httpError = 404;
//                 throw error;
//             });

//     }


//     const timeoutRef = React.useRef()
//     const handleSearchChange = React.useCallback((e, data) => {
//         clearTimeout(timeoutRef.current)
//         dispatch({ type: 'START_SEARCH', query: data.value })

//         timeoutRef.current = setTimeout(() => {
//             if (data.value.length === 0) {
//                 dispatch({ type: 'CLEAN_QUERY' })
//                 return
//             }

//             const reg = new RegExp(_.escapeRegExp(data.value))
//             const isMatch = (result) => reg.test(result.login)
//             console.log(reg)
//             console.log(data)
//             console.log(source)

//             dispatch({
//                 type: 'FINISH_SEARCH',
//                 results: _.filter(source, isMatch),
//             })
//         }, 300)
//     }, [])

//     React.useEffect(() => {
//         return () => {
//             users();
//             clearTimeout(timeoutRef.current);
//         }
//     }, [])

//     // console.log(source)

//     return (
//         <Grid>
//             <Grid.Column width={6}>
//                 <Search
//                     loading={loading}
//                     onResultSelect={(e, data) =>
//                         dispatch({ type: 'UPDATE_SELECTION', selection: data.result.login })
//                     }
//                     onSearchChange={handleSearchChange}
//                     results={results}
//                     value={value}
//                 />
//             </Grid.Column>

//             <Grid.Column width={10}>
//                 <Segment>
//                     <Header>State</Header>
//                     <pre style={{ overflowX: 'auto' }}>
//                         {JSON.stringify({ loading, results, value }, null, 2)}
//                     </pre>
//                     <Header>Options</Header>
//                     <pre style={{ overflowX: 'auto' }}>
//                         <table className="table text-center" >
//                             <thead >
//                                 <tr class="text-danger">
//                                     <td > id </td>
//                                     <td > login </td>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {source.map((item, index) => {
//                                     return (
//                                         <tr key={index} >
//                                             <th class="text-primary"> {item.id} </th>
//                                             <th class="text-primary"> {item.login} </th>
//                                             {/* <img src={item.image}></img> */}


//                                         </tr>
//                                     )
//                                 })}
//                             </tbody>
//                         </table>
//                         {JSON.stringify(source, null, 2)}
//                     </pre>
//                 </Segment>
//             </Grid.Column>
//             <button type="button" class="btn btn-primary" onClick={() => users()}>Show users</button>
//         </Grid>
//     )
// }

// export default SearchExampleStandard

// import _ from 'lodash'
// import faker from 'faker'
// import React from 'react'
// import { Search, Grid, Header, Segment } from 'semantic-ui-react'

// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, '$'),
// }))

// const initialState = {
//   loading: false,
//   results: [],
//   value: '',
// }

// function exampleReducer(state, action) {
//   switch (action.type) {
//     case 'CLEAN_QUERY':
//       return initialState
//     case 'START_SEARCH':
//       return { ...state, loading: true, value: action.query }
//     case 'FINISH_SEARCH':
//       return { ...state, loading: false, results: action.results }
//     case 'UPDATE_SELECTION':
//       return { ...state, value: action.selection }

//     default:
//       throw new Error()
//   }
// }

// function SearchExampleStandard() {
//   const [state, dispatch] = React.useReducer(exampleReducer, initialState)
//   const { loading, results, value } = state

//   const timeoutRef = React.useRef()
//   const handleSearchChange = React.useCallback((e, data) => {
//     clearTimeout(timeoutRef.current)
//     dispatch({ type: 'START_SEARCH', query: data.value })

//     timeoutRef.current = setTimeout(() => {
//       if (data.value.length === 0) {
//         dispatch({ type: 'CLEAN_QUERY' })
//         return
//       }

//       const re = new RegExp(_.escapeRegExp(data.value), 'i')
//       const isMatch = (result) => re.test(result.title)

//       console.log(source)

//       dispatch({
//         type: 'FINISH_SEARCH',
//         results: _.filter(source, isMatch),
//       })
//     }, 300)
//   }, [])
//   React.useEffect(() => {
//     return () => {
//       clearTimeout(timeoutRef.current)
//     }
//   }, [])

//   return (
//     <Grid>
//       <Grid.Column width={6}>
//         <Search
//           loading={loading}
//           onResultSelect={(e, data) =>
//             dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
//           }
//           onSearchChange={handleSearchChange}
//           results={results}
//           value={value}
//         />
//       </Grid.Column>

//       <Grid.Column width={10}>
//         <Segment>
//           <Header>State</Header>
//           <pre style={{ overflowX: 'auto' }}>
//             {JSON.stringify({ loading, results, value }, null, 2)}
//           </pre>
//           <Header>Options</Header>
//           <pre style={{ overflowX: 'auto' }}>
//             {JSON.stringify(source, null, 2)}
//           </pre>
//         </Segment>
//       </Grid.Column>
//     </Grid>
//   )
// }

// export default SearchExampleStandard

// import React, { useState, useRef, useCallback } from 'react';
// import axios from 'axios';


// // export const UPLOAD_AVATAR = 'http://localhost:8080/api/upload_avatar';
// const UPLOAD_AVATAR = "http://localhost:3001/fs";

// function App() {
//     // определим изменяемый ref для объекта FileReader
//     const fileRef = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const [_img, setImg] = useState("");


//     const handleSubmit = useCallback(event => {
//         event.preventDefault();

//         const fetchData = async (uint8Array) => {
//             // try {
//             //     const response = await axios({
//             //         method: 'post',
//             //         url: UPLOAD_AVATAR,
//             //         body: JSON.stringify({ email:'fff', password:'ddd' }),
//             //         data: [...uint8Array] // не отправляем в JSON, размер изображения увеличится
//             //     });

//             //     setLoading(false);
//             //     console.log(response);

//             //     setImg(response.data)

//             // } catch (e) {
//             //     console.error(e.message, 'function handleSubmit')
//             // }

//             fetch(`${UPLOAD_AVATAR}`, {
//                 method: 'POST',
//                 headers: {
//                    'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email:'fff', password:'ddd', mas: [...uint8Array] }),
//              })
//                 .then(response => {
//                    return response.text();
//                 })
//                 .then(data => {
//                    console.log(data);
//                    setLoading(false);

//                    setImg(data)
//                 //    if (data.success) {

//                 //       if (this.ls !== undefined) {
//                 //          this.ls.setItem("login", email);
//                 //          this.ls.setItem("password", password);
//                 //          this.ls.setItem("token", data.token);
//                 //       }
//                 //       this.props.history.push('/showpage');
//                 //    }
//                 //    else this.setState({ message: data.message });


//                 })
//                 .catch(err => {
//                    alert(err);
//                    console.log("Not Found");
//                 });
//         };

//         if (!fileRef.current) return void null;

//         const reader = new FileReader();
//         reader.onloadend = () => {
//             console.log(reader.result)
//             const uint8Array = new Uint8Array(reader.result);
//             setLoading(true);
//             fetchData(uint8Array);
//         };


//         // рекомендованный метод
//         reader.readAsArrayBuffer(fileRef.current[0]);
// console.log(fileRef.current[0])
//         // метод reader.readAsBinaryString(fileRef.current[0]) 
//         // согласно MDN,
//         // уже был однажды удален из File API specification, 
//         // но после его вернули
//         // в использование, но все же рекомендуют 
//         // использовать readAsArrayBuffer
//         // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
//     }, []);

//     const nodeDom = (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <input
//                     onChange={e => fileRef.current = e.target.files}
//                     accept="image/*"
//                     type="file"
//                     id="button-file"
//                 />
//             </div>
//             <button type="submit">{loading ? 'Сохраняю...' : 'Сохранить'}</button>
//             <img src={_img}></img>
//         </form>
//     );

//     return nodeDom
// }

// export default App;
