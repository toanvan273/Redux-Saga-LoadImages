import { takeEvery, select, call, put } from 'redux-saga/effects'
import { IMAGES } from '../constants'
// import { fetchImages } from '../api'
import { setImages, setError } from '../actions'

const KEY = '?client_id=5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02&per_page=28'
const URL = `https://api.unsplash.com/photos/`

const fetchImages = async page => {  //page - là tham số truyền vào cho hàm async (được gọi từ saga thông qua hàm select)
    const response = await fetch(`${URL}${KEY}&per_page=&page=${page}`)  // fetch() lấy dữ liệu trên server về, response là 1 cục dữ liệu chưa đc phân tách rõ ràng
    const data = await response.json() // response.json() => .json() để mã hóa response thành các obj
    if (response.status >= 400) {
        throw new Error(data.errors)
    }
    return data  // data lúc này trở thành 1 mảng có chưa 10 obj
}

const getPage = e => e.nextPage // nextPage gọi pageReducer trong reducers->để khi load_images_success thì state+1 [sta-(tên bất kỳ) là tham số truyền vào]
function* handleImagesLoad() {
    try {
        const number = yield select(getPage)              //Select: chạy một selector function để lấy data từ state.
        const images = yield call(fetchImages, number)  //Call: gọi và chạy 2 hàm (fetchImages - lấy images, number - trả về[số trang + 1] hay state+1) -> trả về đối tượng là các images
        yield put(setImages(images))
    } catch (error) {
        yield put(setError(error.toString()))            // gửi/phát action setError
    }
}
export default function* watchImagesLoad() {
    yield takeEvery(IMAGES.LOAD, handleImagesLoad)
}