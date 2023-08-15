import {Layout} from "./components/layout/Layout.jsx";
import {Card} from "./components/card/Card.jsx";
import {CardGroup} from "./components/card/CardGroup.jsx";
import {CategoryGroup} from "./components/category/CategoryGroup.jsx";
import {FilterGroup} from "./components/filters/FilterGroup.jsx";
import {BlockWrapper} from "./components/layout/BlockWrapper.jsx";
import {FilterItem} from "./components/filters/FilterItem.jsx";
import {FilterPrice} from "./components/filters/FilterPrice.jsx";
import {useGetAllProductsQuery} from "./store/api/apiSlice.js";

function App() {
  const { data, error, isLoading, isSuccess, isError } = useGetAllProductsQuery();

  let postContent;
  if (isLoading) {
    postContent = 'Loading...'
  } else if (isSuccess) {
    postContent = data?.products.map(product => <Card key={product.id} product={product}/>)
  } else if (isError) {
    postContent = 'Error!!'
  }

  return <Layout>
    <BlockWrapper className='mb-3'>
      <CategoryGroup />
    </BlockWrapper>
    <div className='flex gap-2'>
      <div className='w-1/4'>
        <BlockWrapper>
          <FilterGroup>
            <FilterItem
              label={'Price'}
            >
              <FilterPrice />
            </FilterItem>
            {/*<FilterItem
              label={'Brand'}
            >
              <FilterSelect />
            </FilterItem>*/}
          </FilterGroup>
        </BlockWrapper>
      </div>
      <BlockWrapper>
        <CardGroup className='flex-1'>
          { postContent }
        </CardGroup>
      </BlockWrapper>
    </div>
  </Layout>;
}

export default App;
