import React from 'react';
import { Provider } from 'react-redux'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Registration from './components/Registration'
import Authorization from './components/Authorization';
import store from './store/store';
import ShowPage from './components/ShowPage';

function App() {
    return (
        <Provider store={store}>
            <div className="container-fluid">
                <BrowserRouter>
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <Switch>
                                <Route exact path="/" component={Authorization} />
                                <Route path="/showpage" component={ShowPage} />
                                <Route path="/registration" component={Registration} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;