import React, {useState, useEffect} from 'react';
import ScoreEntryCard from '../components/ScoreEntryCard.jsx';

function ScoreEntriesList() {
    const [scoreEntries, setScoreEntries] = useState(null);
// stores score entries fetched from the API
    const apiUrl = 'http://145.24.222.134:8080/scoreEntries'
// URL of the REST-ful API from opdracht 1 to fetch score entries

    const [currentPage, setCurrentPage] = useState(1);
    // for pagination
    const [entriesPerPage, setEntriesPerPage] = useState(6);
    // for how many entries to show per page

    const [minScore, setMinScore] = useState('');
    // for minimum score filter value
    const [maxScore, setMaxScore] = useState('');
    // for maximum score filter value
    const [searchText, setSearchText] = useState('');
    // for text used to filter the title/description


    // This useEffect hook runs when the component first renders
    useEffect(() => {
        // Function to fetch the score entries from the API
        async function fetchScoreEntries() {
            try {
                // Making a GET request to the API
                const response = await fetch(apiUrl,{
                    method: 'GET',
                    headers:{
                        'Accept':'application/json' // requesting JSON data
                    }
                });
                // Parsing the response data into JSON
                const data = await response.json();
                // Storing the fetched score entries in the state
                setScoreEntries(data.items);
            } catch (error) {
                console.error('Fout bij het ophalen van de scoreEntries:', error);
            }
        }
        fetchScoreEntries();
    }, []);
    console.log('scoreEntries', scoreEntries)

    // if scoreEntries didnt load (yet), display following message instead
    if (!scoreEntries) {
        return <p>Score Entries laden...</p>;
    }


    // filter through scoreEntries (entry by entry)
    const filteredEntries = scoreEntries.filter(entry => {
        const entryScore = entry.score;
        // if minScore is empty, set to -Infinity
        const min = minScore !== '' ? parseFloat(minScore) : -Infinity;
        // if maxScore is empty, set to Infinity
        const max = maxScore !== '' ? parseFloat(maxScore) : Infinity;
        // check if score higher or the same as min and lower or the same as max
        const matchesScore = entryScore >= min && entryScore <= max;

        // convert title & desctiption to lowercase for case-insensitive search
        const title = entry.title ? entry.title.toLowerCase() : '';
        const description = entry.description ? entry.description.toLowerCase() : '';
        //entry is added to "matchesSearch" if searchBar is empty (so in that case all will be added)
        //OR searchText is in entry's title OR description
        const matchesSearch = searchText === '' ||
            title.includes(searchText) ||
            description.includes(searchText);
        //return the entries that match score and search to filteredEnties
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
                    placeholder="Search Title or Description"
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
                    <ScoreEntryCard
                        key={scoreEntry.id}
                        id={scoreEntry.id}
                        score={scoreEntry.score}
                        title={scoreEntry.title} />
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