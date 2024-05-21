import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CreateSlide ({ slide, backgroundColor, isPreview }) {
  const [activeDrags, setActiveDrags] = useState(0);
  console.log(activeDrags);

  const onStart = () => {
    setActiveDrags(prevActiveDrags => prevActiveDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(prevActiveDrags => prevActiveDrags - 1);
  };

  const onTextBoxClick = () => {
    alert('Todo: opens edit modal');
  };

  const onImageClick = () => {
    alert('Todo: opens edit image modal');
  };

  const renderTextbox = (box) => {
    const boxstyle = {
      position: 'absolute',
      width: box.size.width,
      height: box.size.height,
      border: '1px solid #ccc',
      color: box.colour,
      fontSize: `${box.fontSize}em`,
      fontFamily: box.fontFamily,
      overflow: 'hidden',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
    };

    return (
      <Draggable
        onStart={onStart}
        onStop={onStop}
        bounds="parent"
        key={box.id}
      >
        <div onDoubleClick={onTextBoxClick} style={boxstyle}>
          {box.text}
        </div>
      </Draggable>
    );
  };

  const renderImage = (image) => {
    const imageStyle = {
      position: 'absolute',
      width: image.size.width,
      height: image.size.height,
      overflow: 'hidden'
    };

    return (
      <Draggable
        onStart={onStart}
        onStop={onStop}
        bounds="parent"
        key={image.id}
      >
        <img src={image.imageUrl} alt={image.altText} style={imageStyle} onDoubleClick={onImageClick} />
      </Draggable>
    );
  };

  const renderVideo = (video) => {
    const videoStyle = {
      position: 'absolute',
      width: video.size.width,
      height: video.size.height
    };

    const embedUrl = video.videoUrl.replace('watch?v=', 'embed/');
    const videoSrc = `${embedUrl}?autoplay=${video.autoplay ? '1' : '0'}&enablejsapi=1`;

    return (
      <Draggable
      onStart={onStart}
        onStop={onStop}
        bounds="parent"
        key={video.id}>
        <iframe
          src={videoSrc}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={videoStyle}
          title="Embedded youtube"
        ></iframe>
      </Draggable>
    );
  };

  const renderCode = (code) => {
    const codeStyle = {
      width: `${code.size.width}%`,
      height: `${code.size.height}%`,
      fontSize: `${code.fontSize}em`,
      overflow: 'auto',
      border: '1px solid #ccc',
      padding: '10px'
    };

    return (
      <Draggable
      onStart={onStart}
        onStop={onStop}
        bounds="parent"
        key={code.id}>
        <div style={codeStyle}>
          <SyntaxHighlighter language={code.language} style={docco}>
            {code.code}
          </SyntaxHighlighter>
        </div>
      </Draggable>
    );
  };

  const slideStyle = {
    backgroundColor,
    overflow: 'hidden',
    position: 'relative',
    height: isPreview ? '100vh' : '400px',
    width: isPreview ? '100vw' : '80%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    border: isPreview ? 'none' : '1px solid black',
  };

  return (
    <div style={slideStyle}>
      {slide.content.map(item => {
        switch (item.objType) {
          case 'textbox':
            return renderTextbox(item);
          case 'image':
            return renderImage(item);
          case 'video':
            return renderVideo(item);
          case 'code':
            return renderCode(item);
          default:
            return null;
        }
      })}
    </div>
  );
}

export default CreateSlide;
