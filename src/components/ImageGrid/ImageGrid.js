import React, { Component } from 'react';
import { connect } from 'react-redux'
import './styles.css';
import { loadImages } from '../../actions'
import Button from '../Button/Button';
import Stats from '../Stats/Stats'

// const key = '5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02';

class ImageGrid extends Component {
    // state = {  // đặt state với biến images kiểu mảng []
    //     images: [], 
    // // };
    // componentWillMount() {
    //     console.log("componentWillMount")
    // }
    componentDidMount() {
        this.props.loadImages()
        // fetch(`https://api.unsplash.com/photos/?client_id=${key}&per_page=28`)
        //     .then(res => res.json())
        //     .then(images => {
        //         this.setState({
        //             images,
        //         });
        //     });
    }
    // componentWillReceiveProps(nextProps) {
    //     // if (nextProps.isLoading === true) {
    //     //     alert("Đang load")
    //     // } else {
    //     //     alert("Load xong")
    //     // }
    //     console.log("componentWillReceiveProps", nextProps)
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("shouldComponentUpdate", nextProps, nextState)
    //     return true;
    // }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log("componentWillUpdate", nextProps, nextState)
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log("componentDidUpdate", prevProps, prevState)
    // }
    // componentWillUnmount() {
    //     console.log("componentWillUnmount")
    // }

    render() {
        const { images, error, isLoading, loadImages, imagesStats } = this.props; // gán tất cả thành các props --> chuẩn bị xuất vào Components
        return (
            <div className="content">
                <section className="grid">
                    {images.map(image => (
                        <div
                            key={image.id}
                            className={`item item-${Math.ceil(
                                image.height / image.width
                            )}`}
                        >
                            <Stats stats={imagesStats[image.id]} />
                            <img
                                src={image.urls.small}
                                alt={image.user.username}
                            />
                        </div>
                    ))}

                    {/* <a onClick={this.props.loadImages}>Load Images</a> */}
                </section>
                {error && <div className="error">{JSON.stringify(error)}</div>}
                <Button onClick={() => !isLoading && loadImages()} loading={isLoading}>
                    Load More
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({  // phát đi tất cả những action (or tín hiệu) khi loadImages được gọi
    loadImages: () => dispatch(loadImages()),
})

const mapStateToProps = ({ isLoading, images, error, imagesStats }) => ({ // chuyển tất cả state (trong reducer) --> thành props của Component
    isLoading,
    images,
    error,
    imagesStats
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageGrid)
