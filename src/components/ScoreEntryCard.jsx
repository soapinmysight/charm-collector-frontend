import React from 'react';
import '../index.css';
// import '../Tailwind.css';
import {Link} from "react-router";

function ScoreEntryCard({ id, score, title }) {
    return (
        <div className="bg-pink-200 shadow-md rounded-lg p-4 m-4 border border-gray-300 transition-transform duration-200 ease-in-out hover:translate-y-[-4px] hover:shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{score}</h3>
            <p className="text-base text-gray-600 leading-relaxed">{title}</p>
            <Link to={`/scoreEntryDetail/${id}`} className="text-blue-500 hover:underline">Detail Page</Link>
        </div>
    );
}

export default ScoreEntryCard;