import './App.css';
import {useState, useEffect} from "react"
import EmptyHeart from "./assets/empty-heart.png"


function App() {

  const [framework, setFramework] = useState('')
  const [listPost, setListPost] = useState([])

  let request = `https://hn.algolia.com/api/v1/search_by_date?query=${framework}&page=0`

  useEffect(() => {
    fetch(request)
    .then(response => response.json())
    .then(data => {
      setListPost(data.hits)
      console.log(data.hits)
    })
  }, [framework])

  function getValueFramework(frameworkSelected) {
    setFramework(frameworkSelected.target.value)
  }
  return (
    <div className="App">
      <select id='frameworks' onClick={getValueFramework}>
        <option value="React">React</option>
        <option value="Vue">Vue</option>
        <option value="Angular">Angular</option>
      </select>
      <div className='container_list'> 
        {listPost.map((e) => {
          return(
            <div className='card' >
              <div className='card_information'>
                <span>{e.created_at}</span>
                <p>{e.author}</p>
                <span>{e.story_title}</span>
              </div>
              <div className='card_favorite'>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
