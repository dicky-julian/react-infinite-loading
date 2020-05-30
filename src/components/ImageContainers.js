import React from 'react';
import { getImageUrl } from '../config/firebase';
import Image from './Image';
import { SimpleImg } from 'react-simple-img';
import placeholder from '../placeholder.png';

class ImageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data__limit: 0,
        }

        this.setLimit = this.setLimit.bind(this);
        this.getImages = this.getImages.bind(this);

        this.wrapper = React.createRef();
    }

    async getImages() {
        let result = await getImageUrl(this.state.data__limit);

        if (result != null) {
            this.setState({ data: [...this.state.data, ...result] })
        }
        console.log(this.state.data);
    }

    setLimit = () => {
        let limit = this.state.data__limit + 4;
        this.setState({ data__limit: limit }, () => {
            this.getImages()
        })
    }

    setInfiniteScoll = () => {
        window.onscroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                this.setLimit();
            }
        }
    }

    componentDidMount() {
        this.getImages();
        this.setInfiniteScoll();
    }

    render() {
        return (
            <div className="image__container">
                {
                    this.state.data.map((image, key) =>
                        <SimpleImg height={350} className="image" src={image.url} key={key} placeholder={placeholder} importance="low" />
                            // <Image className="image" src={image.url} key={key} />
                    )
                }
            </div>
        )
    }
}

export default ImageContainer;