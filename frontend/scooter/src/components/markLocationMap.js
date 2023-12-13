import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import L, { map } from "leaflet";

import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToString } from "react-dom/server";
import { FaCircleDot } from "react-icons/fa6";
import { BsScooter } from "react-icons/bs";

import bikeModel from "../models/bikeModel";
import cityModel from "../models/cityModel";
import MoveToUser from "./MoveToUser";
import BikeMarker from "./bikeMarker";

import "leaflet/dist/leaflet.css";

const bikeLocation = {};
let city = "";

const createIcon = L.divIcon({
    html: renderToString(
        <BsScooter style={{ fontSize: "40px", color: "purple" }} />
    ),
    className: "my-custom-icon",
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const createBike = async () => {
    let id = await cityModel.getCity(city)
    if (id) {
        const bike = {
            lon: bikeLocation.lng,
            lat: bikeLocation.lat,
            battery: 100,
            status: "available",
            city_cityid: id.cityId
        }

        const response = await bikeModel.createBike(bike);
        console.log(response);
        document.getElementById("map")
    }
}


export default function MarkLocationMap() {

    function ClickHandler() {
        const map = useMap();
        let marker = null;


        useEffect(() => {
            const handleClick = async (e) => {
                const { lat, lng } = e.latlng;
                if (marker) {
                    marker.remove();
                }
                marker = L.marker([lat, lng], { icon: createIcon }).addTo(map);
                bikeLocation.lat = lat;
                bikeLocation.lng = lng;
                city = await bikeModel.getBikeCity(lat, lng);

            };

            map.on('click', handleClick);

            return () => {
                map.off('click', handleClick);
            };
        }, []);

        return null;
    }
    const [currentLocation, setCurrentLocation] = useState({
        lat: 59,
        lng: 16,
    });

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setCurrentLocation(newPos);
            },
            () => {
                console.log("Unable to retrieve your location");
            }
        );
    }, []);

    return (
        <div className="flex flex-col items-center gap-5">
            <div className="w-full">
                <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <BikeMarker />
                    <ClickHandler />
                    <MoveToUser />
                </MapContainer>
            </div>
            <button className="w-11/12 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-lg p-3 shadow-lg hover:shadow-xl transition duration-300 ease-in-out" onClick={() => createBike()}>Add bike</button>
        </div>
    );
}