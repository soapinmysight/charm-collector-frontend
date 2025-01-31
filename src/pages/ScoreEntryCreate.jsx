import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router";

function ScoreEntryCreate() {
    const location = useLocation(); // Access the state passed via navigate
    const [formData, setFormData] = useState({
        score: location.state?.score || 0, // If no score, default to 0
        title: "",
        description: "",
        author: "",
        id: "",
    });
    const apiUrl = 'http://145.24.222.134:8001/score_entries'

    const navigate= useNavigate();

    //log the change when formData changes
    useEffect(()=>{
        console.log('formdatachanged', formData)
    },[formData])

    //Generieke handler voor het bijwerken van de state formData
    const handleInputChange = (event) => {
        // take the 'name' and 'value' from the input field that triggered the change
        const {name, value} = event.target;
        setFormData({ //set formData with:
            ...formData,// all previous form data (from other fields)
            [name]: value,// update the specific field (with given name) with the new value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const saveEntries = async () => {
            try {
                // Post request to server to update the score entries with the form data
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                // Check if the response status is OK and has content
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const text = await response.text(); //get the raw response text first
                console.log('Raw response:', text);
                //if the response text is not empty, parse it as JSON
                const data = text ? JSON.parse(text) : {};
                console.log('Data after submit:', data);

                navigate('/'); //navigate back to collection
            } catch (error) {
                console.error('Fout bij het ophalen van de score entries:', error);
            }
        };

        saveEntries()
        console.log('Formulier verzonden:', formData);
    };


    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg text-white w-full max-w-lg flex flex-col items-center">
        <h1 className="text-2xl text-pink-400 mb-4">Game Over</h1>
            <div className="w-full mb-4">
                <label htmlFor="score" className="block text-pink-400">Score:</label>
                <input
                    type="text"
                    id="score"
                    name="score"
                    value={formData.score}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full p-2 rounded bg-gray-700 text-white border border-pink-400"
                />
            </div>
            <div className="w-full mb-4">
                <label htmlFor="title" className="block text-pink-400">Title:</label>
                <input
                    type="text"
                    id="tile"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-pink-400"
                />
            </div>
            <div className="w-full mb-4">
                <label htmlFor="description" className="block text-pink-400">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-pink-400"
                />
            </div>
            <div className="w-full mb-4">
                <label htmlFor="author" className="block text-pink-400">author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-pink-400"
                />
            </div>
            <button type="submit"className="bg-pink-500 px-4 py-2 rounded-lg shadow-md hover:bg-pink-600">Verzenden</button>
        </form>
    );
}

export default ScoreEntryCreate;
