import React from 'react';
import { formatDistanceToNow } from 'date-fns'; // Import the function
import './NewsItem.css'; // We will create this file next

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    // Handle cases where the date from the API might be invalid
    let timeAgo = '';
    if (date) {
        try {
            timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch (e) {
            console.error("Invalid date provided:", date);
            timeAgo = 'a while ago'; // Fallback text
        }
    }

    return (
        <div className="my-3">
            <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}>
                    <span className="badge rounded-pill bg-danger"> {source} </span>
                </div>
                <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    {/* Use the formatted timeAgo variable here */}
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {timeAgo}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;