import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, token, backendUrl, getDoctorsData } = useContext(AppContext)
  const daysOfweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate()

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      const slotDate = day + "_" + month + "_" + year
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo && (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        <div className="sm:w-72">
          <img src={docInfo.image} className="w-full bg-primary rounded-2xl shadow-md object-cover" alt={docInfo.name} />
        </div>

        <div className="flex-1 border border-gray-300 rounded-2xl p-6 bg-white shadow-md">
          <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-2 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-1 px-3 border border-primary text-primary text-xs rounded-full bg-primary/10">{docInfo.experience}</button>
          </div>

          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
              About <img src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-500 mt-2">{docInfo.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-5">
            Appointment fee: <span className="text-gray-700">{currencySymbol} {docInfo.fees}</span>
          </p>

          {/* Booking Slots - moved inside doctor info */}
          <div className="mt-10 border-t pt-6">
            <p className="text-lg font-semibold text-gray-700 mb-4">Book a Slot</p>

            {/* Day Selectors */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {docSlots.length > 0 && docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`min-w-16 text-center py-4 px-3 rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md
                    ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-300 bg-white text-gray-600'}`}
                >
                  <p className="text-sm">{item[0] && daysOfweek[item[0].datetime.getDay()]}</p>
                  <p className="text-lg font-semibold">{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-6">
              {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                <div
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-center text-sm font-medium py-2 rounded-full cursor-pointer transition-all duration-200
                    ${item.time === slotTime
                      ? 'bg-primary text-white'
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                >
                  {item.time.toLowerCase()}
                </div>
              ))}
            </div>

            <button
              onClick={bookAppointment}
              className="block mt-8 bg-primary text-white text-sm font-semibold px-10 py-3 rounded-full hover:shadow-lg transition-all duration-200"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment


// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import { assets } from '../assets/assets'

// const Appointment = () => {
//   const { docId } = useParams()
//   const { doctors, currencySymbol } = useContext(AppContext)
//   const daysOfweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
//   const [docInfo, setDocInfo] = useState(null)
//   const [docSlots, setDocSlots] = useState([])
//   const [slotIndex, setSlotIndex] = useState(0)
//   const [slotTime, setSlotTime] = useState('')

//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find(doc => doc._id === docId)
//     setDocInfo(docInfo)
//   }

//   const getAvailableSlots = async () => {
//     setDocSlots([])

//     // getting current date
//     let today = new Date()
//     for (let i = 0; i < 7; i++) {

//       // getting date with index
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)

//       // setting end time of the date with index
//       let endTime = new Date()
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21, 0, 0, 0)

//       // setting hours
//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       } else {
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }
//       let timeSlots = []
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//         // add slot to array
//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime
//         })

//         // Increment current time by 30 minutes
//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }
//       setDocSlots(prev => ([...prev, timeSlots]))
//     }
//   }

//   useEffect(() => {
//     fetchDocInfo()
//   }, [doctors, docId])

//   useEffect(() => {
//     getAvailableSlots()
//   }, [docInfo])

//   useEffect(() => {
//     console.log(docSlots);
//   }, [docSlots])

//   return docInfo && (
//     <div>
//       {/* Doctors Details */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div>
//           <img src={docInfo.image} className='bg-primary w-full sm:max-w-72 rounded-lg' alt='' />
//         </div>

//         {/* Doc Info : name,degree,experince */}
//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
//             {docInfo.name}
//             <img className='w-5' src={assets.verified_icon} alt='' />
//           </p>
//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree}-{docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//           </div>

//           {/* Doctor About */}
//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt='' /></p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee : <span className='text-gray-600'>{currencySymbol} {docInfo.fees}</span>
//           </p>
//         </div>
//       </div>
//       <div className='sm:m1-72 sm:p1-4 mt-4 font-medium text-gray-700'>
//         <p>Booking slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {
//             docSlots.length && docSlots.map((item, index) => (
//               <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index} >
//                 <p>{item[0] && daysOfweek[item[0].datetime.getDay()]}</p>
//                 <p>{item[0] && item[0].datetime.getDate()}</p>
//               </div>
//             ))
//           }
//         </div>
//         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//           {docSlots.length && docSlots[slotIndex].map((item, index) => (
//             <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
//               {item.time.toLowerCase()}
//             </p>
//           ))}
//         </div>
//         <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
//       </div>
//     </div >
//   )
// }

// export default Appointment