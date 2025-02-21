// SafariDetail.js
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './navbar';
import Footer from './footer';
import { Accordion, Card } from 'react-bootstrap';
import { useSafari } from './safaricontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faBus, faBed, faPlane, faPersonHiking, faUtensils, faLanguage, faPersonRunning, faUsers, faPersonCane, faChild } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { useFormik } from 'formik';
import { bookingFormSchema } from '../schema';
import app from '../firebaseconfig';
import { getDatabase, ref, set, push } from 'firebase/database';
import axios from 'axios';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PropagateLoader } from 'react-spinners';
import PhoneInput from 'react-phone-number-input';



const SafariDetail = () => {
  const { safariId } = useParams()
  const [safari, setSafari] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [safariLoading, setSafariLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [phone, setPhone] = useState()
  const { mapData } = useSafari()
  const navigate = useNavigate()

  const contextSafari = mapData.find(s => s.id === parseInt(safariId))
  const mapEmbedUrl = contextSafari?.mapEmbedUrl
  const imageUrl = contextSafari?.image2


  const fetchSafariDetails = async () => {
    if (safariId) {
      try {
        const safariResponse = await axios.get(`https://malikale-safaris.onrender.com/safari/api/safari/${safariId}/`)

        if (safariResponse.data && safariResponse.data.id) {
          setSafari(safariResponse.data);
        } else {
          console.error('Invalid safari data:', safariResponse.data);
        }
      } catch (err) {
        setError('Error loading safari details' + (err.response ? err.response.data : err.message))
      } finally {
        setLoading(false)
      }
    } else {
      setError('Safari ID is undefined')
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    if (safari && safari.id) {
      try {
        setLoadingReviews(true)
        const reviewsResponse = await axios.get(`https://malikale-safaris.onrender.com/safari/reviews/safari/${safariId}/`)
        setReviews(reviewsResponse.data)
      } catch (err) {
        console.error('Error fetching reviews', err.response ? err.response.data : err.message)
      } finally {
        setLoadingReviews(false)
      }
    }
  }

  useEffect(() => {
    fetchSafariDetails()
  }, [safariId])

  useEffect(() => {
    if (safari) {
      fetchReviews()
    }
  }, [safari])


  const handleReviewSubmit = useCallback(async (reviewData) => {

    if (!safari || !safari.id) {
      alert('Safari ID is missing. Please make sure you are viewing a valid safari.');
      return;
    }
    const adjustedReviewData = {
      ...reviewData,
      safari: safari.id
    }
    try {
      await axios.post('https://malikale-safaris.onrender.com/safari/reviews/', adjustedReviewData)
      alert('Review submitted successfully')
      const response = await axios.get(`https://malikale-safaris.onrender.com/safari/reviews?safariId=${safari.id}`)
      setReviews(response.data)
    } catch (error) {
      console.error('Error submitting review', error.response?.data || error.message)
      alert('Error submitting review')
    }
  }, [safari])


  const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting, touched, setFieldValue, } = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      country: '',
      contactNumber: '',
      adults: '',
      children: '',
      subject: '',
      message: '',
      bookingDate: null,
    },
    validationSchema: bookingFormSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!safariId) {
        alert('Safari ID is required to make a booking,')
        return
      }

      const bookingData = {
        ...values,
        bookingDate: values.bookingDate
          ? values.bookingDate.toISOString().split('T')[0]
          : null,
        safari: safariId,
      }

      try {
        await axios.post('https://malikale-safaris.onrender.com/safari/api/bookings/', bookingData)
        alert('Booking Successful! Await confirmation.')
        resetForm()
        navigate(`/payment/${safariId}`)
      } catch (error) {
        console.error('Error in booking:', error)
        if (error.response?.status === 401) {
          alert('Authentication failed. Please log in and try again.');
        } else {
          alert('Booking failed. Please try again.');
        }
      } finally {
        setSubmitting(false)
      }
    },
  })


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


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <PropagateLoader color='#029132' size={30} />
      </div>
    )
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!safari) {
    return <p>No safari found.</p>;
  }


  return (
    <>
      <NavBar />
      <div className="safari-detail-container">
        <div className='safari-header'>
          <h1>{safari.title}</h1>
        </div>
        {imageUrl? (
            <img
              src={imageUrl}
              alt={safari?.title || "Safari Image"}
              className="safari-detail-image"
            />
        ) : (
          <p>No image available for this safari.</p>
        )}
        <div className="safari-detail-content">
          <nav className="safari-detail-nav">
            <a href="#overview">Overview</a>
            <a href="#itinerary">Itinerary</a>
            <a href="#map">Map</a>
            <a href="#booking">Booking Form</a>
          </nav>
          <section id="overview" className="safari-section">
            <h2>Overview</h2>
            <p>{safari.overview}</p>
            <h2>Highlights</h2>
            <ul>
              {safari.highlights.map((highlight, index) => (
                <li key={index}><FontAwesomeIcon icon={faCheck} className='icon-detail' /> {highlight}</li>
              ))}
            </ul>
          </section>
          <section id="itinerary" className='safari-section'>
            <h2>Itinerary</h2>
            <Accordion>
              {safari.itinerary.map((day, index) => (
                <Card key={index}>
                  <Accordion.Header style={{ fontFamily: "Shantell Sans, cursive" }}>
                    {`${day.day}`}
                  </Accordion.Header>
                  <Accordion.Body>
                    {day.activity || day.details}
                  </Accordion.Body>
                </Card>
              ))}
            </Accordion>
          </section>
          <div className='safari-map-content'>
            <section id="map" className='safari-section-map'>
              <h2>Map</h2>
              {mapEmbedUrl ? (
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="450px"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              ) : (
                <p>Map not available for this safari</p>
              )}
            </section>
            <div className='safari-detail-content-section'>
              <div className='safari-detail-contents'>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faBus} className='icon-detail' /> Transportation</h6>
                  <p>Mini bus, 4x4 Landcruiser</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faBed} className='icon-detail' /> Accomodation</h6>
                  <p>Mid-range tented camp</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faPlane} className='icon-detail' /> Depature from</h6>
                  <p>Nairobi</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faSoundcloud} className='icon-detail' /> Best season</h6>
                  <p>Feb, Mar, Apr & May</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faPersonHiking} className='icon-detail' /> Tour type</h6>
                  <p>Eco-Tour, Hiking</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faUtensils} className='icon-detail' /> Meals</h6>
                  <p>All meals during the safari</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faLanguage} className='icon-detail' /> Language</h6>
                  <p>English, Spanish, French, Chinese</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faPersonRunning} className='icon-detail' /> Fitness level</h6>
                  <p>Easy to Moderate</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faUsers} className='icon-detail' /> Group</h6>
                  <p>2 - 15</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faChild} className='icon-detail' /> Minimum Age</h6>
                  <p>12</p>
                </div>
                <div className='row-content'>
                  <h6><FontAwesomeIcon icon={faPersonCane} className='icon-detail' /> Maximum Age</h6>
                  <p>65</p>
                </div>
              </div>
            </div>
          </div>

          <div className='booking-reviews-container'>
            <section id="booking" className='safari-section-form'>
              <div className='booking-form-container'>
                <h2>You can send your enquiry via the form below.</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Trip name:</label>
                    <input type="text" className="form-control" value={safari.title} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Your name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Name"
                      name='fullname'
                      id='fullname'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullname}
                      style={errors.fullname && touched.fullname ? { borderColor: "rgb(245, 98, 98)" } : {}}
                    />
                    {errors.fullname && touched.fullname ? <p className="error-message">{errors.fullname}</p> : ''}
                  </div>
                  <div className="form-group">
                    <label>Your email:</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      name='email'
                      id='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      style={errors.email && touched.email ? { borderColor: "rgb(245, 98, 98)" } : {}}
                    />
                    {errors.email && touched.email ? <p className="error-message">{errors.email}</p> : ''}
                  </div>
                  <div className='form-input-content'>
                    <div className="form-groupy">
                      <label>Country:</label>
                      <select
                        name='country'
                        className="form-control"
                        id='country'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        style={errors.country && touched.country ? { borderColor: "rgb(245, 98, 98)" } : {}}
                      >
                        <option value=''>Choose a country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && touched.country ? <p className="error-message">{errors.country}</p> : ''}
                    </div>
                    <div className="form-groupy">
                      <label>Contact number:</label>
                      <PhoneInput
                        type="tel"
                        className="form-control"
                        placeholder="Enter Your Contact Number"
                        name='contactNumber'
                        id='contactNumber'
                        onChange={(value) => setFieldValue("contactNumber", value)}
                        onBlur={handleBlur}
                        value={values.contactNumber}
                        defaultCountry='KE'
                        international
                        style={errors.contactNumber && touched.contactNumber ? { borderColor: "rgb(245, 98, 98)" } : {}}
                      />
                      {errors.contactNumber && touched.contactNumber ? <p className="error-message">{errors.contactNumber}</p> : ''}
                    </div>
                  </div>
                  <div className='form-input-content'>
                    <div className="form-group">
                      <label>No. of Adults:</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Number of Adults"
                        name='adults'
                        id='adults'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.adults}
                        style={errors.adults && touched.adults ? { borderColor: "rgb(245, 98, 98)" } : {}}
                      />
                      {errors.adults && touched.adults ? <p className="error-message">{errors.adults}</p> : ''}
                    </div>
                    <div className="form-group">
                      <label>No. of children:</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Number of Children"
                        name='children'
                        id='children'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.children}
                        style={errors.children && touched.children ? { borderColor: "rgb(245, 98, 98)" } : {}}
                      />
                      {errors.children && touched.children ? <p className="error-message">{errors.children}</p> : ''}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor="">Booking Date</label>
                    <DatePicker
                      selected={values.bookingDate}
                      onChange={(date) => setFieldValue('bookingDate', date)}
                      onBlur={(e) => handleBlur({ target: { name: 'bookingDate' } })}
                      className='form-control'
                      placeholderText='Select a date'
                      minDate={new Date()}
                    />
                    {errors.bookingDate && touched.bookingDate ? <p className="error-message">{errors.bookingDate}</p> : ''}
                  </div>
                  <div className="form-group">
                    <label>Enquiry Subject:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enquiry Subject"
                      name='subject'
                      id='subject'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subject}
                      style={errors.subject && touched.subject ? { borderColor: "rgb(245, 98, 98)" } : {}}
                    />
                    {errors.subject && touched.subject ? <p className="error-message">{errors.subject}</p> : ''}
                  </div>
                  <div className="form-group">
                    <label>Your Message:</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter Your message"
                      name='message'
                      id='message'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message}
                      style={errors.message && touched.message ? { borderColor: "rgb(245, 98, 98)" } : {}}
                    ></textarea>
                    {errors.message && touched.message ? <p className="error-message">{errors.message}</p> : ''}
                  </div>
                  <button disabled={isSubmitting} type="submit" className="submit-btn">
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
            </section>


            <div className='reviews-container'>
              <h2>Reviews</h2>
              {loadingReviews ? (
                <p>Loading reviews...</p>
              ) : error ? (
                <p>{error}</p>
              ) : reviews.length > 0 ? (
                <div className='reviews-list'>
                  {reviews.map(review => (
                    <div key={review.id} className='review-cardy'>
                      <h3 className='review-username'>{review.name || 'Anonymous'}</h3>
                      <p className='review-rating'><strong>Rating:</strong> {review.rating}</p>
                      <p className='review-comment'>{review.comment}</p>
                      <p className='review-date'><small>{new Date(review.created_at).toLocaleDateString()}</small></p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews yet. Be the first to review this safari</p>
              )}

              {/* Review Form */}
              <h3>Leave a Review</h3>
              <form onSubmit={(e) => {
                e.preventDefault()
                console.log('Current safari:', safari);
                console.log('Current safari ID:', safari ? safari.id : 'No ID');
                const reviewData = {
                  safari_id: safari ? safari.id : null,
                  name: e.target.name.value,
                  rating: e.target.rating.value,
                  comment: e.target.comment.value,
                }
                console.log('Review data before submission:', reviewData);
                handleReviewSubmit(reviewData)
              }}>
                <div className='form-group'>
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    name='name'
                    className='form-control'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor="">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    name='rating'
                    className='form-control'
                    value={values.rating}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor="">Comment</label>
                  <textarea
                    name="comment"
                    className='form-control'
                    value={values.comment}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type='submit' className='btn btn-success'>Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SafariDetail;
