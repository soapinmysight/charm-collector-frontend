import React from 'react';
import './ItemCard.css';
import {Link} from "react-router";

function ItemCard({ id, score, title, body }) {
    return (
        <div className="item-card">
            <h3 className="item-card-title">{score}</h3>
            <p className="item-card-body">{title}</p>
            <Link to={`/ItemDetail/${id}`}>Detail Page</Link>
        </div>
    );
}

export default ItemCard;