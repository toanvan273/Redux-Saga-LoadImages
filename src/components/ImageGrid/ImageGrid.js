import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { loadImages } from '../../actions';
import Button from '../Button/Button';
import Stats from '../Stats/Stats';


class ImageGrid extends Component {
    constructor() {
        super();
        this.state = {
            number: '',
        };
    }
    update(e) {
        this.setState({ number: e.target.value });
    }

    render() {
        const { images, error, isLoading, loadImages, imagesStats } = this.props; // gán tất cả thành các props --> chuẩn bị xuất vào Components

        console.log(isLoading);
        return (
            <div className="content">

                <p>Page: {this.state.number}</p>
                <input placeholder="Nhap so trang" onChange={this.update.bind(this)} />
                <Button onClick={() => loadImages(this.state.number)}>
                    Load More
                </Button>
                <section className="grid">
                    {images.map(image => (
                        <div
                            key={image.id}
                            className={`item item-${Math.ceil(
                                image.height / image.width,
                            )}`}
                        >
                            <Stats stats={imagesStats[image.id]} />
                            <img
                                src={image.urls.small}
                                alt={image.user.username}
                            />
                        </div>
                    ))}

                </section>
                {error && <div className="error">{JSON.stringify(error)}</div>}
            </div>
        );
    }
}


const mapStateToProps = ({ isLoading, images, error, imagesStats }) => ({
    isLoading,
    images,
    error,
    imagesStats,
});

export default connect(mapStateToProps, { loadImages })(ImageGrid);
