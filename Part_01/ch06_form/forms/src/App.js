//import logo from './logo.svg';
import './App.css';
import MyButton01 from './Components/MyButton01';
import MyButton02 from './Components/MyButton02';
import MyInput01 from './Components/MyInput01';
import MyInput02 from './Components/MyInput02';
import MyInputState01 from './Components/MyInputState01';
import MyInputMultiState01 from './Components/MyInputMultiState01';
import MyFormValidation from './Components/MyFormValidation';
import MyFormFieldValidation from './Components/MyFormFieldValidation';
import CourseAsync from './Components/CourseAsync';
import RemotePersist from './Components/RemotePersist';

function App() {
  return (
    <div className="App">
      {/* 6.4 */}
      <RemotePersist />
      
      {/* 6.3 */}
      <CourseAsync />

      {/* 6.2 */}
      <MyInput01 />
      <MyInput02 />
      <MyInputState01 />
      <MyInputMultiState01 />
      <MyFormValidation />
      <MyFormFieldValidation />

      {/* 6.1 */}
      <MyButton01 />
      <MyButton02 />
    </div>
  );
}

export default App;
