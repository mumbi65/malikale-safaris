import React, { createContext, useContext, useState } from 'react';
import antelope from "../assets/antelope.jpg";
import cheetah from "../assets/cheetah.jpg";
import giraffe from "../assets/giraffe.jpg";
import lion from "../assets/lion.jpg";
import zebra from "../assets/zebra.jpg";
import giraffe2 from "../assets/giraffe2.jpg";
import samburu from "../assets/samburu2.jpg"
import samburu2 from "../assets/samburu.jpg"
import amboseli from "../assets/amboseli.jpg"
import kilimanjaro from "../assets/kilimanjaro.jpg"
import masaimara from "../assets/masai-mara.jpg"
import mombasa from "../assets/mombasa1.jpg"
import mombasa1 from "../assets/mombasa2.jpg"
import nakuru from "../assets/nakuru.jpg"


const SafariContext = createContext();

export const useSafari = () => useContext(SafariContext);

export const SafariProvider = ({ children }) => {
  const [mapData] = useState([
    {
        id: 101,
        title: "7-Day Nothern & Southern Kenya Savanna private safari",
        duration: "7 Days",
        price: "$1000",
        image: samburu,
        image2: samburu2,
        description: "Travel is the movement of people between relatively distant geographical...",
        people: "1-10 People",
        location: "Samburu",
        overview: 'Embark on a comprehensive exploration of Kenya\'s savanna landscapes with our 7-day private safari. Traverse from the rugged terrain of Samburu National Reserve, known for its unique wildlife, to the lush expanses of Maasai Mara. Experience diverse ecosystems, from the arid Samburu to the verdant Lake Nakuru and Naivasha, culminating in the renowned Maasai Mara. This journey offers a blend of exhilarating game drives, serene lake vistas, and the chance to witness the majestic African wildlife up close.',
        highlights:[
          "Samburu National Reserve",
          "variety of wildlife such as the famous Grevy zebra, lions, leopards, and elephants."
        ],
        itinerary: [
          { day: 'Day 1: Nairobi to Samburu National Reserve', activity: 'Depart from Nairobi at 7:30 AM. Drive to Samburu (approx. 6 hours). Lunch, check-in, and relax. Afternoon game drive until sunset. Dinner and overnight at the lodge.' },
          { day: 'Day 2: Samburu National Reserve', activity: 'Early breakfast followed by morning game drive. Return for lunch and relaxation. Afternoon game drive until sunset. Dinner and overnight at the lodge.' },
          { day: 'Day 3: Samburu to Lake Nakuru National Park', activity: 'Early breakfast and checkout. Drive to Lake Nakuru. Lunch, check-in, and afternoon game drive. Dinner and overnight at the lodge.' },
          { day: 'Day 4: Lake Nakuru to Lake Naivasha', activity: 'Early breakfast and drive to Lake Naivasha. Visit Hell\'s Gate National Park for hiking. Check-in, lunch, and afternoon boat ride on Lake Naivasha. Dinner and overnight at the hotel.' },
          { day: 'Day 5: Lake Naivasha to Maasai Mara National Reserve', activity: 'Early breakfast and drive to Maasai Mara (approx. 6 hours). Lunch, check-in, and afternoon game drive. Dinner and overnight at the camp.' },
          { day: 'Day 6: Maasai Mara National Reserve', activity: 'Full-day game drive with packed lunch. Search for the Big Five and other wildlife. Return for dinner and overnight at the camp.' },
          { day: 'Day 7: Maasai Mara to Nairobi', activity: 'Early morning game drive. Return for breakfast and check-out. Drive back to Nairobi (approx. 5-6 hours). End of tour.' }
        ],
        mapEmbedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.365552382782!2d37.5190515273278!3d0.611098525425451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17888d933c6f7369%3A0xa2e2dc34ae133bde!2sSamburu%20National%20Reserve!5e0!3m2!1sen!2ske!4v1721503570619!5m2!1sen!2ske"
      },
      {
        id: 102,
        title: "4-Day Mombasa or Diani – Tsavo East – Amboseli – Nairobi",
        duration: "4 Days",
        price: "$1500",
        image: mombasa,
        image2: mombasa1,
        description: "Witness the fastest land animal in action.",
        people: "1-6 People",
        location: "Mombasa",
        overview:'This 4-day safari offers a dynamic experience of Kenya’s diverse landscapes. Start in Tsavo East with its vast savannas and wildlife, then move to Amboseli for stunning views of Mount Kilimanjaro. Witness the unique flora and fauna of Amboseli and Tsavo while enjoying guided game drives and comfortable accommodations. Perfect for those seeking a compact yet immersive safari experience.',
        highlights:[
          'Tsavo East: Explore one of Kenya’s largest parks with its diverse wildlife.',
          'Amboseli: Known for its incredible elephant herds and panoramic views of Mount Kilimanjaro.'
        ],
        itinerary:[
        { day: 'Day 1: Mombasa/Diani to Tsavo East National Park', activity: 'Pick up from your hotel or airport and drive to Tsavo East. Game drive, check-in, lunch, and afternoon game drive. Dinner and overnight at the lodge.' },
        { day: 'Day 2: Tsavo East to Amboseli National Park', activity: 'Breakfast and checkout. Drive to Amboseli with an en-route game drive. Lunch, relaxation, and afternoon game drive. Dinner and overnight at the camp.' },
        { day: 'Day 3: Amboseli National Park', activity: 'Full day of game drives with packed lunch. Explore Amboseli and, if clear, view Mount Kilimanjaro. Dinner and overnight at the camp.' },
        { day: 'Day 4: Amboseli to Nairobi', activity: 'Morning game drive, breakfast, and checkout. Drive to Nairobi. Optional lunch en route. Drop-off in Nairobi.' }
        ],
        mapEmbedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31875.835545358816!2d37.89051493625558!3d-2.9643840999978415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183980bcec682bb7%3A0xfc507de3c2bb2aff!2sTsavo%20National%20Park!5e0!3m2!1sen!2ske!4v1721506051229!5m2!1sen!2ske"
      },
      {
        id: 103,
        title: "4 Days Masai Mara Flying Safari",
        duration: "4 Days",
        price: "$1200",
        image: giraffe,
        image2: masaimara,
        description: "Get up close and personal with the tallest animals on earth.",
        people: "3-10 People",
        location: "Masai Mara",
        overview:'Experience the Masai Mara from above with this 4-day flying safari. Start with a scenic flight from Nairobi to Masai Mara, where you’ll enjoy daily game drives exploring this iconic reserve. Perfect for those who want to maximize their safari time without the long road transfers.',
        highlights:[
          'Air views of Masai Mara.',
          'Up-close encounters with the wildlife of the Masai Mara.'
        ],
        itinerary: [
          { day: 'Day 1: Nairobi to Masai Mara', activity: 'Transfer to Wilson Airport for a flight to Masai Mara. Arrive, transfer to the lodge, lunch, and afternoon game drive. Overnight at Keekorok Lodge.' },
          { day: 'Day 2: Masai Mara', activity: 'Two game drives – morning and afternoon. Enjoy extensive wildlife sightings and optional Maasai village visit. Overnight at Keekorok Lodge.' },
          { day: 'Day 3: Masai Mara', activity: 'Full day of game drives with an early morning start. Explore different parts of the reserve and enjoy lodge facilities. Overnight at Keekorok Lodge.' },
          { day: 'Day 4: Masai Mara to Nairobi', activity: 'Breakfast, transfer to the airstrip, and flight back to Nairobi. Optional exploration of Nairobi’s attractions. Drop-off at the airport or hotel.' }
        ],
        mapEmbedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.740869178582!2d35.00676243374945!3d-1.2489575186174333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182ced340e0926ff%3A0xf11b680298c8c545!2sMasai%20Mara%20National%20Reserve%2C%20Kenya!5e0!3m2!1sen!2ske!4v1721546025083!5m2!1sen!2ske"
      },
      {
        id: 104,
        title: "5 Days Tsavo West, Amboseli, Tsavo East National park game safari",
        duration: "5 Days",
        price: "$2000",
        image: lion,
        image2: amboseli,
        description: "Experience the king of the jungle in its domain.",
        people: "1-10 People",
        location: "Amboseli",
        overview:'Explore the diverse landscapes of Tsavo with this 5-day safari covering Tsavo West, Amboseli, and Tsavo East. Experience game drives across varied terrains, from the volcanic landscapes of Tsavo West to the scenic plains of Amboseli and the expansive savannas of Tsavo East.',
        highlights: [
          'Scenic views of Mount Kilimanjaro from Amboseli.',
          'The diverse wildlife and landscapes of Tsavo East and West.'
        ],
        itinerary: [
          { day: 'Day 1: Mombasa to Tsavo West', activity: 'Pickup from your resort, drive to Tsavo West with game viewing and a visit to the Rhino Sanctuary. Overnight at Tsavo West lodge.' },
          { day: 'Day 2: Tsavo West to Amboseli', activity: 'Morning game drive, visit Mzima Springs, and drive to Amboseli. Afternoon game drive and overnight at Amboseli lodge.' },
          { day: 'Day 3: Amboseli National Park', activity: 'Full day of game drives with views of Mount Kilimanjaro. Optional visit to Maasai villages. Overnight at Amboseli lodge.' },
          { day: 'Day 4: Amboseli to Tsavo East', activity: 'Drive to Tsavo East. Afternoon game drive and overnight at Tsavo East lodge.' },
          { day: 'Day 5: Tsavo East to Mombasa', activity: 'Morning game drive, breakfast, and drive back to Mombasa with lunch en route.' }
        ],
        mapEmbedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.543034634989!2d37.25804577312224!3d-2.652665138642296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18309e7455555555%3A0x8405eed269adf949!2sAmboseli%20National%20Park!5e0!3m2!1sen!2ske!4v1721546131113!5m2!1sen!2ske"
      },
      {
        id: 105,
        title: "7 Days, Mt Kilimanjaro – Rongai Route",
        duration: "7 Days",
        price: "$900",
        image: zebra,
        image2: kilimanjaro,
        description: "Discover the striking patterns of zebras in the wild.",
        people: "1-10 People",
        location: "Tanzania",
        overview: 'The Kilimanjaro Rongai Route approaches the mountain from the north not far from the Kenyan border. The area retains a sense of untouched wilderness lost on the crowded Marangu and Machame trails. This route is the easiest of all the routes, it has a relatively gentle gradient and short daily stages as it winds its way from the starting point just south of the Kenya-Tanzania border through attractive farmland and delightful forest to several other climate zones, adding considerably to the interest of the trek. There are magnificent views over the Amboseli Plains and genuine possibilities for wildlife viewing. An extra day is added to the standard 5-day itinerary to hike to the beautiful Mawenzi Tarn beneath the towering spires of Mawenzi; this also ensures maximum acclimatization for the climb to the summit. The final ascent is arduous and made in darkness starting around midnight but the reward is a spectacular dawn view of the glaciers and ice cliffs of the summit, and across the East African plains far below. Descending through lush forest, there is a final day to relax and recover before the flight home. Kilimanjaro Rongai Route is much drier than the other routes and you might even encounter an elephant on the way. Accommodation in tents.',
        highlights: [
          "beautiful Mawenzi Tarn beneath the towering spires of Mawenzi",
          "Descending through lush forest, there is a final day to relax and recover before the flight home"
        ],
        itinerary: [
          { day: 'Day 1: Arrival', activity: 'You will be met at the International Airport by your Driver/Guide and our representative. We will take you to the Mount Meru Game Lodge (or any other suitable hotel depending on your arrival time). Our Kilimanjaro Expert will come to meet you and provide you with a briefing on your climb. Dinner and Overnight at Mount Meru Game Lodge.' },
        { day: 'Day 2: Kilimanjaro Rongai Route', activity: 'Hike up through the Rongai Forest – Approx. 2625 m. Pick up from your hotel in Arusha or Moshi and drive to the town of Nalemoru on the lower slopes of Kilimanjaro and the trailhead five miles outside of town. Start the climb passing through pine forest and a short stretch of mountainous rainforest until reaching the heather and moorlands. About a 4-5 hour walk to Sekimba camp at approx 2625m. The rest of the day will be used to relax and recheck your equipment. Overnight at Sekimba campsite. All meals included.' },
        { day: 'Day 3: First Camp to Kikelewa Moorland (3630 m)', activity: 'Continue through the forest, eventually encountering the moorlands just below a large lava overhang known as Second Cave. Lunch here, then traverse the open moorlands toward the spectacular peak of Mawenzi. Our second camp is at Kikelewa, shortly before reaching the saddle that connects Mawenzi to Kibo and Uhuru peaks. (5-6 hours hiking.) Overnight at a campsite. All meals included.' },
        { day: 'Day 4: Mawenzi Tarn Hut', activity: 'Rising early, climb steadily to craggy, jagged peaks of Mawenzi. Camp beneath Mawenzi at approx 4,300m. Some climbers take an alternative route away from Mawenzi and camp on the north side of the saddle (Mawenzi Tarn Hut is in the north). Overnight at a campsite. All meals included.' },
        { day: 'Day 5: Outward School Hut', activity: 'Trek to the Outward Bound Hut (School Hut or preferably Kibo Hut) at 4,715m between the peaks of Kibo and Mawenzi. Mountain vistas are fabulous as we emerge onto the saddle between glacier-covered Kibo and rock-crowned Mawenzi. We’ll arrive by lunchtime and have the afternoon to organize and rest up for the summit attempt. We’ll turn in early. Overnight at a campsite. All meals included.' },
        { day: 'Day 6: Kibo Camp to Gilman’s Point to Uhuru Peak – Horombo Hut', activity: 'This is the hardest day of the climb and an early start before midnight. You will pass (rest and have coffee at) Hans Meyers cave after about 3 hours climbing. At dawn, you should reach Gilman’s Point and usually see a spectacular sunrise. From here, if you have enough energy, a further 1.5-hour walk will take you to Uhuru Peak. Descend to Kibo and then on to Horombo at 3700m. Dinner and good sleep. Overnight at a campsite or Horombo Hut. All meals included.' },
        { day: 'Day 7: Horombo to Park Gate', activity: 'Descend across the moorland and into the forest to Mandara hut, where a meal is served. Walk about 3-4 hours to Marangu Gate. After bidding our farewells to our guide and porters, we’ll take you to Arusha or Moshi for extension. End or Extension.' }
        ],
        mapEmbedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8121256.557451141!2d29.68294099062805!3d-6.334757590690399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184b51314869a111%3A0x885a17314bc1c430!2sTanzania!5e0!3m2!1sen!2ske!4v1721546854075!5m2!1sen!2ske"
      },
      {
        id: 106,
        title: "4 Days Lake Nakuru & Naivasha",
        duration: "4 Days",
        price: "$1200",
        image: giraffe2,
        image2: nakuru,
        description: "Another beautiful giraffe safari experience.",
        people: "1-10 People",
        location: "Lake Nakuru",
        overview: [
          "Pick up from Nairobi hotel / Nairobi Airport Depart for the lake Nakuru national park. An easy scenic sightseeing drive via the great rift valley escarpment with views of awesome scenery There shall be stops to marvel at the dramatic fall of the great rift valley escarpment.",
          "We shall stop at the Freshwater Lake Naivasha for an exciting boat ride to view hippos, exotic birds and small game."
        ],
        highlights: [
          "Views of the Great Rift Valley escarpment",
          "A short game and bird-watching drive at Lake Nakuru National Park",
          "Home to black and white rhinos"
        ],
        itinerary: [
          {
            day: "Day 1: Nairobi – Lake Nakuru National Park (160 KM, approx. 3 hrs)",
            details: [
              "07:00 hrs: Pick up from Nairobi hotel or Nairobi Airport. Depart for Lake Nakuru National Park with a scenic drive via the Great Rift Valley escarpment. Enjoy stops to marvel at the dramatic landscapes.",
              "Visit Freshwater Lake Naivasha for a boat ride to see hippos, exotic birds, and small game. Continue to Lake Nakuru, arriving in the late morning.",
              "Explore the park, known for its black and white rhinos, lions, warthogs, giraffes, zebras, and bird species including Pelicans and sometimes a sizable Flamingo population.",
              "Afternoon bird and game-watching drives around the lake. Overnight at a Lake Nakuru safari lodge or tented camp."
            ]
          },
          {
            day: "Day 2: Lake Nakuru – Masai Mara Game Reserve (300 KM, approx. 5-6 hrs)",
            details: [
              "Short game and bird-watching drive at Lake Nakuru National Park.",
              "Proceed to Masai Mara Game Reserve with scenic stops along the route. Enjoy an afternoon game drive in the Masai Mara."
            ]
          },
          {
            day: "Day 3: Full Day – Masai Mara",
            details: [
              "A full day of game viewing in Masai Mara, known for its rich wildlife and scenic savannah plains. Experience the Big Five and other wildlife.",
              "Picnic lunch by the Mara River while observing hippos, crocodiles, or possibly the Great Migration (July – October). Overnight at a Masai Mara safari lodge or tented camp."
            ]
          },
          {
            day: "Day 4: Masai Mara Game Reserve – Nairobi (265 KM, approx. 6 hrs)",
            details: [
              "Early morning game drive in Masai Mara.",
              "Depart Masai Mara mid-morning and drive to Nairobi. Lunch stop along the way.",
              "Arrive in Nairobi in the late afternoon (around 16:30). Drop off at your Nairobi hotel, residence, or Nairobi Airport."
            ]
          }
        ],
        mapEmbedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127671.67951359131!2d36.00536487114806!3d-0.3590386571830176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18298fe3b0de60ef%3A0xbb9b734c1a471f80!2sLake%20Nakuru!5e0!3m2!1sen!2ske!4v1721548249721!5m2!1sen!2ske"
      }
  ]);

  return (
    <SafariContext.Provider value={{ mapData }}>
      {children}
    </SafariContext.Provider>
  );
};
