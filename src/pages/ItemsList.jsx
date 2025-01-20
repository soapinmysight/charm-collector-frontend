import React, {useState, useEffect} from 'react';
import ItemCard from '../components/ItemCard.jsx';

function ItemsList() {
    const [items, setItems] = useState(null);
    const apiUrl = 'http://145.24.222.134:8001/items'

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await fetch(apiUrl,{
                    method: 'GET',
                    headers:{
                        'Accept':'application/json'
                    }
                });
                const data = await response.json();
                console.log('API response data:', data);
                setItems(data.items);
                console.log('fetched items',items)
            } catch (error) {
                console.error('Fout bij het ophalen van de items:', error);
            }
        }

        fetchItems();
    }, []); // Lege array zorgt ervoor dat useEffect alleen bij de eerste render wordt uitgevoerd.
    console.log('items', items)

    // if items didnt load (yet), display following message instead
    if (!items) {
        return <p>items laden...</p>;
    }

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);



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
            <div style={{ width: '40vw'}}>
                {currentItems.map(item => (
                    <ItemCard key={item.id} id={item.id} title={item.title} body={item.body} />
                ))}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    style={{ marginRight: '10px' }}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    style={{ marginLeft: '10px' }}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default ItemsList;