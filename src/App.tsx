import { TextFieldVariants } from '@mui/material';
import './App.css';
import CreatePopup from './components/post-create-update';
import { useState } from 'react';

export const MUI_INPUT_VARIANT: TextFieldVariants= "outlined";

export default function App() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <div className="App">
        <CreatePopup isUpdate isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} />
        <CreatePopup isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />
        <button onClick={() => setIsCreateOpen(true)}>Create</button>
        <button onClick={() => setIsUpdateOpen(true)}>Update</button>
    </div>
  );
}