import './App.css';
import {useState, useEffect} from "react"
import Card from './components/card';


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


  function setItemToStorage(element) {
    //find the objet
    const selectedPost = listPost.find((post) => post.story_id ===  element.target.parentNode.value)

    if(localStorage.getItem('Posts') === null) {
      console.log('estavacio')
      localStorage.setItem('Posts', JSON.stringify([selectedPost]))
    } else {
      console.log('no esta vacio')
      const favList = localStorage.getItem('Posts')
      const parsedList = JSON.parse(favList)
      const addFav = [...parsedList, selectedPost]
      localStorage.setItem('Posts', JSON.stringify(addFav))
    }

  }

  function getFavorites() {
    const favList = localStorage.getItem('Posts')
    const parsedList = JSON.parse(favList)

    setListPost(parsedList)
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
            <Card value={e.story_id} created={e.created_at} author={e.author} title={e.story_title} saveLocal={setItemToStorage}/>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
