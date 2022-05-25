import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

var stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  var par = doc.querySelectorAll("p");
  console.log(par);
  //   par.forEach((p) => document.getElementById("eventinfo").appendChild(p));
};

const EventShow = () => {
  const [id, setId] = useState(useParams().id);
  const [event, setEvent] = useState([]);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     axios
  //       .get(`http://api.hel.fi/linkedevents/v1/event/${id}`)
  //       .then(function (response) {
  //         const data = response.data;
  //         console.log(data);
  //         setEvent(data);
  //         setLoading(false);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }, []);

  useEffect(() => {
    axios
      .get(`http://api.hel.fi/linkedevents/v1/event/${id}`)
      .then(function (response) {
        const data = response.data;
        console.log(data);
        setEvent(data);
        const locationURL = data.location["@id"];
        axios.get(locationURL).then(function (response) {
          console.log(response.data);
          setLocation(response.data);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" container px-3 mt-5">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <img
          className="img-fluid"
          src={
            event?.images[0]?.url ??
            "https://images.unsplash.com/photo-1472653431158-6364773b2a56?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469"
          }
          alt={event?.images[0]?.alt_text ?? "image name"}
        />
        <div>
          <h2>{event?.name.fi || event?.name?.sv}</h2>
          <p>Organized By: {event?.provider?.fi || event?.provider.en}</p>
          {/* date and time, location  */}
          <div>
            <h3>Date and time</h3>
            <p>Start time: {event.start_time}</p>
            <p>End time:{event.end_time}</p>
            <h3>Location</h3>
            <p>{location?.street_address?.en}</p>{" "}
            <p>
              {" "}
              <span>{location.postal_code}</span>
              <span> {location?.address_locality?.en}</span>
            </p>
            <p>Phone: {location?.telephone?.fi}</p>
          </div>
          <p>
            {event?.offers[0]?.is_free
              ? "free"
              : event?.offers[0]?.price?.en
              ? event?.offers[0]?.price?.en
              : ""}
          </p>
        </div>
      </div>
      <hr />
      <div>
        <div>
          <h3>About this event</h3>
          <div>{stringToHTML(event.description?.fi)}</div>
          <div id="eventinfo"></div>
          <p>
            {event.description.en ||
              event.description.fi ||
              event.description.sv}
          </p>
        </div>
      </div>

      <p>
        More info here:
        <a href="{event?.info_url?.en || event?.info_url.fi}">
          {event?.info_url?.en || event?.info_url.fi}
        </a>
      </p>
      <h3>Tags</h3>
      <h3>Share with friends</h3>
    </div>
  );
};

export default EventShow;
