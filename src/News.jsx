import React, { useState, useEffect } from 'react';
import { fetchNews } from './newsService';
// import Header from './compnents/Header';
import { Button, Card, CardGroup } from 'react-bootstrap';

const News = ({ setStoreApi, filterData }) => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [addStart, setAddStart] = useState([])

    // console.log(filterData);

    useEffect(() => {
        setLoading(true);
        // fetch('https://newsapi.org/v2/everything?q=keyword&apiKey=603cac94f6754be3bcd0791c3f6ba9f6')
        //     .then((response) => {
        //         setStoreApi(response.data.articles);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching news:", error);
        //         setError(error);
        //     })
        const main = async () => {
            try {
                const store = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=603cac94f6754be3bcd0791c3f6ba9f6')
                const mainData = await store.json()
                const storeData = setAddStart(mainData.articles);
                setLoading(false);
                // console.log(storeData);
            } catch (error) {
                console.log(error , 'hii');
                setError(error);
            }
        }
        main()
    }, []);

    console.log(addStart.urlToImage);

    const handleNextPage = () => setPage((prevPage) => prevPage + 1);
    const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

    if (loading) return <h2>Loading...</h2>;
    if (loading) return <p>Error: {error.message}</p>;


    return (
        <div>
            {loading ? (
                <p>{loading}</p>
            ) : (
                <div className='d-flex flex-wrap gap-4 my-5 contsiner justify-content-center'>
                    {addStart.map((article, index) => (
                        <Card key={index} className='cardWapper card my-2 col-10 col-md-5 col-lg-3'>
                            <div className='comman-height'>
                                <Card.Img
                                    variant="top"
                                    // src={article.urlToImage} />
                                    src={article.image === null
                                        ? 'https://loremflickr.com/640/360'
                                        : article.urlToImage} />
                            </div>
                            <Card.Body>
                                <Card.Title className='titleWapper'>{article.title}</Card.Title>
                                <Card.Text className='titleDiscription'>
                                    {article.description === null ? null : <details>
                                        <summary>Read More</summary>
                                        <p>{article.description} </p>
                                    </details>}

                                </Card.Text>
                            </Card.Body>
                            <button className='card-button'>
                                <a href={article.url}
                                    className='text-white text-decoration-none'
                                    target="_blank" rel="noopener noreferrer ">Read more</a>
                            </button> 
                        </Card>
                    ))}
                </div>
            )}

            <div className='text-center d-flex gap-4 justify-content-center my-3'>
                <Button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    variant="secondary">
                    Previous
                </Button>
                <Button
                    onClick={handleNextPage}
                    variant="secondary">Next</Button>
            </div>
        </div>
    );
};

export default News;
