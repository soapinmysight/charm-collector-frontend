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
        <div>
            {item ? (
                <>
                    <h1>{item.score}</h1>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                    <Link to={`/ItemEdit/${id}`}>Edit Item</Link>
<button onClick={() => handleDelete(item.id)}>Delete</button>
                </>
            ) : (
                <p>Loading item...</p>
            )}
        </div>
    );
}

export default ItemDetail;