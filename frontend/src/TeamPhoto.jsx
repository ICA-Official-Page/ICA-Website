import React, { useState, useRef } from 'react';

function TeamPhoto({ src, alt }) {
    const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
    const imgRef = useRef(null);

    const onImageLoad = () => {
        if (imgRef.current) {
            setNaturalSize({
                width: imgRef.current.naturalWidth,
                height: imgRef.current.naturalHeight,
            });
        }
    };

    return (
        <div
            className="team-photo"
            style={{
                width: naturalSize.width,
                height: naturalSize.height,
                background: 'var(--gradient-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={onImageLoad}
                style={{ display: 'block' }}
            />
        </div>
    );
}

export default TeamPhoto;