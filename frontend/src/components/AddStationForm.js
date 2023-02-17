const AddStationForm = (props) => {
    return (
        <form onSubmit={props.addStation}>
            <>
                Station name: <input
                value={props.newName}
                onChange={props.handleNoteChange}/>
                Station address: <input
                value={props.newAddress}
                onChange={props.handleAddressChange}/>
            </> <button type="submit">add</button>
        </form>
    )
}

export default AddStationForm