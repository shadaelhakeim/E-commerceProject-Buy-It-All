import React from 'react'
import cam from '../../images/camera.png'
import './style.css'
export default function Copon() {
  return (
      <div className="container mb-5 cop-cont">
        <div className="row">
          <div className="col-md-3 right-cop d-flex justify-content-center align-items-center p-3">
            <div className="content p-5 d-flex">
              <span className='percentage'>20</span>
              <div className="d-flex flex-column align-items-center justify-content-center">
                <span>%</span>
                <span>OFF</span>
              </div>
            </div>
          </div>
          <div className="col-md-9 left-cop d-flex justify-content-start align-items-center position-relative">
            <div className="content-2 p-3">
              <div className="description d-flex flex-column">
                <h3 className="mb-4">Seasonal weekly sale 2024</h3>
                <p>
                  Use code
                  <span className="p-2 rounded bg-light">Sale 2024</span> to get
                  best offer
                </p>
              </div>
              <div className="img-cont position-absolute">
                <img className='img-fluid' src={cam} alt="cam" />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
