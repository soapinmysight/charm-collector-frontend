import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router";

function ItemDetail() {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const navigate= useNavigate();

    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await fetch(`http://145.24.222.134:8001/items/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        }

        fetchItem();
    }, [id]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://145.24.222.134:8001/items/${id}`, {
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
            console.log('Item deleted successfully');
            navigate('/');

        } catch (error) {
            console.error('Error fetching item:', error);
    }};

    return (
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto text-center">            {item ? (
                <>
                    <h1 className="text-3xl text-pink-400 font-bold">{item.score}</h1>
                    <h2 className="text-2xl text-gray-300">{item.title}</h2>
                    <p className="text-gray-400">{item.author}</p>
                    <p className="text-gray-400">{item.body}</p>
                    <Link to={`/ItemEdit/${id}`}className="text-pink-400 hover:underline">Edit Item</Link>
<button onClick={() => handleDelete(item.id)}className="bg-pink-500 px-4 py-2 ml-4 rounded-lg shadow-md hover:bg-pink-600">Delete</button>
                </>
            ) : (
                <p>Loading item...</p>
            )}
        </div>
    );
}

export default ItemDetail;