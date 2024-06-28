import { TextFieldVariants } from '@mui/material';
import './App.css';
import CreatePopup from './components/post-create-update';

export const MUI_INPUT_VARIANT: TextFieldVariants= "outlined";

export default function App() {
  return (
    <div className="App">
        <CreatePopup />
        <button onClick={() => console.log("fasfsad")}>asdfasd</button>
    </div>
  );
}