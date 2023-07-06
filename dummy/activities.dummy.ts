export type Activity = {
  id: string,
  title: string,
  image: string
}

export type BoardTypes = {
  activities: Array<Activity>,
  template: Array<Activity>
}

const activities_dummy: BoardTypes = {
  activities: [
    {
      id: "21",
      title: "Music Concert",
      image: "https://example.com/image12.jpg"
    }
  ],
  template: [
    {
      id: "1",
      title: "Eating at a Restaurant",
      image: "https://example.com/image1.jpg"
    },
    {
      id: "2",
      title: "Going for a Hike",
      image: "https://example.com/image2.jpg"
    },
    {
      id: "3",
      title: "Watching a Movie",
      image: "https://example.com/image3.jpg"
    },
    {
      id: "4",
      title: "Visiting an Art Gallery",
      image: "https://example.com/image4.jpg"
    },
    {
      id: "5",
      title: "Attending a Music Concert",
      image: "https://example.com/image5.jpg"
    },
    {
      id: "6",
      title: "Taking a Cooking Class",
      image: "https://example.com/image6.jpg"
    },
    {
      id: "7",
      title: "Exploring a Local Market",
      image: "https://example.com/image7.jpg"
    },
    {
      id: "8",
      title: "Playing Sports",
      image: "https://example.com/image8.jpg"
    },
    {
      id: "9",
      title: "Going on a Road Trip",
      image: "https://example.com/image9.jpg"
    },
    {
      id: "10",
      title: "Learning a New Language",
      image: "https://example.com/image10.jpg"
    },
    {
      id: "11",
      title: "Attending a Dance Workshop",
      image: "https://example.com/image11.jpg"
    },
    {
      id: "12",
      title: "Volunteering for a Cause",
      image: "https://example.com/image12.jpg"
    },
    {
      id: "13",
      title: "Camping in the Wilderness",
      image: "https://example.com/image13.jpg"
    },
    {
      id: "14",
      title: "Exploring a Historical Site",
      image: "https://example.com/image14.jpg"
    },
    {
      id: "15",
      title: "Relaxing at a Spa",
      image: "https://example.com/image15.jpg"
    },
    {
      id: "16",
      title: "Attending a Yoga Retreat",
      image: "https://example.com/image16.jpg"
    },
    {
      id: "17",
      title: "Going for a Bike Ride",
      image: "https://example.com/image17.jpg"
    },
    {
      id: "18",
      title: "Visiting a Science Museum",
      image: "https://example.com/image18.jpg"
    },
    {
      id: "19",
      title: "Attending a Stand-up Comedy Show",
      image: "https://example.com/image19.jpg"
    },
    {
      id: "20",
      title: "Exploring a Botanical Garden",
      image: "https://example.com/image20.jpg"
    }
  ]
}
export default activities_dummy