import './App.css';
import {useState, useEffect} from "react"
import Card from './components/card';
import { click } from '@testing-library/user-event/dist/click';


function App() {

  const [framework, setFramework] = useState('')
  const [listPost, setListPost] = useState([])
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [page, setPage] = useState(0)

  let request = `https://hn.algolia.com/api/v1/search_by_date?query=${framework}&page=${page}`

  useEffect(() => {
    fetch(request)
    .then(response => response.json())
    .then(data => {
      let postArray = data.hits
      postArray.length = 8
      setListPost(postArray)
      setNumberOfPages(data.nbPages)
    })
  }, [framework, page])

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


  let arrpages = [1,2,3,4,5,6,7,8,9,10]

  function preview() {
    if(page !== 0) {
      setPage(page - 1)
    }
  }
  function next() {
    if(page <= numberOfPages) {
      setPage(page + 1)
    }
  }
  
  function indexpage(e) { 
    setPage(parseInt(e.target.value))
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
      <div className='pagination-all'>
       <button onClick={preview} className='button_pag'>last</button>
        {arrpages.map((e) => {
          return(
            <button className='button_pag' value={arrpages.indexOf(e)} onClick={indexpage}>{arrpages.indexOf(e)}</button>
          )
        })}
       <button className='button_pag' onClick={next}>next</button>
      </div>
    </div>
  );
}

export default App;
