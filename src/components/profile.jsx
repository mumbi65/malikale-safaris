import React, {useState, useEffect} from "react"
import axios from "axios"
import SafariGraph from "./safariGraph"
import NavBar from "./navbar"
import Footer from "./footer"
import { faBus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faPersonHiking } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPersonCane } from '@fortawesome/free-solid-svg-icons';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { BeatLoader } from "react-spinners"

const Profile = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [userData, setUserData] = useState(null)
    const [safaris, setSafaris] = useState([])
    const [reviews, setReviews] = useState([])
    const [showPassword, setShowPassword] = useState(false)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        fetchBookedSafaris()
        fetchReviews()
    }, [])

    const fetchBookedSafaris = async () => {
        try {
            const response = await axios.get("https://malikale-safaris.onrender.com/safari/api/booked/", {
                headers: {Authorization: `Token ${token}`},
            })
            setSafaris(response.data)
        } catch (error) {
            console.error("Error fetching booked safaris", error)
        }
    }

    const fetchReviews = async () => {
        try {
            const response = await axios.get("https://malikale-safaris.onrender.com/safari/reviews/", {
                headers: {Authorization: `Token ${token}`},
            })
            console.log("Fetched reviews:", response.data); 
            setReviews(response.data)
        } catch (error) {
            console.error("Error fetching reviews", error)
        }
    }

    const handleReview = (safariId) => {
        console.log("Review safari with id:", safariId)
    }

    const editReview = (reviewId) => {
        console.log("Edit review with id:", reviewId)
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("https://malikale-safaris.onrender.com/api/auth/profile/", {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
                setFormData({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone || "",
                    country: response.data.country || "",
                    password: '',
                })
                setLoading(false)
            }catch (error) {
                setError("Error fetching user profile");
                setLoading(false);
            }
        }
        fetchProfile()
    }, [token])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedData = { ...formData}

        if (!updatedData.password) {
            delete updatedData.password
        }

        try {
            await axios.put("https://malikale-safaris.onrender.com/api/auth/profile/", updatedData, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
            alert("Profile updated successfully")
        } catch (error) {
            setError("Failed to update profile")
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
        "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
        "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
        "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus",
        "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
        "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
        "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
        "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
        "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
        "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
        "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
        "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
        "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
        "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
        "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
        "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
        "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];


    return(
        <>
        <NavBar/>
        <div className="profile-container">
            <div className="main-section">
                <div className="profile-info">
                    <h2>My Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="">First Name:</label>
                            <input
                             type="text" 
                             name="first_name" 
                             value={formData.first_name}
                             onChange={handleChange} 
                             className="input-field" />
                        </div>
                        <div>
                            <label htmlFor="">Last Name:</label>
                            <input 
                            type="text" 
                            name="last_name" 
                            value={formData.last_name}
                            onChange={handleChange}
                            className="input-field" />
                        </div>
                        <div>
                            <label htmlFor="">Email</label>
                            <input 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field" />
                        </div>
                        <div>
                            <label htmlFor="">Phone</label>
                            <input 
                            type="text" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="input-field"/>
                        </div>
                        <div>
                            <label htmlFor="">Country</label>
                            <select
                            name="country" 
                            value={formData.country}
                            onChange={handleChange}
                            className="input-field">
                                <option value="">Choose a country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="password-container">
                            <label htmlFor="">New Password</label>
                            <input 
                            type={showPassword ? "text": "password"}
                            name="password" 
                            value={formData.password}
                            onChange={handleChange} 
                            className="input-fieldy"/>
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </span>
                        </div>
                        <button type="submit" className="profile-button">Save</button>
                        {error && <p>{error}</p>}
                    </form>
                </div>
                {/* Graph Section */}
                <div className="graph-section">
                    <div className="graph-placeholder">
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faBus}  className='icon-detail'/> Transportation</h6>
                            <p>Mini bus, 4x4 Landcruiser</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faBed}  className='icon-detail'/> Accomodation</h6>
                            <p>Mid-range tented camp</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faPlane}  className='icon-detail'/> Depature from</h6>
                            <p>Nairobi</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faSoundcloud}  className='icon-detail'/> Best season</h6>
                            <p>Feb, Mar, Apr & May</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faPersonHiking}  className='icon-detail'/> Tour type</h6>
                            <p>Eco-Tour, Hiking</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faUtensils} className='icon-detail'/> Meals</h6>
                            <p>All meals during the safari</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faLanguage}  className='icon-detail'/> Language</h6>
                            <p>English, Spanish, French, Chinese</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faPersonRunning}  className='icon-detail'/> Fitness level</h6>
                            <p>Easy to Moderate</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faUsers}  className='icon-detail'/> Group</h6>
                            <p>2 - 15</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faChild}  className='icon-detail'/> Minimum Age</h6>
                            <p>12</p>
                        </div>
                        <div className='row-contenty'>
                            <h6><FontAwesomeIcon icon={faPersonCane}  className='icon-detail'/> Maximum Age</h6>
                            <p>65</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Section with Booked Safaris and Reviews */}
            <div className="right-section">
                <div className="booked-safaris">
                    <h2>Booked Safaris</h2>
                    {safaris.length > 0 ? (
                    safaris.map((booking) => (
                        <div key={booking.id} className="safari-cardy">
                            <p><strong>{booking.safari.title}</strong></p>
                            <p>Booking Date: {booking.bookingDate}</p>
                            <p>Location: {booking.safari.location}</p>
                            <button onClick={() => handleReview(booking.id)} className="profile-button">Review</button>
                        </div>
                    ))
                ): (
                    <div className="safari-cardy"> 
                        <p className="booking-paragraph">No bookings yet. Start your adventure by booking a safari!</p>
                    </div>
                )}
                </div>
                <div className="reviews-section">
                    <h2>Your Reviews</h2>
                    { reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <p><strong>{review.safariName}</strong></p>
                            <p><strong>Rating:</strong> {review.rating}</p>
                            <p>{review.comment}</p>
                            <button onClick={() => editReview(review.id)} className="edit-review-button">Edit Review</button>
                        </div>
                    ))
                ) : (
                    <div className="review-card">
                    <p>No reviews yet</p>
                    </div>
                )}
                </div>
            </div>
        </div>
        <button onClick={handleLogout} className="logout-button" disabled={loading}>
            {loading ? <BeatLoader color="white"/>: "Logout"}
            </button>
        <Footer/>
        </>  
    )
}

export default Profile