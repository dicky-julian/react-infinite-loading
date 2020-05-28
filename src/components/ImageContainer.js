import React from 'react';
import { getImageUrl } from '../config/firebase';

class ImageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data__limit: 0,
            status__limit: 0
        }

        this.setLimit = this.setLimit.bind(this);
        this.getImages = this.getImages.bind(this);

        window.onscroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && this.state.status__limit < 1) {
                this.setLimit();
            }
        }
    }

    setLimit = () => {
        let limit = this.state.data__limit + 4;
        this.setState({ data__limit: limit }, () => {
            this.getImages()
        })
    }

    getImages = () => {
        let container = document.getElementsByClassName("image__container")[0];
        let that = this;

        getImageUrl(this.state.data__limit)
            .then(function (images) {
                if (images != null) {
                    images.map(function (image) {
                        container.innerHTML += `
                            <div class="image" style="background-image: url(${image.url})"></div>
                        `;

                        return ''
                    });
                } else {
                    that.setState({ status__limit: 1 });
                    container.innerHTML += `
                        <h1>Can't load more data</h1>
                    `;
                }
            })
    }

    componentDidMount() {
        this.getImages();
    }

    render() {
        return (
            <div>
                <div className="image__container"></div>
            </div>
        )
    }
}

export default ImageContainer;