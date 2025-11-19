
import React from 'react';
import Card from '../UI/Card.jsx';
import { Link } from 'react-router-dom';    

const NotFoundPage = () => {
  return (
    <Card>
       <h4>Something went wrong</h4>
       <p>Sorry, there seems to be an issue loading the page</p>
       <Link to={'/'} className="btn btn-primary mt-4">Go to Home</Link>
    </Card>
  )
}

export default NotFoundPage;
