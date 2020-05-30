import React, { useState } from 'react';
import { getImageUrl } from '../config/firebase';
import Image from './Image';

const ImageContainer = () => {
    const [limit, setLimit] = useState(0);
    const [data, setData] = useState([]);

    window.onload = () => {
        getImages();
    }

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            getLimit();
        }
    }

    const getLimit = () => {
        let newLimit = limit + 4;
        setLimit(newLimit);
        getImages();
    }

    async function getImages() {
        let result = await getImageUrl(limit);

        if (result != null) {
            setData([...data, ...result]);
        }
        console.log(data);
    }

    return (
        <div>
            {
                data.map((image, key) => <Image src={image.url} key={key} />)
            }
        </div>
    )
}

export default ImageContainer;