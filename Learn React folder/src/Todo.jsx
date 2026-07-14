function ToDoList(props) {
    return(
        <li>{props.id}. {props.judul} status : {props.status}</li>
    )
}

export default ToDoList;