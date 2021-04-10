import { Image } from 'cloudinary-react';
import { SentimentVeryDissatisfiedIcon } from '../../config/materialConfig';


const ErrorPage = (props) => {
    return (
        <div>
            <Image cloudName="softquizy" className="quiz-img" publicId='canNotFind' />
            <h1>We don't have this page yet... <SentimentVeryDissatisfiedIcon /></h1>
        </div>
    );
}

export default ErrorPage;

