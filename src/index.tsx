
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'swiper/css';
import { WebSocketProvider } from './components/context/WebSocketContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

    <WebSocketProvider>

        <App />
        
    </WebSocketProvider>


);


