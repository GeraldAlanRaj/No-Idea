import "../styles/components/StaffCard.css"
const StaffCard = (props) => {

    return(
        <div className="card">
        <img src={props.image} alt="Avatar"/>
         <div class="container">
         <h2><b>Name Here</b></h2> 
            <p><i>About the mentor</i></p> 
            <p><i>About the mentor</i></p> 
        </div>
        </div>
    );
}

export default StaffCard;