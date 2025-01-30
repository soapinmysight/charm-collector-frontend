import React, {useState, useEffect} from 'react';
import ScoreEntryCard from '../components/ScoreEntryCard.jsx';

function ScoreEntriesList() {
    const [scoreEntries, setScoreEntries] = useState(null);
    const apiUrl = 'http://145.24.222.134:8001/score_entries'

    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(6);
    const [minScore, setMinScore] = useState('');
    const [maxScore, setMaxScore] = useState('');
    const [searchText, setSearchText] = useState('');



    useEffect(() => {
        async function fetchScoreEntries() {
            try {
                const response = await fetch(apiUrl,{
                    method: 'GET',
                    headers:{
                        'Accept':'application/json'
                    }
                });
                const data = await response.json();
                console.log('API response data:', data);
                setScoreEntries(data.scoreEntries);
                console.log('fetched scoreEntries',scoreEntries)
            } catch (error) {
                console.error('Fout bij het ophalen van de scoreEntries:', error);
            }
        }

        fetchScoreEntries();
    }, []); // Lege array zorgt ervoor dat useEffect alleen bij de eerste render wordt uitgevoerd.
    console.log('scoreEntries', scoreEntries)

    // if scoreEntries didnt load (yet), display following message instead
    if (!scoreEntries) {
        return <p>Score Entries laden...</p>;
    }


    // filter the score entries based on min/max score and search text
    const filteredEntries = scoreEntries.filter(entry => {
        const score = entry.score;
        const min = minScore !== '' ? parseFloat(minScore) : -Infinity;
        const max = maxScore !== '' ? parseFloat(maxScore) : Infinity;
        const matchesScore = score >= min && score <= max;
        const title = entry.title ? entry.title.toLowerCase() : '';
        const description = entry.description ? entry.description.toLowerCase() : '';
        const matchesSearch = searchText === '' ||
            title.includes(searchText.toLowerCase()) ||
            description.includes(searchText.toLowerCase());
        return matchesScore && matchesSearch;
    });


    const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentEntries = filteredEntries.slice(startIndex, endIndex);



    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <>
            <div className="flex justify-center space-x-4 mb-6">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search Title or Body"
                    className="p-2 border rounded text-gray-800"
                />
                <input
                    type="number"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    placeholder="Min Score"
                    className="p-2 border rounded text-gray-800"
                />
                <input
                    type="number"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    placeholder="Max Score"
                    className="p-2 border rounded text-gray-800"
                />
            </div>


            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {currentEntries.map(scoreEntry => (
                    <ScoreEntryCard key={scoreEntry.id} id={scoreEntry.id} score={scoreEntry.score} title={scoreEntry.title} />
                ))}
            </div>
            <div className="mt-6 flex justify-center items-center space-x-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="bg-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-white">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="bg-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 disabled:opacity-50"                >
                    Next
                </button>
            </div>
        </>
    );
}

export default ScoreEntriesList;