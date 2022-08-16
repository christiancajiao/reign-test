import './App.css';
import {useState, useEffect} from "react"
import AllPost from './components/All';
import Favorites from './components/Favorites';


function App() {

  const [framework, setFramework] = useState('')
  const [listPost, setListPost] = useState([])
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [page, setPage] = useState(0)
  const [arrPages, setArrPages] = useState([0,1,2,3,4,5,6,7,8,9])
  const [sectionSelected, setSectionSelected] = useState('all')

  let request = `https://hn.algolia.com/api/v1/search_by_date?query=${framework}&page=${page}`

  function apiCall() {
    fetch(request)
    .then(response => response.json())
    .then(data => {
      let postArray = data.hits
      let validPostArray = []
      postArray.forEach(post => {
        if(post.story_title !== null) {
          validPostArray.push(post)
        }
      });
      validPostArray.length = 8
      setListPost(validPostArray)
      setNumberOfPages(data.nbPages)
    })
  }
  useEffect(() => {
    apiCall()
  }, [framework, page])

  function getValueFramework(frameworkSelected) {
    setFramework(frameworkSelected.target.value)
  }


  function setItemToStorage(element) {
    //find the objet
    const selectedPost = listPost.find((post) => post.story_id ===  element.target.parentNode.value)
    
    if(localStorage.getItem('Posts') === null) {
      //create a new array with one post
      localStorage.setItem('Posts', JSON.stringify([selectedPost]))
    }  else {
      //if local storage have something check if the postselected already exist
      const favList = localStorage.getItem('Posts')
      const parsedList = JSON.parse(favList)
      //if already exist dont set item

      for(let i = 0; i < parsedList.length; i++) {
        if(selectedPost.story_id === parsedList[i].story_id) {
          return
        }
      }
      //if dont exist added to the array in local storage
  
      const addFav = [...parsedList, selectedPost]
      localStorage.setItem('Posts', JSON.stringify(addFav))
    }

  }

  function sectionActive() {
    if(sectionSelected === 'all') {
      setSectionSelected('favorites')
    }
  }


  function getFavorites() {
    const favList = localStorage.getItem("Posts");
    const parsedList = JSON.parse(favList)

    setListPost(parsedList)
    sectionActive()
  }

  function getAll() {
    apiCall()
    sectionActive()
  }

  function previus() {
    if(page !== 0) {
      setPage(page - 1)
      if(page === arrPages[0]) {
        const pages = arrPages
        pages.pop()
        pages.unshift(arrPages[0] - 1)
      }
    }
  }
  function next() {
    if(page <= numberOfPages) {
      setPage(page + 1)
      if(page === arrPages[arrPages.length -1]) {
        const pages = arrPages
        pages.shift()
        pages.push(arrPages[arrPages.length -1] + 1)
      }    
    }
  }
  
  function indexpage(post) { 
    const valueButton = parseInt(post.target.value)
   
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
      {sectionSelected ? <AllPost list={listPost} setItemToStorage={setItemToStorage} previus={previus} next={next} indexPage={indexpage} arrPages={arrPages} /> : <Favorites list={listPost} setItemToStorage={setItemToStorage} previus={previus} next={next} indexPage={indexpage} arrPages={arrPages} />}
    </div>
  );
}

export default App;
