import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router";

function ItemCreate() {
    const location = useLocation(); // Access the state passed via navigate
    const [formData, setFormData] = useState({
        score: location.state?.score || 0, // If no score, default to 0
        title: "",
        body: "",
        author: "",
        id: "",
        favourite: "",
    });
    const apiUrl = 'http://145.24.222.134:8001/items'

    const navigate= useNavigate();

    //log the change when formData changes
    useEffect(()=>{
        console.log('formdatachanged', formData)
    },[formData])

    //Generieke handler voor het bijwerken van de state formData
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        async function saveItems() {
            try {
                const response = await fetch(apiUrl,{
                    method: 'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                console.log('data after submit', data)
                navigate('/');
            } catch (error) {
                console.error('Fout bij het ophalen van de items:', error);
            }
        }
        saveItems()
        console.log('Formulier verzonden:', formData);
    };


    return (
        <form onSubmit={handleSubmit}>
            <h1>Game Over</h1>
            <div>
                <label htmlFor="score">Score:</label>
                <input
                    type="text"
                    id="score"
                    name="score"
                    value={formData.score}
                    onChange={handleInputChange}
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="tile"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="body">Body:</label>
                <input
                    type="text"
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="author">author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="favourite">favourite:</label>
                <input
                    type="text"
                    id="favourite"
                    name="favourite"
                    value={formData.favourite}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Verzenden</button>
        </form>
    );
}

export default ItemCreate;
