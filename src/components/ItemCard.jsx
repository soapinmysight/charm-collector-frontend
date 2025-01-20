import React from 'react';
import './ItemCard.css';
import {Link} from "react-router";

function ItemCard({ id, title, body }) {
    return (
        <div className="item-card">
            <h3 className="item-card-title">{title}</h3>
            <p className="item-card-body">{body}</p>
            <Link to={`/ItemDetail/${id}`}>Detail Page</Link>
        </div>
    );
}

export default ItemCard;