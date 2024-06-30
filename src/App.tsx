import { TextFieldVariants } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreatePopup from './components/post/create-update-popup';
import NotFound from './pages/not-found';
import { PostSection } from './pages/post-section';
import CommentSection from './pages/comment-section';

export const MUI_INPUT_VARIANT: TextFieldVariants = "outlined";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" />
                    <Route path="/trend" Component={PostSection} />
                    <Route path='/comments' Component={CommentSection} />
                    <Route Component={NotFound} path="/*" />
                </Routes>
            </BrowserRouter>
        </div>
    );
}