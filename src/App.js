import './App.css';
import {useState, useEffect} from "react"
import EmptyHeart from "./assets/empty-heart.png"
import Time from "./assets/time.png"


function App() {

  const [framework, setFramework] = useState('')
  const [listPost, setListPost] = useState([])

  let request = `https://hn.algolia.com/api/v1/search_by_date?query=${framework}&page=0`

  useEffect(() => {
    fetch(request)
    .then(response => response.json())
    .then(data => {
      let postArray = data.hits
      postArray.length = 8
      setListPost(postArray)
      console.log(postArray)
    })
  }, [framework])

  function getValueFramework(frameworkSelected) {
    setFramework(frameworkSelected.target.value)
  }

  let isFavorite = false

  function setItemToStorage(element) {
    //find the objet
    const selectedPost = listPost.find((post) => post.story_id ===  element.target.parentNode.value)
    
    localStorage.setItem('Posts', JSON.stringify(selectedPost))
    //stringify the object
    //set the objet
    isFavorite = true
  }

  function getFavorites() {
    const favList = localStorage.getItem('Posts')
    const parsedList = JSON.parse(favList)
    //its a sigle object not an array
    const arrStorage = [parsedList]

    setListPost(arrStorage)
  }

  function getAll() {
    fetch(request)
    .then(response => response.json())
    .then(data => {
      let postArray = data.hits
      postArray.length = 8
      setListPost(postArray)
    })
  }
  return (
    <div className="App">
      <header className='header'>HACKER NEWS</header>
      <div className='nav-buttons'>
        <button onClick={getAll}>All</button>
        <button onClick={getFavorites}>My faves</button>
      </div>
      <select id='frameworks' onClick={getValueFramework}>
        <option value="React">React</option>
        <option value="Vue">Vue</option>
        <option value="Angular">Angular</option>
      </select>
      <ul className='container_list'> 
        {listPost.map((e) => {
          return(
            <li className='card' value={e.story_id}>
              <div className='card_information'>
                <div className='card_information-created'>
                  <img className="time-icon" src={Time}/>
                  <span>{e.created_at}</span>
                  <span> by {e.author}</span>
                </div>
                <div>
                  <span>{e.story_title}</span>
                </div>
              </div>
              <div className={isFavorite ? 'card_favorite' : 'card_non_favorite'} onClick={setItemToStorage}>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
