import React, {useEffect} from 'react';
import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import './App.css'
import Login from "./components/Login/Login";
import Layout from "./components/Layout";
import Kanban from "./components/Kanban/Kanban";
import Profile from "./components/Profile/Profile";
import Deal from "./components/Deal/Deal";
import ListUsers from "./components/Lists/ListUsers";
import ListClients from "./components/Lists/ListClients";
import ListDeals from "./components/Lists/ListDeals";
import Loader from "./components/loader/loader";
import Page404 from "./components/errorPages/404"
import AddClient from "./components/AddTask/AddClient";
import AddTask from "./components/AddTask/AddTask";
import AddUser from "./components/AddTask/AddUser";

import {requestAllTasks} from "./actions/task";


axios.defaults.baseURL = 'http://localhost:5000/v1';

function App() {
    const isAuth = useSelector(state => state.auth.isAuth)
    const preloader = useSelector(state => state.preloader.isLoading)
    const dispatch = useDispatch()

    // const allTasks = useSelector(state => state.task)
    useEffect(() => {
        dispatch(requestAllTasks())
    }, [])

    return (
        <div>
            {preloader && <Loader/>}
            <BrowserRouter>
                <div className="container">
                    {!isAuth &&
                        <Routes>
                            <Route path="/" element={<Login/>}/>
                            <Route path="*" element={<Page404 check={isAuth}/>}/>
                        </Routes>
                    }
                    {isAuth &&
                        <Routes>
                            <Route path="/" element={<Layout/>}>
                                <Route index element={<Kanban/>}/>
                                <Route path="profile" element={<Profile/>}/>
                                <Route path="listUsers" element={<ListUsers/>}/>
                                <Route path="listClients" element={<ListClients/>}/>
                                <Route path="listDeals" element={<ListDeals/>}/>
                                <Route path="addClient" element={<AddClient/>}/>
                                <Route path="addTask" element={<AddTask/>}/>
                                <Route path="addUser" element={<AddUser/>}/>
                                <Route path="deal/:id" element={<Deal />}/>
                                <Route path="*" element={<Page404/>}/>
                            </Route>
                        </Routes>
                    }
                </div>
            </BrowserRouter>

        </div>
    )
}

export default App