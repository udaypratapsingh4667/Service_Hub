import React from 'react';
import './ServiceDetailModal.css';

// --- Icon Components ---
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const StarIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;

// --- Sub-Components ---

const StarRating = ({ rating, count }) => {
    if (count === 0 || !rating) {
        return <div className="detail-rating-text">No reviews yet</div>;
    }
    const fullStars = Math.round(rating);
    return (
        <div className="detail-star-rating">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className={i < fullStars ? "star-filled" : "star-empty"} />)}
            <span className="detail-rating-text">{parseFloat(rating).toFixed(1)} ({count} {count === 1 ? 'review' : 'reviews'})</span>
        </div>
    );
};

// --- Main Modal Component ---

const ServiceDetailModal = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content detail-modal" onClick={e => e.stopPropagation()}>
                <div className="detail-modal-header">
                     <img 
                        src={service.image_url || `https://placehold.co/600x300/10101a/a99eff?text=${service.service_name}`} 
                        alt={service.service_name} 
                        className="detail-modal-img"
                    />
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                <div className="detail-modal-body">
                    <div className="detail-title-section">
                        <h2>{service.service_name}</h2>
                        <p className="detail-price">₹{service.price ? Number(service.price).toLocaleString('en-IN') : 'N/A'}</p>
                    </div>
                     <StarRating rating={service.average_rating} count={service.review_count} />

                    <div className="detail-meta">
                        <span><TagIcon /> {service.category}</span>
                        <span><MapPinIcon /> {service.location || 'Not specified'}</span>
                         <span><UserIcon /> {service.provider_name}</span>
                    </div>

                    <p className="detail-description">
                        {service.description || "No description provided for this service."}
                    </p>
                </div>
                 <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailModal;