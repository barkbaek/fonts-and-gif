import Home from '../../Pages/Home'
import Editor from '../../Pages/Editor'

const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    // {
    //     path: "/home",
    //     component: Home
    // },
    // {
    //     path: "/extractaudio",
    //     component: ExtractAudio
    // },
    {
        path: "/editor",
        component: Editor
    }
]

export default routes