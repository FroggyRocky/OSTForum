import './loader.css'

function Loader() {
    return <div className='lds-container'>
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>
}
export {Loader}