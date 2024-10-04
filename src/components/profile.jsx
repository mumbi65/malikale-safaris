import React, {useState, useEffect} from "react"
import axios from "axios"

const Profile = () => {
    const [userData, setUserData] = useState(null)
    const token = localStorage.getItem("token")
    const [safaris, setSafaris] = useState([])
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetchBookedSafaris()
        fetchReviews()
    }, [])

    const fetchBookedSafaris = () => {
        // mock data
        const bookedSafaris = [
            {id: 1, name: "Safari to Kilimanjaro", dates: "01/01/2024 - 01/07/2024", location: "Tanzania"},
            { id: 2, name: "Safari to Maasai Mara", dates: "05/10/2024 - 05/14/2024", location: "Kenya" },
        ]
        setSafaris(bookedSafaris)
    }

    const fetchReviews = () => {
        // mock data
        const userReviews = [
            { id: 1, safariName: "Safari to Kilimanjaro", reviewText: "Amazing experience!" },
            { id: 2, safariName: "Safari to Maasai Mara", reviewText: "Breathtaking views!" },
          ]
          setReviews(userReviews)
    }

    const handleReview = (safariId) => {
        console.log("Review safari with id:", safariId)
    }

    const editReview = (reviewId) => {
        console.log("Edit review with id:", reviewId)
    }

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const response = await axios.get("http://127.0.0.1:8000/profile/", {
    //                 headers: {
    //                     Authorization: `Token ${token}`,
    //                 },
    //             })
    //             setUserData(response.data)
    //         }catch (error) {
    //             console.error("Error fetching user profile", error)
    //         }
    //     }
    //     fetchProfile()
    // }, [token])

    // if (!userData){
    //     return <div>Loading...</div>
    // }

    return(
        <>
        <div className="profile-container">
            <div className="main-section">
                <div className="profile-info">
                    <h2>My Data</h2>
                    <form>
                        <div>
                            <label htmlFor="">First Name:</label>
                            <input type="text" name="first_name" defaultValue="Alexandra" className="input-field" />
                        </div>
                        <div>
                            <label htmlFor="">Last Name:</label>
                            <input type="text" name="last_name" defaultValue="Fomenko" className="input-field" />
                        </div>
                        <div>
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" defaultValue="example@company.com" className="input-field" />
                        </div>
                        <div>
                            <label htmlFor="">Phone</label>
                            <input type="text" name="phone" defaultValue="+25412345678" className="input-field"/>
                        </div>
                        <div>
                            <label htmlFor="">Country/Region:</label>
                            <input type="text" name="country" defaultValue="Russia" className="input-field"/>
                        </div>
                        <div>
                            <label htmlFor="">Password</label>
                            <input type="password" name="password" defaultValue="Russia" className="input-field"/>
                        </div>
                        <button type="submit" className="profile-button">Save</button>
                    </form>
                </div>
                {/* Graph Section */}
                <div className="graph-section">
                    <h2>Schedule of Safaris</h2>
                    <div className="graph-placeholder">
                        <p>Graph showing upcoming safaris, past safaris, e.t.c</p>
                    </div>
                </div>
            </div>
            {/* Right Section with Booked Safaris and Reviews */}
            <div className="right-section">
                <div className="booked-safaris">
                    <h2>Booked Safaris</h2>
                    {safaris.map((safari) => (
                        <div key={safari.id} className="safari-cardy">
                            <p><strong>{safari.name}</strong></p>
                            <p>{safari.dates}</p>
                            <p>{safari.location}</p>
                            <button onClick={() => handleReview(safari.id)} className="profile-button">Review</button>
                        </div>
                    ))}
                </div>
                <div className="reviews-section">
                    <h2>Your Reviews</h2>
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <p><strong>{review.safariName}</strong></p>
                            <p>{review.reviewText}</p>
                            <button onClick={() => editReview(review.id)} className="edit-review-button">Edit Review</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>  
    )
}

export default Profile