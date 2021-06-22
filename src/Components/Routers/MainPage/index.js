import Home from '../../Pages/Home'
import Fonts from '../../Pages/Fonts'
import Gif from '../../Pages/Gif'

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
        path: "/fonts",
        component: Fonts
    },
    {
        path: "/gif",
        component: Gif
    },
]

export default routes