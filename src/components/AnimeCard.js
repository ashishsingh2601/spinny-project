import React from 'react';
import {Card} from 'react-bootstrap';
import './AnimeCard.css';

const AnimeCard = ({animeData}) => {
    return (
        <React.Fragment>
                <Card style={{ width: '15rem', height: 'auto', marginBottom: '1.8rem' }} className="anime-card mb-6">
                    <Card.Img variant="top" className="card-image" src={animeData.imageUrl} />
                    <Card.Body>
                        <Card.Title>{animeData.title}</Card.Title>
                    </Card.Body>
                </Card>
        </React.Fragment>
    )
}

export default AnimeCard
