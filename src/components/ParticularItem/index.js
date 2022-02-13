import {BsStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import {Component} from 'react'

import './index.css'

class ParticularItem extends Component {
  state = {itemQuantity: 1, isActive: false}

  showQuantity = () => {
    const {item} = this.props
    let convertSaveItemsOne

    const getSaveItemsOne = localStorage.getItem('cartData')
    if (getSaveItemsOne !== null) {
      convertSaveItemsOne = JSON.parse(getSaveItemsOne)
    }
    if (convertSaveItemsOne !== undefined) {
      const getQuantityFromSaveItemsOne = convertSaveItemsOne.filter(
        eachOne => eachOne.id === item.id,
      )

      if (getQuantityFromSaveItemsOne.length > 0) {
        this.setState({itemQuantity: getQuantityFromSaveItemsOne[0].quantity})
      }
    }
  }

  addItems = () => {
    const {item, updateCart} = this.props
    updateCart(item.id)
    this.setState({isActive: true})
  }

  updateCartSaveItems = () => {
    const {item} = this.props
    let convertSaveItems

    const getSaveItems = localStorage.getItem('cartData')
    if (getSaveItems !== null) {
      convertSaveItems = JSON.parse(getSaveItems)
    }
    if (convertSaveItems !== undefined) {
      const getSaveItemsFromMap = convertSaveItems.map(eachFood => {
        if (eachFood.id === item.id) {
          return {...eachFood, quantity: eachFood.quantity + 1}
        }
        return eachFood
      })
      localStorage.setItem('cartData', JSON.stringify(getSaveItemsFromMap))
    }
    this.showQuantity()
  }

  removeCartSaveItems = () => {
    const {item} = this.props
    let convertSaveItems

    const getSaveItems = localStorage.getItem('cartData')
    if (getSaveItems !== null) {
      convertSaveItems = JSON.parse(getSaveItems)
    }
    if (convertSaveItems !== undefined) {
      const getSaveItemsFromMap = convertSaveItems.map(eachFood => {
        if (eachFood.id === item.id) {
          if (eachFood.quantity > 1) {
            return {...eachFood, quantity: eachFood.quantity - 1}
          }
          this.setState({isActive: false})
          return null
        }
        return eachFood
      })
      const getValueFromFilters = getSaveItemsFromMap.filter(
        eachFilter => eachFilter !== null,
      )
      if (getValueFromFilters.length > 0) {
        localStorage.setItem('cartData', JSON.stringify(getValueFromFilters))
      } else {
        localStorage.removeItem('cartData')
      }
    }
    this.showQuantity()
  }

  render() {
    const {item} = this.props
    const {itemQuantity, isActive} = this.state
    const addColorToRating =
      item.rating >= 4.0 ? 'ratingColor' : 'removeRatingColor'

    return (
      <li className="add-new">
        <div className="list-item-restaurant" testid="foodItem">
          <img src={item.imageUrl} alt="Food" className="restaurant-image" />
          <div className="restaurant-name-container">
            <h1 className="restaurant-name">{item.name}</h1>
            <div className="star-container">
              <BiRupee className="ratingThe" />
              <p className="particular-foodType">{item.cost}</p>
            </div>
            <div className="star-food-item-container">
              <BsStarFill className={`${addColorToRating} ratingColor`} />
              <p className="food-rating">{item.rating}</p>
            </div>
            {isActive ? (
              <div className="star-container">
                <div>
                  <button
                    testid="decrement-count"
                    type="button"
                    className="removeItems"
                    onClick={this.removeCartSaveItems}
                  >
                    -
                  </button>
                </div>
                <div>
                  <p testid="active-count">{itemQuantity}</p>
                </div>
                <div>
                  <button
                    testid="increment-count"
                    type="button"
                    className="removeItems"
                    onClick={this.updateCartSaveItems}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="add-button"
                onClick={this.addItems}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default ParticularItem
