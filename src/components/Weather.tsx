import React, { useCallback, useEffect, useState } from 'react'

const weatherRes = {
  location: {
    name: 'Hoskote',
    region: 'Karnataka',
    country: 'India',
    lat: 12.96,
    lon: 77.72,
    tz_id: 'Asia/Kolkata',
    localtime_epoch: 1713104158,
    localtime: '2024-04-14 19:45',
  },
  current: {
    last_updated_epoch: 1713104100,
    last_updated: '2024-04-14 19:45',
    temp_c: 31,
    temp_f: 87.8,
    is_day: 0,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
      code: 1003,
    },
    wind_mph: 12.5,
    wind_kph: 20.2,
    wind_degree: 90,
    wind_dir: 'E',
    pressure_mb: 1015,
    pressure_in: 29.97,
    precip_mm: 0,
    precip_in: 0,
    humidity: 41,
    cloud: 25,
    feelslike_c: 29.8,
    feelslike_f: 85.6,
    vis_km: 6,
    vis_miles: 3,
    uv: 1,
    gust_mph: 20.4,
    gust_kph: 32.8,
  },
}

function useGetWeather() {
  const [location, setLocation] = useState<
    { latitude: string; longitude: string } | undefined
  >()
  const [weather, setWeather] = useState(undefined)

  const handleLocationClick = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log('Geolocation not supported')
    }
  }, [])

  function success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setLocation({ latitude, longitude })
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)

    // Make API call to OpenWeatherMap
    fetch(
      `https://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&key=ab93fd7bf3f447e7bb3134613241404`,
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data)
        console.log(data)
      })
      .catch((error) => console.log(error))
  }

  function error() {
    console.log('Unable to retrieve your location')
  }

  useEffect(() => {
    handleLocationClick()
  }, [])

  return weather
}

export default useGetWeather
