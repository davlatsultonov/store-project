import {Layout} from "./components/layout/Layout.jsx";
import {Card} from "./components/card/Card.jsx";
import {CardGroup} from "./components/card/CardGroup.jsx";
import {CategoryGroup} from "./components/category/CategoryGroup.jsx";
import {FilterGroup} from "./components/filters/FilterGroup.jsx";
import {BlockWrapper} from "./components/layout/BlockWrapper.jsx";
import {FilterItem} from "./components/filters/FilterItem.jsx";
import {FilterPrice} from "./components/filters/FilterPrice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "./store/reducers/ActionCreator.js";
import {FilterSelect} from "./components/filters/FilterSelect.jsx";
import {BasketIcon} from "./components/icons/BasketIcon.jsx";
import {Drawer} from "./components/Drawer.jsx";
import {toggleShowBasketItems} from "./store/reducers/BasketSlice.js";
import {Loader} from "./components/Loader.jsx";
import {setBrand, setBrands, setSortType} from "./store/reducers/ProductsSlice.js";
import {SORT_ELEMENTS} from "./components/contants/index.js";

function App() {
  const dispatch = useDispatch()
  const { filteredProducts, brands, sortType, minProductPrice, maxProductPrice, isLoading, error } = useSelector(state => state.productReducer);
  const { products: basketProducts } = useSelector(state => state.basketReducer);

  useEffect(() => {
    if (!filteredProducts.length) dispatch(fetchProducts())
  }, [])

  const renderCards = () => {
    if (!filteredProducts.length) return 'Products not found';

    const result = filteredProducts.filter(product => {
      return parseInt(product.price) >= minProductPrice && parseInt(product.price) <= maxProductPrice
    }).sort((a, b) => {
      if (sortType === SORT_ELEMENTS.cheap) return a.price - b.price;
      if (sortType === SORT_ELEMENTS.expensive) return b.price - a.price;
      return b.rating - a.rating
    });

    return result.length ? result.map(product => <Card key={product.id} product={product}/>) : 'Products not found';
  }

  const handleSortChange = (e) => {
    dispatch(setSortType(e.target.value))
  }

  const handleBrandChange = (e) => {
    dispatch(setBrand(e.target.value))
    dispatch(setBrands())
  }

  return <Layout>
    <Drawer/>
    <BlockWrapper className='mb-3'>
      <CategoryGroup />
    </BlockWrapper>
    <div className='flex gap-2'>
      <div className='w-1/5'>
        <BlockWrapper className='sticky top-3'>
          { Object.keys(basketProducts).length ? <div className='mb-4 border-b pb-4'  onClick={() => dispatch(toggleShowBasketItems())}>
            <BasketIcon />
          </div> : null }
          <FilterGroup>
            <FilterItem
              label={'Sort'}
            >
              <FilterSelect items={Object.values(SORT_ELEMENTS)} onClick={handleSortChange} />
            </FilterItem>
            <FilterItem
              label={'Price'}
            >
              <FilterPrice />
            </FilterItem>
            <FilterItem
              label={'Brand'}
            >
              <FilterSelect defaultValue={'Choose a brand'} items={brands} onClick={handleBrandChange} />
            </FilterItem>
          </FilterGroup>
        </BlockWrapper>
      </div>
      <BlockWrapper className='flex-1'>
        <CardGroup>
          { renderCards() }
        </CardGroup>
        { error && <h1>{ error }</h1> }
        { isLoading && <Loader /> }
      </BlockWrapper>
    </div>
  </Layout>;
}

export default App;
