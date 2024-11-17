import React, { useState, useEffect } from 'react';
import './styles.css';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import axios from 'axios';

const API_KEY = '44796610-199f31a4ab0c11e14848311c2';

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Функція для запиту до Pixabay
  const fetchImages = async (query, page) => {
    if (!query) return;

    setIsLoading(true);

    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await axios.get(URL);
      const newImages = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );

      setImages(prevImages =>
        page === 1 ? newImages : [...prevImages, ...newImages]
      );
    } catch (error) {
      console.error('Axios error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Виклик при зміні query або page
  useEffect(() => {
    if (query) {
      fetchImages(query, page);
    }
  }, [query, page]);

  // Пошук за новим запитом
  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  // Завантаження більше зображень
  const loadMore = () => setPage(prevPage => prevPage + 1);

  // Відкриття великого зображення
  const openModal = imageUrl => {
    setShowModal(true);
    setModalImage(imageUrl);
  };

  // Закриття модального вікна
  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <div className="searchImages">
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={loadMore} />}
      {showModal && <Modal imageUrl={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default ImageSearch;
