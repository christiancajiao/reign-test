import './App.css';
import {useState, useEffect} from "react"
import Card from './components/card';
import { click } from '@testing-library/user-event/dist/click';


function App() {

  const [framework, setFramework] = useState('')
  const [listPost, setListPost] = useState([])
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [page, setPage] = useState(0)
  const [arrPages, setArrPages] = useState([0,1,2,3,4,5,6,7,8,9])

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
    // if object already exist in localstorage , then deleted 


    //if locar storage is empty create an array with the object
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

  function preview() {
    if(page !== 0) {
      setPage(page - 1)
      if(page === arrPages[0]) {
        const pages = arrPages
        pages.pop()
        pages.unshift(arrPages[0] - 1)
      }
    }
  }
  function next(e) {
    if(page <= numberOfPages) {
      setPage(page + 1)
      if(page === arrPages[arrPages.length -1]) {
        const pages = arrPages
        pages.shift()
        pages.push(arrPages[arrPages.length -1] + 1)
      }
      
    }

    
    
  }
  
  function indexpage(e) { 
    const valueButton = parseInt(e.target.value)
   
    if(valueButton === arrPages[arrPages.length -1]) {

      const pages = arrPages
      pages.shift()
      pages.push(valueButton + 1)
     
    }
    setPage(valueButton)
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
       <button onClick={preview} className='button_pag'>{`<`}</button>
        {arrPages.map((e) => {
          return(
            <button className='button_pag' value={e} onClick={indexpage}>{e}</button>
          )
        })}
       <button className='button_pag' onClick={next}>{`>`}</button>
      </div>
    </div>
  );
}

export default App;
