import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router";

function ScoreEntryEdit() {
    const navigate= useNavigate();
    const {id} = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: '',
        id: '',
        // favourite: '',
    });
    useEffect(() => {
        async function fetchEntry() {
            try {
                const response = await fetch(`http://145.24.222.134:8001/score_entries/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching scoreEntry:', error);
            }
        }

        fetchEntry();
    }, [id]);

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
        async function saveEntries() {
            try {
                const response = await fetch(`http://145.24.222.134:8001/score_entries/${id}`,{
                    method: 'PUT',
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
                console.error('Fout bij het ophalen van de scoreEntries:', error);
            }
        }
        saveEntries()
        console.log('Formulier verzonden:', formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit}className="bg-gray-800 p-6 rounded-xl shadow-lg text-white w-full max-w-lg flex flex-col items-center">
                <h1 className="text-2xl text-pink-400 mb-4">Edit Score Entry</h1>
                <div className="w-full mb-4">
                    <label htmlFor="title" className="block text-pink-400">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-pink-400"
                    />
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="description">Description:</label>
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
                    <label htmlFor="author">author:</label>
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
                {/*    <label htmlFor="favourite">favourite:</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        id="favourite"*/}
                {/*        name="favourite"*/}
                {/*        value={formData.favourite}*/}
                {/*        onChange={handleInputChange}*/}
                {/*        className="w-full p-2 rounded bg-gray-700 text-white border border-pink-400"*/}
                {/*    />*/}
                {/*</div>*/}
                <button type="submit" className="bg-pink-500 px-4 py-2 rounded-lg shadow-md hover:bg-pink-600">Verzenden</button>
            </form>
        </>
    );
}

export default ScoreEntryEdit;