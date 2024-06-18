import React, { useState, useEffect } from 'react';
import { fetchNews } from './newsService';
import Header from './compnents/Header'
import { Button, Card, CardGroup } from 'react-bootstrap';

const News = ({setStoreApi , filterData}) => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchNews(page)
            .then((response) => {
                setStoreApi(response.data.articles);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching news:", error);
                // setLoading(false);
                // setLoading(false)
                setError(error);;
               
            })
    }, [page]);

    const handleNextPage = () => setPage((prevPage) => prevPage + 1);
    const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) return <h2>Loading...</h2>;
  if (loading) return <p>Error: {error.message}</p>;


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='d-flex flex-wrap gap-4 my-5 contsiner justify-content-center'>
                    {filterData.map((article, index) => (
                        <Card key={index} className='cardWapper col-3'>
                            <div className='comman-height'>
                                <Card.Img
                                    variant="top"
                                    src={article.urlToImage === null
                                        ? 'https://loremflickr.com/640/360'
                                        : article.urlToImage} />
                            </div>

                            <Card.Body>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Text>
                                    {article.description}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                                <Button variant="primary">
                                    <a href={article.url}
                                        className='text-white text-decoration-none'
                                        target="_blank" rel="noopener noreferrer ">Read more</a>
                                </Button>
                            </Card.Footer>
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
