
function Pagination(props) {
    return(
        <div className='pagination-all'>
        <button onClick={props.previus} className='button_pag'>{`<`}</button>
            {props.arrPages.map((e) => {
            return(
                <button className='button_pag' value={e} onClick={props.indexPage}>{e}</button>
            )
            })}
        <button className='button_pag' onClick={props.next}>{`>`}</button>
        </div>
    )
}

export default Pagination