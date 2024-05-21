import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../App';
import EditTitleModal from '../components/EditTitleModal';
import Carousel from 'react-bootstrap/Carousel';
import CreateSlide from '../components/CreateSlide';
import { Nav, Modal } from 'react-bootstrap';

import '../App.css';
import TextboxModal from '../components/TextboxModal';
import AddImageModal from '../components/AddImageModal';
import AddCodeModal from '../components/AddCodeModal';
import AddVideoModal from '../components/AddVideoModal';
import AddBackgroundModal from '../components/AddBackgroundModal';

function EditPresentation ({ token }) {
  const navigate = useNavigate();
  const { id: presentationId } = useParams();
  const [showTitleModal, setShowTitleModal] = React.useState(false);
  const [showTextboxModal, setShowTextboxModal] = React.useState(false);
  const [showAddImageModal, setShowAddImageModal] = React.useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = React.useState(false);
  const [showAddCodeModal, setShowAddCodeModal] = React.useState(false);
  const [slides, setSlides] = React.useState([{ id: 1, content: [] }]);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [selectedPresentation, setSelectedPresentation] = React.useState(null);
  const [currPresentations, setCurrPresentations] = React.useState(null);
  const [showAddBackgroundModal, setAddBackgroundModal] = React.useState(false);
  const [currentSlideBackground, setCurrentSlideBackground] = React.useState('#FFFFFF');
  const [showPreview, setShowPreview] = React.useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = React.useState(false);
  const [newSlideElement, setNewSlideElement] = React.useState({});

  console.log(currPresentations);

  React.useEffect(() => {
    axios.get(`${BACKEND_URL}/store`, {
      headers: {
        Authorization: token,
      },
    }).then(response => {
      setCurrPresentations(response.data.store);
      setSelectedPresentation(response.data.store.presentations.find(p => (p.id === parseInt(presentationId))));
      setSlides(response.data.store.presentations.find(p => (p.id === parseInt(presentationId))).slides);
    }).catch(error => {
      console.error('Error fetching presentation:', error);
    });
  }, [showTitleModal, presentationId, token]);

  React.useEffect(() => {
    const slideIndex = currentSlideIndex + 1;
    const presentationIndex = parseInt(presentationId) + 1;
    const newUrl = `/presentation/${presentationIndex}/slide/${slideIndex}`;
    window.history.replaceState(null, null, newUrl);
  }, [currentSlideIndex, presentationId]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this presentation?');
    if (confirmDelete) {
      try {
        const updatedPresentations = currPresentations.presentations.filter(presentation => presentation.id !== parseInt(presentationId))
        await axios.put(`${BACKEND_URL}/store`, {
          store: { presentations: updatedPresentations },
        }, {
          headers: {
            Authorization: token,
          }
        });
        navigate('/dashboard');
      } catch (err) {
        console.error('Failed to update presentations:', err);
        alert('Error updating presentations: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleEditTitle = () => {
    setShowTitleModal(true);
  };

  const handleCloseModal = () => {
    setShowTitleModal(false);
    setShowTextboxModal(false);
    setShowAddImageModal(false);
    setShowAddCodeModal(false);
    setShowAddVideoModal(false);
    setAddBackgroundModal(false);
  };

  const handleAddSlide = async () => {
    const maxId = slides.length === 0 ? 0 : Math.max(...slides.map(slide => slide.id));
    const newId = maxId + 1;
    const updatedSlides = [...slides, { id: newId, content: [] }];

    try {
      const updatedPresentation = {
        ...selectedPresentation,
        slides: updatedSlides,
      };

      await axios.put(`${BACKEND_URL}/store`, {
        store: { presentations: currPresentations.presentations.map((p) => (p.id === parseInt(presentationId) ? updatedPresentation : p)) },
      }, {
        headers: {
          Authorization: token,
        },
      });

      setCurrPresentations({
        ...currPresentations,
        presentations: currPresentations.presentations.map((p) => (p.id === parseInt(presentationId) ? updatedPresentation : p)),
      });

      setSlides(updatedSlides);
      console.log('Slide added successfully on the backend (assuming successful update)');
    } catch (err) {
      console.error('Failed to update presentation on the backend:', err);
      alert('Error adding slide: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleAddTextBox = () => {
    setShowTextboxModal(true);
  }

  const handleAddImage = () => {
    setShowAddImageModal(true);
  }

  const handleAddVideo = () => {
    setShowAddVideoModal(true);
  }

  const handleAddCode = () => {
    setShowAddCodeModal(true);
  }

  const handleDeleteSlide = async (slideId) => {
    if (slides.length === 1) {
      alert('Cannot delete the only slide. Please delete the presentation instead.');
      handleDelete();
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this slide?');
    if (confirmDelete) {
      try {
        const updatedSlides = slides.filter(slide => slide.id !== slideId);
        const updatedPresentation = {
          ...selectedPresentation,
          slides: updatedSlides,
        };

        await axios.put(`${BACKEND_URL}/store`, {
          store: { presentations: currPresentations.presentations.map((p) => (p.id === parseInt(presentationId) ? updatedPresentation : p)) },
        }, {
          headers: {
            Authorization: token,
          },
        });
        const deletedSlideIndex = slides.findIndex(slide => slide.id === slideId);
        const newCurrentSlideIndex = deletedSlideIndex === 0 ? 0 : deletedSlideIndex - 1;
        setCurrentSlideIndex(newCurrentSlideIndex);
        setCurrPresentations({
          ...currPresentations,
          presentations: currPresentations.presentations.map((p) => (p.id === parseInt(presentationId) ? updatedPresentation : p)),
        });
        setSlides(updatedSlides);
        console.log('Slide deleted successfully on the backend (assuming successful update)');
      } catch (err) {
        console.error('Failed to update presentation on the backend:', err);
        alert('Error deleting slide: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleSaveBackgroundColor = (newColor) => {
    setCurrentSlideBackground(newColor);
  };

  const handleOpenPreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  React.useEffect(() => {
    if (Object.keys(newSlideElement).length !== 0) {
      const maxId = slides && slides.content && slides.content.length > 0
        ? Math.max(...slides.content.map(slide => slide.id))
        : 0;
      const newId = maxId + 1;

      newSlideElement.id = newId;

      const updatedSlides = slides.map((slide, index) => {
        if (index === currentSlideIndex) {
          return {
            ...slide,
            content: [...slide.content, newSlideElement]
          };
        }
        return slide;
      });
      const updatedPresentation = {
        ...selectedPresentation,
        slides: updatedSlides,
      };

      try {
        axios.put(`${BACKEND_URL}/store`, {
          store: {
            presentations: currPresentations.presentations.map(p =>
              p.id === parseInt(presentationId) ? { ...selectedPresentation, slides: updatedSlides } : p)
          }
        }, {
          headers: {
            Authorization: token,
          }
        });

        setCurrPresentations({
          ...currPresentations,
          presentations: currPresentations.presentations.map((p) => (p.id === parseInt(presentationId) ? updatedPresentation : p)),
        });
        setSlides(updatedSlides);
      } catch (err) {
        console.error('Failed to update presentation on the backend:', err);
        alert('Error updating slide: ' + (err.response?.data?.error || err.message));
      }
    }
  }, [newSlideElement]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
        setCurrentSlideIndex(currentSlideIndex - 1);
      } else if (event.key === 'ArrowRight' && currentSlideIndex < slides.length - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlideIndex, slides]);

  const containerStyle = {
    display: 'flex',
    height: '100vh',
  };

  const sidebarStyle = {
    width: 'min(40vw, 300px)',
    backgroundColor: '#212529',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    justifyContent: 'space-between'
  };

  const mainContentStyle = {
    flexGrow: 1,
    overflowY: 'auto',
    position: 'relative',
  };

  const slideCountStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    width: '50px',
    height: '50px',
    backgroundColor: 'black',
    opacity: 0.7,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1em',
  };

  const titleStyle = {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  }

  const navStyle = {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    backgroundColor: '#212529',
  };

  const navLinkStyle = {
    color: 'white',
    padding: '10px 15px',
    cursor: 'pointer',
  };

  const [hoveredButton, setHoveredButton] = React.useState(null);
  const hoverStyle = { color: '#D3D3D3' };

  const [hoverTitle, setHoverTitle] = React.useState(null);
  const titleHover = {
    color: '#D3D3D3',
    border: '1px dashed black'
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={sidebarStyle}>
        <div style={navStyle}>
            <div style={navLinkStyle}>
              <span onClick={handleBack}
                    onMouseEnter={() => setHoveredButton('back')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={hoveredButton === 'back' ? { ...navLinkStyle, ...hoverStyle } : navLinkStyle}>
                Back
              </span>
            </div>
            <div style={navLinkStyle}>
              <span onClick={handleAddSlide}
                    onMouseEnter={() => setHoveredButton('add')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={hoveredButton === 'add' ? { ...navLinkStyle, ...hoverStyle } : navLinkStyle}>
                Add Slide
              </span>
            </div>
            <div style={navLinkStyle}>
              <span onClick={() => setAddBackgroundModal(true)}
                    onMouseEnter={() => setHoveredButton('background')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={hoveredButton === 'background' ? { ...navLinkStyle, ...hoverStyle } : navLinkStyle}>
                Edit Background
              </span>
            </div>
            <div style={navLinkStyle}>
              <span onClick={handleAddTextBox}
                    onMouseEnter={() => setHoveredButton('textbox')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={hoveredButton === 'textbox' ? { ...navLinkStyle, ...hoverStyle } : navLinkStyle}>
                Add Text Box
              </span>

            </div>
            <div style={navLinkStyle}>
              <span onClick={handleAddImage}
                    onMouseEnter={() => setHoveredButton('image')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={hoveredButton === 'image' ? { ...navLinkStyle, ...hoverStyle } : navLinkStyle}>
                Add Image
              </span>
            </div>
            <div style={navLinkStyle}>
              <span onClick={handleAddVideo}
                    onMouseEnter={() => setHoveredButton('video')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={hoveredButton === 'video' ? { ...navLinkStyle, ...hoverStyle } : navLinkStyle}>
                Add Video
              </span>
            </div>

            <div style={navLinkStyle}>
              <span onClick={handleAddCode}
                    onMouseEnter={() => setHoveredButton('code')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={hoveredButton === 'code' ? { ...navLinkStyle, ...hoverStyle } : navLinkStyle}>
                Add Code
              </span>
            </div>

            {currentSlideIndex !== -1 && (
              <div style={navLinkStyle}>
                <span onClick={() => handleDeleteSlide(slides[currentSlideIndex].id)}
                style={hoveredButton === 'delete' ? { ...navLinkStyle, ...hoverStyle } : navLinkStyle}
                onMouseEnter={() => setHoveredButton('delete')}
                onMouseLeave={() => setHoveredButton(null)}>
                Delete Slide
                </span>
              </div>
            )}
            {showPreview && (
              <Modal fullscreen={true} show={showPreview} onHide={handleClosePreview}>
              <Modal.Header style={{ display: isHeaderHovered ? 'flex' : 'none' }} closeButton onMouseEnter={() => setIsHeaderHovered(true)} onMouseLeave={() => setIsHeaderHovered(false)}>
                &nbsp;
              </Modal.Header>
              <Modal.Body onMouseEnter={() => setIsHeaderHovered(true)} onMouseLeave={() => setIsHeaderHovered(false)}>
                <Carousel
                  fullscreen={true}
                  interval={null}
                  activeIndex={currentSlideIndex}
                  onSelect={setCurrentSlideIndex}
                  prevIcon={<span className={currentSlideIndex === 0 ? 'd-none' : 'carousel-control-prev-icon'} />}
                  nextIcon={<span className={currentSlideIndex === slides.length - 1 ? 'd-none' : 'carousel-control-next-icon'} />}
                >
                  {slides.map((slide) => (
                    <Carousel.Item key={slide.id} fullscreen={true} className="slide">
                      <CreateSlide slide={slide} backgroundColor={currentSlideBackground} isPreview={true} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Modal.Body>
            </Modal>

            )}

          </div>
          {showAddBackgroundModal && (
            <AddBackgroundModal
                show={showAddBackgroundModal}
                onClose={handleCloseModal}
                currentSlideBackground={currentSlideBackground}
                defaultSlideBackground="#FFFFFF"
                onSave={handleSaveBackgroundColor}
            />
          )}
          {showTextboxModal && (
            <TextboxModal
              onClose={handleCloseModal}
              setNewSlideElement={setNewSlideElement}
            />
          )}
          {showAddImageModal && (
            <AddImageModal
              onClose={handleCloseModal}
              setNewSlideElement={setNewSlideElement}
            />
          )}
          {showAddCodeModal && (
            <AddCodeModal
              onClose={handleCloseModal}
              setNewSlideElement={setNewSlideElement}
            />
          )}
          {showAddVideoModal && (
            <AddVideoModal
              onClose={handleCloseModal}
              setNewSlideElement={setNewSlideElement}
            />
          )}

          <div>
            <Nav className="flex-column bg-dark">
            <Nav.Link className="nav-link link-light">
              <div onClick={handleOpenPreview} style={hoveredButton === 'preview' ? hoverStyle : {}}
              onMouseEnter={() => setHoveredButton('preview')}
              onMouseLeave={() => setHoveredButton(null)}>
                Preview Presentation
              </div>
              </Nav.Link>
              <Nav.Link className="nav-link link-light">
              <div onClick={handleDelete} style={hoveredButton === 'deleteP' ? hoverStyle : {}}
              onMouseEnter={() => setHoveredButton('deleteP')}
              onMouseLeave={() => setHoveredButton(null)}>
                Delete Presentation
              </div>
              </Nav.Link>
            </Nav>
          </div>
        </div>
        <div style={mainContentStyle}>
          {selectedPresentation && (
            <span style={titleStyle} >
              <h2 onClick={handleEditTitle} style={hoverTitle === 'title' ? titleHover : {}} onMouseEnter={() => setHoverTitle('title')} onMouseLeave={() => setHoverTitle(null)}>

              {selectedPresentation.name}</h2>
              {showTitleModal && (
                <EditTitleModal
                  token={token}
                  onClose={handleCloseModal}
                  currPresentations={currPresentations}
                  presentationId={presentationId}
                  newName={selectedPresentation.name}
                  slides={slides}
                />
              )}
            </span>
          )}
          <Carousel interval={null} activeIndex={currentSlideIndex} onSelect={setCurrentSlideIndex}
            prevIcon={<span className={currentSlideIndex === 0 ? 'd-none' : 'carousel-control-prev-icon'} />}
            nextIcon={<span className={currentSlideIndex === slides.length - 1 ? 'd-none' : 'carousel-control-next-icon'} />}>
            {slides.map((slide) => (
              <Carousel.Item key={slide.id} className="slide">
                <CreateSlide slide={slide} backgroundColor={currentSlideBackground}/>
              </Carousel.Item>
            ))}
          </Carousel>
          <div style={slideCountStyle}>
            {slides.length === 1 ? '1' : `${currentSlideIndex + 1}/${slides.length}`}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPresentation;
