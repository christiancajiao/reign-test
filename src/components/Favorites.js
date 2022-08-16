import Card from "./card"
import Pagination from "./Pagination"

function Favorites(props) {
    return(
        <div>
            <ul className='container_list'> 
                {props.list.map((post) => {
                return(
                    <Card 
                    value={post.story_id} 
                    created={post.created_at} 
                    author={post.author} 
                    title={post.story_title} 
                    saveLocal={props.setItemToStorage}
                    />
                )
                })}
            </ul>
            <Pagination next={props.next} previus={props.previus} indexPage={props.indexPage} arrPages={props.arrPages} />
        </div>
       
    )
}

export default Favorites