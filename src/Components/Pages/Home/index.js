import { useHistory } from 'react-router-dom'
import './index.scss'

function Home(props) {
    const history = useHistory()

    function handleClickMovePage(page) {
        history.push(page)
    }

    const list = [
        // {
        //     link: '/example',
        //     label: 'Move to Example Page =>'
        // },
        {
            link: '/editor',
            label: 'Move to Editor Page =>'
        },
        // {
        //     link: '/extractaudio',
        //     label: 'Move to ExtractAudio Page =>'
        // }
    ]

    return (
        <div className="home-root-container">
            <div className="title-container">
                <span>This is homepage!</span>
            </div>
            {
                list.map(({ link, label }) => (
                    <div className="move-example-container" onClick={() => handleClickMovePage(link)}>
                        <span>{label}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Home