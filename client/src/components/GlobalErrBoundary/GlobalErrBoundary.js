import { Component } from 'react';
import { Image } from 'cloudinary-react';

import { SentimentVeryDissatisfiedIcon } from '../../config/materialConfig';


class BlobalErrBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log('Gloabal Error from componentDidCatch: ', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                <Image cloudName="softquizy" className="quiz-img" publicId='badSituation' />
                <h1>Something went wrong <SentimentVeryDissatisfiedIcon /></h1>
                </>
            );
        }

        return this.props.children;
    }
}

export default BlobalErrBoundary;