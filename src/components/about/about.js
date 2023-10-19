import "./about.css";
import {Link} from 'react-router-dom'
function AboutPage(){
    return(
        <div className="about-container">
            <h1>About</h1>
            <p>This website has been created for the most emminent and lucrative form of commercial and publicizing business
                of selling products to facilitate the shopping process and making all sorts of goods and commodities available at
                one platform. Although this is a rudimentary demonstration of an E-commerce website, it does articulate how seamless
                and smooth it is for sellers to advertise their products and for buyers to buy any product of their desire as an extremely 
                cinch and easy manner. This website has been built using React.js, Redux, Axios, react-router, hooks, props and localstorage on the client side
                and extensively utilizes mongodb, mongoose, express on the server side.
            </p>
            <Link to="/" className="home-link">Back to homepage</Link>
        </div>
    )
}

export default AboutPage