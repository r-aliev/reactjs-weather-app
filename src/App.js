import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./App.css";

import { Row, Form, Button } from "react-bootstrap";

import WeatherWidget from "./components/WeatherWidget";
import { OWM_API_KEY, OWM_API_BASE_URL } from "./api/api_config";

const App = () => {
	const history = useHistory();
	const [city, setCity] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [forecast, setForecast] = useState([]);
	const [error, setError] = useState("");

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSubmit = () => {
		setError("");
		fetchWeatherAsync(inputValue);
	};

	const fetchWeatherAsync = async (inputValue) => {
		setLoaded(true);
		try {
			const response = await axios.get(`${OWM_API_BASE_URL}/data/2.5/forecast?q=${inputValue}&appid=${OWM_API_KEY}&units=metric`);
			const transformData = await response.data.list.map((data) => ({
				dt: data.dt,
				temp: data.main.temp,
				temp_min: data.main.temp_min,
				temp_max: data.main.temp_max,
				humidity: data.main.humidity,
				pressure: data.main.pressure,
				icon: data.weather[0].icon,
				desc: data.weather[0].description,
				clouds: data.clouds.all,
				wind: data.wind,
				rain: data.rain ? data.rain["3h"] : 0,
			}));
			// console.log(response);
			setCity(inputValue);
			setForecast(transformData);
		} catch (err) {
			setError(err.stack);
			console.log(err);
		}
		setLoaded(false);
	};

	return (
		<div className="App">
			<Row className="header">Weather Forecast</Row>
			<Row className="search-form d-flex flex-nowrap">			
				<Form.Control
					className="mr-2"
					type="text"
					value={inputValue}
					autoFocus
					placeholder="Enter a city ..."
					onChange={handleInputChange}
				/>
				<Button variant="primary" onClick={handleSubmit}>
					Search
				</Button>
			</Row>
			{error ? (
				<Row className="error">Unable to fetch weather data!</Row>
			) : loaded ? (
				<LinearProgress />
			) : (
				<WeatherWidget
					config={{
						location: city,
						unit: "metric",
						locale: "zh-tw",
					}}
					forecast={forecast}
				/>
			)}
		</div>
	);
};

export default App;
