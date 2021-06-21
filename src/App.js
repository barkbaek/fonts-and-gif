import { withContext } from './Components/@Context'
import Routers from './Components/Routers'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routers />
    </div>
  )
}

export default withContext(App)
