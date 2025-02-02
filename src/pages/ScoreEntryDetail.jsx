import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router";

function ScoreEntryDetail() {
    const {id} = useParams();
    const [scoreEntry, setScoreEntry] = useState(null);
    const navigate= useNavigate();

    useEffect(() => {
        async function fetchEntry() {
            try {
                const response = await fetch(`http://145.24.222.134:8080/scoreEntries/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setScoreEntry(data);
            } catch (error) {
                console.error('Error fetching scoreEntry:', error);
            }
        }

        fetchEntry();
    }, [id]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://145.24.222.134:8080/scoreEntries/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
        }
        );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('scoreEntry deleted successfully');
            navigate('/');

        } catch (error) {
            console.error('Error fetching scoreEntry:', error);
    }};

    return (
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto text-center">
            {scoreEntry ? (
                <>
                    <h1 className="text-3xl text-pink-400 font-bold">{scoreEntry.score}</h1>
                    <h2 className="text-2xl text-gray-300">{scoreEntry.title}</h2>
                    <p className="text-gray-400">{scoreEntry.author}</p>
                    <p className="text-gray-400">{scoreEntry.description}</p>
                    <Link to={`/scoreEntryEdit/${id}`}className="text-pink-400 hover:underline">Edit scoreEntry</Link>
                    <button onClick={() => handleDelete(scoreEntry.id)}className="bg-pink-500 px-4 py-2 ml-4 rounded-lg shadow-md hover:bg-pink-600">Delete</button>
                </>
            ) : (
                <p>Loading Score Entry...</p>
            )}
        </div>
    );
}

export default ScoreEntryDetail;