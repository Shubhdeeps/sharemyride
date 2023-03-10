
export const language = (select: "eng" | "est") => {
    // get local storage saving
    console.log(Object.keys(languages[select]))
}

const languages = {
    eng: {
        Hello: "Hello",
        "Ready to travel": "Ready to travel",
        Dashboard: "Dashboard",
        "Favourites": "Favourites",
        "Explore routes": "Explore routes",
        Search: "Search",
        "Add to favourite": "Add to favourite",
        "Favourite": "Favourite",
        "See Rides": "See Rides",
        "Favourite routes": "Favourite routes",
        "My Schedule": "My Schedule",
        "Market Place": "Market Place",
        "Feedback/Report": "Feedback/Report",
        "Log out": "Log out",
        "NOTIFICATION": "NOTIFICATION",
        "requested to join the ride.": "requested to join the ride.",
        "accepted your request to join the ride.": "accepted your request to join the ride.",
        "rejected your request to join the ride.": "rejected your request to join the ride.",
        "Cars": "Cars",
        "Passenger": "Passenger",
        "Filters": "Filters",
        "Show Rides after": "Show Rides after",
        "ALL": "ALL",
        "MINE": "MINE",
        "secs ago": "secs ago",
        "mins ago": "mins ago",
        "hrs ago": "hrs ago",
        "days ago": "days ago",
        "months ago": "months ago",
        "Seats": "Seats",
        "Request for seat": "Request for seat",
        "Request ride": "Request ride",
        "ADDITIONAL INFORMATION": "ADDITIONAL INFORMATION",
        "CONTACT DETAILS": "CONTACT DETAILS",
        "Cancel": "Cancel",
        "Request": "Request",
        "Load more": "Load more",
        "Request sent successfully.": "Request sent successfully.",
        "Close": "Close",
        "Passengers count": "Passengers count",
        "Ask to join": "Ask to join",
        "Travelling with pets": "Travelling with pets",
        "Show Passengers after": "Show Passengers after",
        "New Ride": "New Ride",
        "TIME": "TIME",
        "Depart time": "Depart time",
        "Arriving time": "Arriving time",
        "EXPENSES": "EXPENSES",
        "Cost": "Cost",
        "ROUTE": "ROUTE",
        "Departing point": "Departing point",
        "Arriving point": "Arriving point",
        "DESCRIBE THE ROUTE": "DESCRIBE THE ROUTE",
        "Stoppage": "Stoppage",
        "CAR DETAILS": "CAR DETAILS",
        "Seats offering": "Seats offering",
        "PRIVACY SETTINGS": "PRIVACY SETTINGS",
        "Are pets allowed in your car": "Are pets allowed in your car",
        "Are you accepting parcels": "Are you accepting parcels",
        "I am travelling with electric car": "I am travelling with electric car",
        "Show contact details": "Show contact details",
        Post: "Post",
        "New Passenger Ticket": "New Passenger Ticket",
        "Number of Passengers": "Number of Passengers",
        Details: "Details",
        "Are you travelling with pets?": "Are you travelling with pets?",
        "Show contact details?": "Show contact details?",
        Visit: "Visit",
        Requests: "Requests",
        cost: "cost",
        "Electric Car": "Electric Car",
        "Accepting Parcels": "Accepting Parcels",
        "Pets allowed": "Pets allowed",
        "Seats left": "Seats left",
    },
    est: {
        Hello: "Tere",
        "Ready to travel": "",
        Dashboard: "",
        "Favourites": "",
        "Explore routes": "",
        Search: "",
        "Add to favourite": "",
        "Favourite": "",
        "See Rides": "",
        "Favourite routes": "",
        "My Schedule": "",
        "Market Place": "",
        "Feedback/Report": "",
        "Log out": "",
        "NOTIFICATION": "",
        "requested to join the ride.": "",
        "accepted your request to join the ride.": "",
        "rejected your request to join the ride.": "",
        "Cars": "",
        "Passenger": "",
        "Filters": "",
        "Show Rides after": "",
        "ALL": "",
        "MINE": "",
        "secs ago": "",
        "mins ago": "",
        "hrs ago": "",
        "days ago": "",
        "months ago": "",
        "Seats": "",
        "Request for seat": "",
        "Request ride": "",
        "ADDITIONAL INFORMATION": "",
        "CONTACT DETAILS": "",
        "Cancel": "",
        "Request": "",
        "Load more": "",
        "Request sent successfully.": "",
        "Close": "",
        "Passengers count": "",
        "Ask to join": "",
        "Travelling with pets": "",
        "Show Passengers after": "",
        "New Ride": "",
        "TIME": "",
        "Depart time": "",
        "Arriving time": "",
        "EXPENSES": "",
        "Cost": "",
        "ROUTE": "",
        "Departing point": "",
        "Arriving point": "Arriving point",
        "DESCRIBE THE ROUTE": "",
        "Stoppage": "",
        "CAR DETAILS": "",
        "Seats offering": "",
        "PRIVACY SETTINGS": "",
        "Are pets allowed in your car": "",
        "Are you accepting parcels": "Are you accepting parcels",
        "I am travelling with electric car": "",
        "Show contact details": "",
        Post: "",
        "New Passenger Ticket": "",
        "Number of Passengers": "",
        Details: "Details",
        "Are you travelling with pets?": "",
        "Show contact details?": "",
        Visit: "",
        Requests: "",
        cost: "",
        "Electric Car": "",
        "Accepting Parcels": "",
        "Pets allowed": "",
        "Seats left": "",
    }
}