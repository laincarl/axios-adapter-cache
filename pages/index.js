
import axios from '../axios'
export default function Home() {
  const request = () => {
    axios({
      url: '/api/hello',
      method: 'get'
    }).then(async (response) => {
      console.log('Request response:', response)
    })
    axios({
      url: '/api/hello',
      method: 'get'
    }).then(async (response) => {
      console.log('Request response:', response)
    })

  }
  return (
    <div>
      <button onClick={request}>request</button>
    </div>
  )
}
