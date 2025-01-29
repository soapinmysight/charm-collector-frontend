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
        // favourite: "",
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
                <label htmlFor="body" className="block text-pink-400">Body:</label>
                <input
                    type="text"
                    id="body"
                    name="body"
                    value={formData.body}
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
            {/*<div className="w-full mb-4">*/}
            {/*    <label htmlFor="favourite" className="block text-pink-400">favourite:</label>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        id="favourite"*/}
            {/*        name="favourite"*/}
            {/*        value={formData.favourite}*/}
            {/*        onChange={handleInputChange}*/}
            {/*        className="w-full p-2 rounded bg-gray-700 text-white border border-pink-400"*/}
            {/*    />*/}
            {/*</div>*/}
            <button type="submit"className="bg-pink-500 px-4 py-2 rounded-lg shadow-md hover:bg-pink-600">Verzenden</button>
        </form>
    );
}

export default ItemCreate;
